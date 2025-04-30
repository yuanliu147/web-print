import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

interface SchemaItem {
	id: string
	height: number // 元素视图尺寸
	width: number // 元素视图尺寸
	offsetTop: number // 纸张位置
	offsetLeft: number // 纸张位置
}

interface useGlobalSchema {
	schema: SchemaItem[]
	updateSchemaItem: (id: string | null, schemaItem: Partial<SchemaItem>) => void
	getSchemaItem: (id: string | null) => SchemaItem | undefined
	setSchema: (schema: SchemaItem[]) => void
}

export const useGlobalSchema = create(
	devtools(
		persist<useGlobalSchema>(
			(set, get) => ({
				schema: [],
				updateSchemaItem: (id: string | null, schemaItem: Partial<SchemaItem>) => {
					const schema = get().schema
					const index = schema.findIndex((item) => item.id === id)
					if (index !== -1) {
						Object.assign(schema[index], schemaItem)
						set({ schema })
					}
				},
				getSchemaItem: (id: string | null) => {
					if (!id) return undefined
					const schema = get().schema
					return schema.find((item) => item.id === id)
				},
				setSchema: (schema) => set({ schema }),
			}),
			{ name: '__WEB_PRINT_SCHEMA__' },
		),
	),
)
