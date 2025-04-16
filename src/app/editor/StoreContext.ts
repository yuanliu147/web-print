import React, { createContext } from 'react'

export interface ActiveElement {
	id: string
	left: number // 元素视图位置
	top: number // 元素视图位置
	right: number // 元素视图位置
	bottom: number // 元素视图位置
	height: number // 元素视图尺寸
	width: number // 元素视图尺寸
	offsetTop: number // 纸张位置
	offsetLeft: number // 纸张位置
}

export interface GlobalData {
	activeElement?: ActiveElement
}

export interface StoreContextProps {
	globalData: GlobalData
	setGlobalData: React.Dispatch<React.SetStateAction<GlobalData>>
}

export const StoreContext = createContext<StoreContextProps>({
	globalData: {},
	setGlobalData: () => {},
})
