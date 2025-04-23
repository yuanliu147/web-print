import React, { createContext } from 'react'

export interface ActiveElement {
	id: string
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
