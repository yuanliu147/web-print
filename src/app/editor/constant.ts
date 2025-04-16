// resize 四个方向
export const NONE_DIRECTORY = 0b0000;
export const TOP_DIRECTION = 0b0001;
export const RIGHT_DIRECTION = 0b0010;
export const BOTTOM_DIRECTION = 0b0100;
export const LEFT_DIRECTION = 0b1000;

export type Direction = typeof RIGHT_DIRECTION | typeof BOTTOM_DIRECTION | typeof LEFT_DIRECTION | typeof TOP_DIRECTION | typeof NONE_DIRECTORY;
