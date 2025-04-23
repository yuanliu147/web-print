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

export function getDirection(
	e: ClientPosition,
	activeElement: ActiveElement,
	pageDom: HTMLDivElement,
): Direction {
	const { clientX, clientY } = e
	const { offsetLeft, offsetTop, width, height } = activeElement
	const { left, top } = pageDom.getBoundingClientRect()

	const activeElementLeft = offsetLeft + left
	const activeElementTop = offsetTop + top

	const right = activeElementLeft + width
	const bottom = activeElementTop + height

	const isLeft =
		Math.abs(clientX - activeElementLeft) <= RESIZE_DISTANCE ? LEFT_DIRECTION : NONE_DIRECTORY
	const isRight = Math.abs(clientX - right) <= RESIZE_DISTANCE ? RIGHT_DIRECTION : NONE_DIRECTORY
	const isBottom = Math.abs(clientY - bottom) <= RESIZE_DISTANCE ? BOTTOM_DIRECTION : NONE_DIRECTORY
	const isTop =
		Math.abs(clientY - activeElementTop) <= RESIZE_DISTANCE ? TOP_DIRECTION : NONE_DIRECTORY

	return (isLeft | isRight | isBottom | isTop) as Direction
}
