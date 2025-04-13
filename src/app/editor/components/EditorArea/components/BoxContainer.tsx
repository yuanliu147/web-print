'use client'

import React, { useContext } from 'react'
import { StoreContext } from '@/app/editor/StoreContext'

import './styles.scss'

interface BoxContainerProps {
	id?: string
}

export default function BoxContainer({
	children,
	id = Date.now() + '',
}: React.PropsWithChildren<BoxContainerProps>) {
	const { globalData, setGlobalData } = useContext(StoreContext)

	console.log('id', id, globalData.activeElemId);

	return (
		<div
			className={`boxWrap ${id === globalData.activeElemId ? 'active' : ''}`}
			onClick={() => {
				setGlobalData({ ...globalData, activeElemId: id })
			}}
		>
			{children}
		</div>
	)
}
