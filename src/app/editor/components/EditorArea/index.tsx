'use client'

import BoxContainer from './components/BoxContainer'

import './style.scss'

export default function EditorArea() {
	return (
		<div className="editor-area">
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
