'use client'

import BoxContainer from './components/BoxContainer'
import { StoreContext } from '@/app/editor/StoreContext'
import { useContext, useRef } from 'react'
import type { Direction } from './constant'
import { LEFT_DIRECTION, NONE_DIRECTORY, RESIZE_MIN_SIZE } from './constant'
import { getDirection } from './config'
import './style.scss'

interface ResizeInfo {
	isResizing?: boolean
	startX?: number
	startY?: number
	startPosition?: {
		offsetLeft: number
		offsetTop: number
		width: number
		height: number
	}
	resizeDirection?: Direction
}

const content = [
	{
		id: 'box1',
		style: { left: '200px' },
	},
	{
		id: 'box2',
		style: { left: '400px' },
	},
	{
		id: 'box3',
		style: { left: '600px' },
	},
]

export default function EditorArea() {
	const editorAreaRef = useRef<HTMLDivElement>(null)
	const { globalData } = useContext(StoreContext)
	const resizeInfoRef = useRef<ResizeInfo>({})

	return (
		<div
			ref={editorAreaRef}
			className="editor-area"
			onMouseDownCapture={(e) => {
				if (!globalData?.activeElement) return
				const direction = getDirection(e, globalData.activeElement)
				console.log('editor-area', direction, direction & NONE_DIRECTORY, globalData.activeElement, e)
				if ((direction | NONE_DIRECTORY) === NONE_DIRECTORY) { // 鼠标没有在边框范围内
					return;
				}
				const { offsetLeft, offsetTop, width, height } = globalData.activeElement
				const { clientX, clientY } = e

				resizeInfoRef.current.isResizing = true
				resizeInfoRef.current.startX = clientX
				resizeInfoRef.current.startY = clientY
				resizeInfoRef.current.startPosition = { offsetLeft, offsetTop, width, height }
				resizeInfoRef.current.resizeDirection = direction

				e.stopPropagation()
			}}
			onMouseMove={(e) => {
				if (!globalData.activeElement) return

				if (!resizeInfoRef.current.isResizing) {
					resizeInfoRef.current.resizeDirection = getDirection(e, globalData.activeElement)
				} else {
					const { clientX, clientY } = e
					const { startX, startY, startPosition, resizeDirection } = resizeInfoRef.current

					if ((resizeDirection | NONE_DIRECTORY) !== NONE_DIRECTORY) {
						e.stopPropagation()
					}

					switch (resizeInfoRef.current.resizeDirection) {
						case LEFT_DIRECTION: {
							// 向右为正数
							const disX = clientX - startX
							const target = editorAreaRef.current.querySelector<HTMLDivElement>(
								`#${globalData.activeElement.id}`,
							)
							const newLeft = Math.min(Math.max(startPosition!.offsetLeft + disX, 0), startPosition!.offsetLeft + startPosition!.width - RESIZE_MIN_SIZE)

							target.style.left = `${newLeft}px`
							target.style.width = `${Math.max(startPosition!.width - disX, RESIZE_MIN_SIZE)}px`
						}
					}
				}
			}}
			onMouseUp={() => {
				if (!resizeInfoRef.current.isResizing) return
				resizeInfoRef.current.isResizing = false
			}}
			onMouseLeave={() => {
				if (!resizeInfoRef.current.isResizing) return
				resizeInfoRef.current.isResizing = false
			}}
		>
			编辑可视化区
			{content.map((box) => (
				<BoxContainer id={box.id} style={box.style} key={box.id}>
					<div className="box"></div>
				</BoxContainer>
			))}
		</div>
	)
}
