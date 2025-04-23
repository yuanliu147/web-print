'use client'

import Box from './components/Box'
import { StoreContext } from '@/app/editor/StoreContext'
import { useContext, useRef } from 'react'
import type { Direction } from './constant'
import {
	BOTTOM_DIRECTION,
	LEFT_DIRECTION,
	NONE_DIRECTORY,
	RESIZE_MIN_SIZE,
	RIGHT_DIRECTION,
	TOP_DIRECTION,
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
		type: 'input',
	},
	{
		id: 'box2',
		style: { left: '400px' },
		type: 'input',
	},
	{
		id: 'box3',
		style: { left: '600px' },
		type: 'input',
	},
]

export default function EditorArea() {
	const pageRef = useRef<HTMLDivElement>(null)
	const { globalData, setGlobalData } = useContext(StoreContext)
	const resizeInfoRef = useRef<ResizeInfo>({})

	return (
		<div
			className="editor-area"
			onMouseDownCapture={(e) => {
				if (!globalData?.activeElement) return
				const direction = getDirection(e, globalData.activeElement, pageRef.current!)

				if ((direction | NONE_DIRECTORY) === NONE_DIRECTORY) {
					// 鼠标没有在边框范围内
					return
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
					const target = pageRef.current!.querySelector<HTMLDivElement>(
						`#${globalData.activeElement!.id}`,
					)!
					const direction = getDirection(e, globalData.activeElement, pageRef.current!)
					if ((direction | NONE_DIRECTORY) === NONE_DIRECTORY) {
						target.style.cursor = 'move'
						pageRef.current!.style.cursor = 'default'
						return
					}

					const cursorStyleMap = {
						[TOP_DIRECTION]: 'n-resize',
						[BOTTOM_DIRECTION]: 's-resize',
						[LEFT_DIRECTION]: 'w-resize',
						[RIGHT_DIRECTION]: 'e-resize',
						[LEFT_DIRECTION | TOP_DIRECTION]: 'nw-resize',
						[LEFT_DIRECTION | BOTTOM_DIRECTION]: 'sw-resize',
						[RIGHT_DIRECTION | TOP_DIRECTION]: 'ne-resize',
						[RIGHT_DIRECTION | BOTTOM_DIRECTION]: 'se-resize',
					}
					pageRef.current!.style.cursor = cursorStyleMap[direction] || 'default'
					target.style.cursor = cursorStyleMap[direction] || 'move'
				} else {
					const { clientX, clientY } = e
					const { startX, startY, startPosition, resizeDirection } = resizeInfoRef.current
					if (resizeDirection == null) return

					if ((resizeDirection | NONE_DIRECTORY) !== NONE_DIRECTORY) {
						e.stopPropagation()
					}

					const onLeftResize = () => {
						// 向右为正数
						const disX = clientX - startX!
						const target = pageRef.current!.querySelector<HTMLDivElement>(
							`#${globalData.activeElement!.id}`,
						)!
						// 不能小于0
						const tempLeft = Math.max(startPosition!.offsetLeft + disX, 0)
						// 不能大于其右边界
						const newLeft = Math.min(
							tempLeft,
							startPosition!.offsetLeft + startPosition!.width - RESIZE_MIN_SIZE,
						)
						const newWidth = Math.max(startPosition!.width - disX, RESIZE_MIN_SIZE)
						target.style.left = `${newLeft}px`
						target.style.width = `${newWidth}px`
					}
					const onTopResize = () => {
						// 向下为正数
						const disY = clientY - startY!
						const target = pageRef.current!.querySelector<HTMLDivElement>(
							`#${globalData.activeElement!.id}`,
						)!

						// 不能小于0
						const tempTop = Math.max(startPosition!.offsetTop + disY, 0)
						// 不能大于其下边界
						const newTop = Math.min(
							tempTop,
							startPosition!.offsetTop + startPosition!.height - RESIZE_MIN_SIZE,
						)
						const newHeight = Math.max(startPosition!.height - disY, RESIZE_MIN_SIZE)
						target.style.top = `${newTop}px`
						target.style.height = `${newHeight}px`
					}
					const onRightResize = () => {
						const disX = clientX - startX!
						const target = pageRef.current!.querySelector<HTMLDivElement>(
							`#${globalData.activeElement!.id}`,
						)!
						const newWidth = Math.max(startPosition!.width + disX, RESIZE_MIN_SIZE)
						target.style.width = `${newWidth}px`
					}
					const onBottomResize = () => {
						const disY = clientY - startY!
						const target = pageRef.current!.querySelector<HTMLDivElement>(
							`#${globalData.activeElement!.id}`,
						)!
						const newHeight = Math.max(startPosition!.height + disY, RESIZE_MIN_SIZE)
						target.style.height = `${newHeight}px`
					}

					// 存在左方向的 resize
					if ((resizeDirection & LEFT_DIRECTION) === LEFT_DIRECTION) {
						onLeftResize()
					}

					// 存在上方向的 resize
					if ((resizeDirection & TOP_DIRECTION) === TOP_DIRECTION) {
						onTopResize()
					}
					// 存在右方向的 resize
					if ((resizeDirection & RIGHT_DIRECTION) === RIGHT_DIRECTION) {
						onRightResize()
					}
					// 存在下方向的 resize
					if ((resizeDirection & BOTTOM_DIRECTION) === BOTTOM_DIRECTION) {
						onBottomResize()
					}
				}
			}}
			onMouseUp={(e) => {
				if (!resizeInfoRef.current.isResizing) return
				resizeInfoRef.current.isResizing = false
				const target = pageRef.current!.querySelector<HTMLDivElement>(
					`#${globalData.activeElement!.id}`,
				)!

				const { width, height } = target.getBoundingClientRect()
				setGlobalData({
					...globalData,
					activeElement: {
						id: globalData.activeElement!.id,
						width,
						height,
						offsetLeft: target!.offsetLeft,
						offsetTop: target!.offsetTop,
					},
				})

				e.stopPropagation()
			}}
			onMouseLeave={() => {
				if (!resizeInfoRef.current.isResizing) return
				resizeInfoRef.current.isResizing = false
				const target = pageRef.current!.querySelector<HTMLDivElement>(
					`#${globalData.activeElement!.id}`,
				)!

				const { width, height } = target.getBoundingClientRect()
				setGlobalData({
					...globalData,
					activeElement: {
						id: globalData.activeElement!.id,
						width,
						height,
						offsetLeft: target!.offsetLeft,
						offsetTop: target!.offsetTop,
					},
				})
			}}
		>
			<div
				ref={pageRef}
				className="editor-area__page"
				onClick={() => {
					if (globalData.activeElement) {
						setGlobalData({
							...globalData,
							activeElement: undefined,
						})
					}
				}}
			>
				{content.map((box) => (
					<Box id={box.id} style={box.style} key={box.id} type={box.type}></Box>
				))}
			</div>
		</div>
	)
}
