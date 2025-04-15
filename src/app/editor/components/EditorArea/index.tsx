'use client'

import BoxContainer from './components/BoxContainer'
import { StoreContext } from '@/app/editor/StoreContext'
import { useContext, useRef } from 'react'

import './style.scss'

export default function EditorArea() {
	const editorAreaRef = useRef<HTMLDivElement>(null);
	const { globalData } = useContext(StoreContext)


	return (
		<div
			ref={editorAreaRef}
			className="editor-area"
			onMouseMove={(e) => {
				if (!globalData.activeElement) return;
				const { clientX, clientY } = e;
				const { left, top, right, bottom } = globalData.activeElement;
				const DISTANCE = 5;

				const isLeft = Math.abs(clientX - left) <= DISTANCE;
				const isRight = Math.abs(clientY - right) <= DISTANCE;

			}}
		>
			编辑可视化区
			<BoxContainer id="box1">
				<div className="box"></div>
			</BoxContainer>
			<BoxContainer id="box2">
				<div className="box"></div>
			</BoxContainer>
			<BoxContainer id="box3">
				<div className="box"></div>
			</BoxContainer>
		</div>
	)
}
