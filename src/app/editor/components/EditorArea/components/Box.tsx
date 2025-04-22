'use client'

import React, { useContext, useRef, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { StoreContext } from '@/app/editor/StoreContext'

import './style.scss'

interface BoxContainerProps extends React.HTMLProps<HTMLDivElement> {
	id: string
	type?: string
}

export default function Box({ id = Date.now() + '', type, ...props }: BoxContainerProps) {
	const containerRef = useRef<HTMLDivElement>(null)
	const { globalData, setGlobalData } = useContext(StoreContext)
	const currIsActive = id === globalData.activeElement?.id

	const boxRef = useRef<HTMLDivElement | null>(null)
	const [contentEditable, setContentEditable] =
		useState<HTMLAttributes<HTMLDivElement>['contentEditable']>('false')

	if (!currIsActive && contentEditable !== 'false') {
		boxRef.current!.style.cursor = 'unset'
		setContentEditable('false')
	}

	console.log('currIsActive', currIsActive, globalData.activeElement?.id, id)

	return (
		<div
			id={id}
			ref={containerRef}
			{...props}
			className={`box-wrap ${currIsActive ? 'active' : ''}`}
			onClick={(e) => {
				const { left, bottom, top, right, width, height } =
					containerRef.current!.getBoundingClientRect()
				setGlobalData({
					...globalData,
					activeElement: {
						id,
						left,
						bottom,
						top,
						right,
						width,
						height,
						offsetLeft: containerRef.current!.offsetLeft,
						offsetTop: containerRef.current!.offsetTop,
					},
				})
				e.stopPropagation()
			}}
			onDoubleClick={() => {
				console.log('onDoubleClick---------', currIsActive, globalData.activeElement?.id, id)
				if (contentEditable !== 'false') return
				setContentEditable('true')
				boxRef.current!.style.cursor = 'text'
				setTimeout(() => {
					boxRef.current!.focus()
				})
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
			<div
				ref={boxRef}
				className="box"
				onFocus={() => {
					console.log('onFocus')
					setTimeout(() => {
						const range = document.createRange()
						const selection = window.getSelection()

						range.selectNodeContents(boxRef.current!) // 选中元素内容
						range.collapse(false) // 折叠到Range末尾

						selection.removeAllRanges()
						selection.addRange(range)
					}, 0)
				}}
				contentEditable={contentEditable}
			></div>
		</div>
	)
}
