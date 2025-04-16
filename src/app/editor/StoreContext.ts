import React, { createContext } from 'react'

interface ActiveElementPosition {
	id: string
	left: number // 元素视图位置
	top: number // 元素视图位置
	right: number // 元素视图位置
	bottom: number // 元素视图位置
	offsetTop: number // 纸张位置
	offsetLeft: number // 纸张位置
}

export interface GlobalData {
	activeElement?: ActiveElementPosition
}

export interface StoreContextProps {
	globalData: GlobalData
	setGlobalData: React.Dispatch<React.SetStateAction<GlobalData>>
}

export const StoreContext = createContext<StoreContextProps>({
	globalData: {},
	setGlobalData: () => {},
})
