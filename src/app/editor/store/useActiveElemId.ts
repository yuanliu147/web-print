import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'



interface ActiveElem {
	activeElemId: string | null
	setActiveElemId: (id: string | null) => void
}

export const useActiveElemId = create(
	devtools(
		persist<ActiveElem>(
			(set) => ({
				activeElemId: null,
				setActiveElemId: (activeElemId: string | null) => set({ activeElemId }),
			}),
			{ name: '__WEB_PRINT_ACTIVE__' },
		),
	),
)
