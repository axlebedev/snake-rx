import { getFuncs } from './utilsForDraw'
import { colors, cellSize, snakeWidth } from './boardConfig'

const drawBodyCircles = ({ ctx, snakeSegmensts, x, y }) => {
  const radius = snakeWidth * cellSize / 2
  ctx.fillStyle = colors.snake
  snakeSegmensts.forEach(({ top, left }) => {
    ctx.beginPath()
    ctx.arc(x(left), y(top), radius, 0, 2 * Math.PI)
    ctx.fill()
  })
}

const drawBodyConnections = ({ ctx, snakeSegmensts, x, y }) => {
  const radius = snakeWidth * cellSize / 2

  ctx.fillStyle = colors.snake
  snakeSegmensts.slice(0, -1).forEach((current, index) => {
    const next = snakeSegmensts[index + 1]
    ctx.beginPath()
    if (current.left === next.left) {
      ctx.rect(
        x(current.left) - radius,
        y(Math.min(current.top, next.top)),
        radius * 2,
        cellSize,
      )
    }
    if (current.top === next.top) {
      ctx.rect(
        x(Math.min(current.left, next.left)),
        y(current.top) - radius,
        cellSize,
        radius * 2,
      )
    }
    ctx.fill()
  })
}

export const drawSnake = ({ canvas, snakeSegmensts }) => {
  const { x, y } = getFuncs(canvas)
  const ctx = canvas.getContext('2d')

  drawBodyCircles({ ctx, snakeSegmensts, x, y })
  drawBodyConnections({ ctx, snakeSegmensts, x, y })
}
