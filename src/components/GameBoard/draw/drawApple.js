import { colors, cellSize } from '@/boardConfig'

import { getFuncs, drawCircle } from './utilsForDraw'

export const drawApple = ({ canvas, applePos }) => {
  const { x, y } = getFuncs(canvas)

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = colors.apple

  const { top, left } = applePos
  ctx.beginPath()
  drawCircle(ctx, x(left), y(top), cellSize / 1.5)
  ctx.fill()
}
