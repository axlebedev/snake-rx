import { colors, cellSize, snakeWidth } from '@/boardConfig'

import { getFuncs } from './utilsForDraw'

const drawBodyCircles = ({ ctx, snakeSegments, x, y }) => {
  console.log('%c11111', 'background:#ff00ac', Date.now() % 10000, 'drawSnake:5 drawBodyCircles', snakeSegments)
  const radius = snakeWidth * cellSize / 2
  ctx.fillStyle = colors.snake
  snakeSegments.forEach(({ top, left }) => {
    ctx.beginPath()
    console.log('%c11111', 'background:#ff00ac', 'x(left)=', x(left), 'y(top)=', y(top))
    ctx.arc(x(left), y(top), radius, 0, 2 * Math.PI)
    ctx.fill()
  })
}

const drawBodyConnections = ({ ctx, snakeSegments, x, y }) => {
  console.log('%c11111', 'background:#ff00ac', Date.now() % 10000, 'drawSnake:16 drawBodyConnections', snakeSegments)
  const radius = snakeWidth * cellSize / 2

  ctx.fillStyle = colors.snake
  snakeSegments.slice(0, -1).forEach((current, index) => {
    const next = snakeSegments[index + 1]
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

export const drawSnake = ({ canvas, snakeSegments }) => {
  const { x, y } = getFuncs(canvas)
  const ctx = canvas.getContext('2d')

  drawBodyCircles({ ctx, snakeSegments, x, y })
  drawBodyConnections({ ctx, snakeSegments, x, y })
}
