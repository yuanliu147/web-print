import { ActiveElement } from '@/app/editor/StoreContext'
import {
	BOTTOM_DIRECTION,
	Direction,
	LEFT_DIRECTION,
	NONE_DIRECTORY,
	RESIZE_DISTANCE,
	RIGHT_DIRECTION,
	TOP_DIRECTION,
} from '@/app/editor/components/EditorArea/constant'

interface ClientPosition {
	clientX: number
	clientY: number
}

export function getDirection(e: ClientPosition, activeElement: ActiveElement): Direction {
	const { clientX, clientY } = e
	const { left, top, right, bottom } = activeElement

	const isLeft = Math.abs(clientX - left) <= RESIZE_DISTANCE ? LEFT_DIRECTION : NONE_DIRECTORY
	const isRight = Math.abs(clientX - right) <= RESIZE_DISTANCE ? RIGHT_DIRECTION : NONE_DIRECTORY
	const isBottom = Math.abs(clientY - bottom) <= RESIZE_DISTANCE ? BOTTOM_DIRECTION : NONE_DIRECTORY
	const isTop = Math.abs(clientY - top) <= RESIZE_DISTANCE ? TOP_DIRECTION : NONE_DIRECTORY

	return isLeft | isRight | isBottom | isTop
}
