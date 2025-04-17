'use client'

import BoxContainer from './components/BoxContainer'
import { StoreContext } from '@/app/editor/StoreContext'
import { useContext, useRef } from 'react'
import type { Direction } from './constant'
import {
	BOTTOM_DIRECTION,
	LEFT_DIRECTION,
	NONE_DIRECTORY,
	RESIZE_MIN_SIZE,
	RIGHT_DIRECTION,
	TOP_DIRECTION
} from './constant'
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

					const onLeftResize = () => {
						// 向右为正数
						const disX = clientX - startX
						const target = editorAreaRef.current.querySelector<HTMLDivElement>(
							`#${globalData.activeElement!.id}`,
						)
						// 不能小于0
						const tempLeft = Math.max(startPosition!.offsetLeft + disX, 0)
						// 不能大于其右边界
						const newLeft = Math.min(tempLeft, startPosition!.offsetLeft + startPosition!.width - RESIZE_MIN_SIZE)

						target.style.left = `${newLeft}px`
						target.style.width = `${Math.max(startPosition!.width - disX, RESIZE_MIN_SIZE)}px`
					}
					const onTopResize = () => {
						// 向下为正数
						const disY = clientY - startY
						const target = editorAreaRef.current.querySelector<HTMLDivElement>(`#${globalData.activeElement!.id}`);

						// 不能小于0
						const tempTop = Math.max(startPosition!.offsetTop + disY, 0)
						// 不能大于其下边界
						const newTop = Math.min(tempTop, startPosition!.offsetTop + startPosition!.height - RESIZE_MIN_SIZE)

						target.style.top = `${newTop}px`
						target.style.height = `${Math.max(startPosition!.height - disY, RESIZE_MIN_SIZE)}px`
					}
					const onRightResize = () => {
						const disX = clientX - startX
						const target = editorAreaRef.current.querySelector<HTMLDivElement>(`#${globalData.activeElement!.id}`);

						target.style.width = `${Math.max(startPosition!.width + disX, RESIZE_MIN_SIZE)}px`
					}
					const onBottomResize = () => {
						const disY = clientY - startY
						const target = editorAreaRef.current.querySelector<HTMLDivElement>(`#${globalData.activeElement!.id}`);

						target.style.height = `${Math.max(startPosition!.height + disY, RESIZE_MIN_SIZE)}px`;
					}

					// 存在左方向的 resize
					((resizeDirection & LEFT_DIRECTION) === LEFT_DIRECTION) && onLeftResize();
					// 存在上方向的 resize
					((resizeDirection & TOP_DIRECTION) === TOP_DIRECTION) && onTopResize();
					// 存在右方向的 resize
					((resizeDirection & RIGHT_DIRECTION) === RIGHT_DIRECTION) && onRightResize();
					// 存在下方向的 resize
					((resizeDirection & BOTTOM_DIRECTION) === BOTTOM_DIRECTION) && onBottomResize();
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
