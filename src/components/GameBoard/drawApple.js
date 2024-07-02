import { getFuncs } from './utilsForDraw'
import { colors, cellSize } from './boardConfig'

export const drawApple = ({ canvas, applePos }) => {
  const { x, y } = getFuncs(canvas)

  const ctx = canvas.getContext('2d')
  ctx.fillStyle = colors.apple

  const { top, left } = applePos
  ctx.beginPath()
  ctx.arc(x(left), y(top), cellSize / 1.5, 0, 2 * Math.PI)
  ctx.fill()
}
