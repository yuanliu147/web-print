'use client'

import Header from './components/Header'
import Material from './components/Material'
import EditorArea from './components/EditorArea'
import Setting from './components/Setting'

import { GlobalData, StoreContext } from './StoreContext'
import { useMemo, useState } from 'react'

import './style.scss'

export default function Editor() {
	const [globalData, setGlobalData] = useState<GlobalData>({})

	const providerValue = useMemo(() => ({ globalData, setGlobalData }), [globalData])


	return (
		<StoreContext value={providerValue}>
			<div className="editor-page">
				<Header />
				<div className="content-wrap">
					<Material />
					<EditorArea />
					<Setting />
				</div>
			</div>
		</StoreContext>
	)
}
