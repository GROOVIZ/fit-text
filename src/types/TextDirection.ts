export enum TextDirection {
  right = 'right',
  bottom = 'bottom',
  left = 'left',
  top = 'top'
}

export const isVertical = (direction: TextDirection) =>
  direction === TextDirection.top || direction === TextDirection.bottom
