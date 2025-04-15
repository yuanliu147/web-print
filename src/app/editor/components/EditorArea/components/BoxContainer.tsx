'use client'

import React, { useContext, useRef } from 'react'
import { StoreContext } from '@/app/editor/StoreContext'

import './styles.scss'

interface BoxContainerProps {
	id: string
}

export default function BoxContainer({
	children,
	id = Date.now() + '',
}: React.PropsWithChildren<BoxContainerProps>) {
	const containerRef = useRef<HTMLDivElement>(null)
	const { globalData, setGlobalData } = useContext(StoreContext)

	const currIsActive = id === globalData.activeElement?.id

	return (
		<div
			id={id}
			ref={containerRef}
			className={`boxWrap ${currIsActive ? 'active' : ''}`}
			onClick={() => {
				const rect = containerRef.current!.getBoundingClientRect()

				setGlobalData({
					...globalData,
					activeElement: {
						id,
						...rect,
						offsetLeft: containerRef.current!.offsetLeft,
						offsetTop: containerRef.current!.offsetTop,
					},
				})
			}}
			onMouseDown={(e) => {
				if (!currIsActive) return
				const { clientX: startX, clientY: startY } = e
				const offsetLeft = containerRef.current!.offsetLeft
				const offsetTop = containerRef.current!.offsetTop
				let dragging = false
				const oldSelectStart = document.onselectstart

				document.onselectstart = () => false
				document.addEventListener('mousemove', handleMouseMove)
				document.addEventListener('mouseup', handleMouseUp)
				document.addEventListener('mouseleave', handleMouseLeave)

				function handleMouseMove(moveE: MouseEvent) {
					if (!dragging) return
					const { clientX, clientY } = moveE

					const distX = clientX - startX
					const distY = clientY - startY

					containerRef.current!.style.left = `${offsetLeft + distX}px`
					containerRef.current!.style.top = `${offsetTop + distY}px`
				}

				function handleMouseUp() {
					if (!dragging) return
					dragging = false
					document.onselectstart = oldSelectStart
					document.removeEventListener('mousemove', handleMouseMove)
					document.removeEventListener('mouseup', handleMouseUp)
					document.removeEventListener('mouseleave', handleMouseLeave)
				}

				function handleMouseLeave() {
					if (!dragging) return
					dragging = false
					document.removeEventListener('mousemove', handleMouseMove)
					document.removeEventListener('mouseup', handleMouseUp)
					document.removeEventListener('mouseleave', handleMouseLeave)
				}
			}}
		>
			{children}
		</div>
	)
}
