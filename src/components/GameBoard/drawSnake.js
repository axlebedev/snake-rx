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

const drawTail = ({ x, y, snakeSegmensts, canvas }) => {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = colors.snake

  const tail = snakeSegmensts[snakeSegmensts.length - 1]
  const body = snakeSegmensts[snakeSegmensts.length - 2]

  ctx.beginPath()
  if (tail.top < body.top) { // down
    ctx.moveTo(x(tail.left), y(tail.top))
    ctx.lineTo(x(tail.left + 1), y(tail.top))
    ctx.lineTo(x(tail.left + 0.5), y(tail.top + 1))
  } else if (tail.top > body.top) { // up
    ctx.moveTo(x(tail.left + 0.5), y(tail.top))
    ctx.lineTo(x(tail.left + 1), y(tail.top + 1))
    ctx.lineTo(x(tail.left), y(tail.top + 1))
  } else if (tail.left < body.left) { // right
    ctx.moveTo(x(tail.left), y(tail.top + 0.5))
    ctx.lineTo(x(tail.left + 1), y(tail.top))
    ctx.lineTo(x(tail.left + 1), y(tail.top + 1))
  } else if (tail.left > body.left) { // left
    ctx.moveTo(x(tail.left), y(tail.top))
    ctx.lineTo(x(tail.left + 1), y(tail.top + 0.5))
    ctx.lineTo(x(tail.left), y(tail.top + 1))
  }
  ctx.fill()
}

const drawMiddle = ({ canvas, snakeSegmensts, x, y }) => {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = colors.snake

  for (let i = 1; i < snakeSegmensts.length - 1; i++) {
    const { top, left } = snakeSegmensts[i]
    ctx.fillRect(x(left), y(top), cellSize, cellSize)
  }
}

export const drawSnake = ({ canvas, snakeSegmensts }) => {
  const { x, y } = getFuncs(canvas)

  drawHead({ canvas, x, y, snakeSegmensts })
  drawMiddle({
    canvas,
    snakeSegmensts: snakeSegmensts,
    x,
    y,
  })
  drawTail({ canvas, x, y, snakeSegmensts })
}
