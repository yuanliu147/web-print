import React, { createContext } from 'react'

interface ActiveElementPosition extends DOMRect {
	id: string
	offsetTop: number // 纸张坐标
	offsetLeft: number // 纸张坐标
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
