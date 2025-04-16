'use client'

import BoxContainer from './components/BoxContainer'
import { StoreContext } from '@/app/editor/StoreContext'
import { useContext, useRef } from 'react'
import {
	LEFT_DIRECTION,
	BOTTOM_DIRECTION,
	RIGHT_DIRECTION,
	TOP_DIRECTION,
	NONE_DIRECTORY,
} from '@/app/editor/constant'
import type { Direction } from '@/app/editor/constant'
import './style.scss'

interface ResizeInfo {
	isResizing?: boolean
	startX?: number
	startY?: number
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
				const { clientX, clientY } = e
				resizeInfoRef.current.isResizing = true
				resizeInfoRef.current.startX = clientX
				resizeInfoRef.current.startY = clientY
			}}
			onMouseMove={(e) => {
				if (!globalData.activeElement) return

				if (!resizeInfoRef.current.isResizing) {
					// 鼠标移动需要记录方向
					const { clientX, clientY } = e
					const { left, top, right, bottom } = globalData.activeElement
					const DISTANCE = 5

					const isLeft = Math.abs(clientX - left) <= DISTANCE ? LEFT_DIRECTION : NONE_DIRECTORY
					const isRight = Math.abs(clientX - right) <= DISTANCE ? RIGHT_DIRECTION : NONE_DIRECTORY
					const isBottom =
						Math.abs(clientY - bottom) <= DISTANCE ? BOTTOM_DIRECTION : NONE_DIRECTORY
					const isTop = Math.abs(clientY - top) <= DISTANCE ? TOP_DIRECTION : NONE_DIRECTORY

					resizeInfoRef.current.resizeDirection = (isLeft & isRight & isBottom & isTop) as Direction
				} else {
				}
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
