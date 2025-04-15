

import React, { createContext } from 'react'

export interface GlobalData {
	activeElement?: {
		id: string;
		width: number;
		height: number;
		offsetTop: number;
		offsetLeft: number;
	}
}

export interface StoreContextProps {
	globalData: GlobalData
	setGlobalData: React.Dispatch<React.SetStateAction<GlobalData>>
}

export const StoreContext = createContext<StoreContextProps>({
	globalData: {},
	setGlobalData: () => {},
})
