import { getFuncs } from './utilsForDraw'
import { colors, cellSize } from './boardConfig'

const drawHead = ({ x, y, snakeSegmensts, canvas }) => {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = colors.snake

  const head = snakeSegmensts[0]
  const body = snakeSegmensts[1]

  ctx.beginPath()
  ctx.arc(x(head.left + 0.5), y(head.top + 0.5), cellSize / 2, 0, 2 * Math.PI)
  if (head.top < body.top) { // up
    ctx.rect(x(head.left), y(head.top + 0.5), cellSize, cellSize / 2)
  } else if (head.top > body.top) { // down
    ctx.rect(x(head.left), y(head.top), cellSize, cellSize / 2)
  } else if (head.left < body.left) { // left
    ctx.rect(x(head.left + 0.5), y(head.top), cellSize / 2, cellSize)
  } else if (head.left > body.left) { // right
    ctx.rect(x(head.left), y(head.top), cellSize / 2, cellSize)
  }
  ctx.fill()
}

const drawSegments = ({ canvas, snakeSegmensts, x, y }) => {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = colors.snake

  for (let i = 0; i < snakeSegmensts.length; i++) {
    const { top, left } = snakeSegmensts[i]
    ctx.fillRect(x(left), y(top), cellSize, cellSize)
  }
}

export const drawSnake = ({ canvas, snakeSegmensts }) => {
  const { x, y } = getFuncs(canvas)

  drawHead({ canvas, x, y, snakeSegmensts })
  drawSegments({
    canvas,
    snakeSegmensts: snakeSegmensts.slice(1),
    x,
    y,
  })
}
