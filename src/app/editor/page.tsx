'use client'

import Header from './components/Header'
import Material from './components/Material'
import EditorArea from './components/EditorArea'
import Setting from './components/Setting'

import './style.scss'

export default function Editor() {
	return (
		<div className="editor-page">
			<Header />
			<div className="content-wrap">
				<Material />
				<EditorArea />
				<Setting />
			</div>
		</div>
	)
}
