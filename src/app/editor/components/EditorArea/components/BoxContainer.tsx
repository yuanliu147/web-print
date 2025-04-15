'use client'

import React, { useContext } from 'react'
import { StoreContext } from '@/app/editor/StoreContext'

import './styles.scss'

interface BoxContainerProps {
	id: string
}

export default function BoxContainer({
	children,
	id = Date.now() + '',
}: React.PropsWithChildren<BoxContainerProps>) {
	const containerRef = React.useRef<HTMLDivElement>(null)
	const { globalData, setGlobalData } = useContext(StoreContext)

	return (
		<div
			ref={containerRef}
			className={`boxWrap ${id === globalData.activeElement?.id ? 'active' : ''}`}
			onClick={() => {
				setGlobalData({
					...globalData,
					activeElement: {
						id,
						width: containerRef.current?.offsetWidth || 0,
						height: containerRef.current?.offsetHeight || 0,
						offsetLeft: containerRef.current?.offsetLeft || 0,
						offsetTop: containerRef.current?.offsetTop || 0,
					},
				})
			}}
		>
			{children}
		</div>
	)
}
