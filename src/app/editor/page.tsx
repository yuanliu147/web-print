'use client'

import Header from './components/Header'
import Material from './components/Material'
import EditorArea from './components/EditorArea'
import Setting from './components/Setting'

import { GlobalData, StoreContext } from './StoreContext'

import styles from './style.module.scss'
import { useEffect, useMemo, useState } from 'react'

export default function Editor() {
	const [globalData, setGlobalData] = useState<GlobalData>({})

	const providerValue = useMemo(() => ({ globalData, setGlobalData }), [globalData])


	useEffect(() => {
		console.log('全局数据改变', providerValue)
	}, [providerValue])

	return (
		<StoreContext.Provider value={providerValue}>
			<div className={styles.editorPage}>
				<Header />
				<div className={styles.contentWrap}>
					<Material />
					<EditorArea />
					<Setting />
				</div>
			</div>
		</StoreContext.Provider>
	)
}
