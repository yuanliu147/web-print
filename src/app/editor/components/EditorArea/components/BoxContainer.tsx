'use client'

import React, { useContext, useRef } from 'react'
import { StoreContext } from '@/app/editor/StoreContext'

import './style.scss'

interface BoxContainerProps extends React.HTMLProps<HTMLDivElement> {
	id: string
}

export default function BoxContainer({
	children,
	id = Date.now() + '',
	...props
}: React.PropsWithChildren<BoxContainerProps>) {
	const containerRef = useRef<HTMLDivElement>(null)
	const { globalData, setGlobalData } = useContext(StoreContext)

	const currIsActive = id === globalData.activeElement?.id

	console.log('currIsActive', currIsActive)

	return (
		<div
			id={id}
			ref={containerRef}
			{...props}
			className={`box-wrap ${currIsActive ? 'active' : ''}`}
			onClick={(e) => {
				const { left, bottom, top, right, width, height } = containerRef.current!.getBoundingClientRect()
				setGlobalData({
					...globalData,
					activeElement: {
						id,
						left, bottom, top, right, width, height,
						offsetLeft: containerRef.current!.offsetLeft,
						offsetTop: containerRef.current!.offsetTop,
					},
				})
				e.stopPropagation()
			}}
			onMouseDown={(e) => {
				if (!currIsActive) return
				console.log('container-onMouseDown')
				const { clientX: startX, clientY: startY } = e
				const offsetLeft = containerRef.current!.offsetLeft
				const offsetTop = containerRef.current!.offsetTop
				let dragging = true
				const oldSelectStart = document.onselectstart

				document.onselectstart = () => false
				document.addEventListener('mousemove', handleMouseMove)
				document.addEventListener('mouseup', handleMouseUp)
				document.addEventListener('mouseleave', handleMouseLeave)
				e.stopPropagation()
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
