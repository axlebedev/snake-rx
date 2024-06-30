import { getFuncs } from './utilsForDraw'
import { colors, cellSize, snakeWidth } from './boardConfig'

const drawHead = ({ x, y, snakeSegmensts, canvas }) => {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = colors.snake

  const head = snakeSegmensts[0]
  const body = snakeSegmensts[1]

  const snw2 = (1 - snakeWidth) / 2

  ctx.beginPath()
  ctx.arc(x(head.left + 0.5), y(head.top + 0.5), cellSize * snakeWidth / 2, 0, 2 * Math.PI)
  if (head.top < body.top) { // up
    ctx.rect(x(head.left + snw2), y(head.top + 0.5 + snw2), cellSize * snakeWidth, cellSize / 2)
  } else if (head.top > body.top) { // down
    ctx.rect(x(head.left + snw2), y(head.top + snw2), cellSize * snakeWidth, cellSize / 2)
  } else if (head.left < body.left) { // left
    ctx.rect(x(head.left + 0.5 + snw2), y(head.top + snw2), cellSize / 2, cellSize * snakeWidth)
  } else if (head.left > body.left) { // right
    ctx.rect(x(head.left + snw2), y(head.top + snw2), cellSize / 2, cellSize * snakeWidth)
  }
  ctx.fill()
}

// this function draws triangle
// const drawTail = ({ x, y, snakeSegmensts, canvas }) => {
//   const ctx = canvas.getContext('2d')
//   ctx.fillStyle = colors.snake
//
//   const tail = snakeSegmensts[snakeSegmensts.length - 1]
//   const body = snakeSegmensts[snakeSegmensts.length - 2]
//
//   ctx.beginPath()
//   if (tail.top < body.top) { // down
//     ctx.moveTo(x(tail.left), y(tail.top))
//     ctx.lineTo(x(tail.left + 1), y(tail.top))
//     ctx.lineTo(x(tail.left + 0.5), y(tail.top + 1))
//   } else if (tail.top > body.top) { // up
//     ctx.moveTo(x(tail.left + 0.5), y(tail.top))
//     ctx.lineTo(x(tail.left + 1), y(tail.top + 1))
//     ctx.lineTo(x(tail.left), y(tail.top + 1))
//   } else if (tail.left < body.left) { // right
//     ctx.moveTo(x(tail.left), y(tail.top + 0.5))
//     ctx.lineTo(x(tail.left + 1), y(tail.top))
//     ctx.lineTo(x(tail.left + 1), y(tail.top + 1))
//   } else if (tail.left > body.left) { // left
//     ctx.moveTo(x(tail.left), y(tail.top))
//     ctx.lineTo(x(tail.left + 1), y(tail.top + 0.5))
//     ctx.lineTo(x(tail.left), y(tail.top + 1))
//   }
//   ctx.fill()
// }

const drawMiddle = ({ canvas, snakeSegmensts, x, y }) => {
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = colors.snake
  const snw2 = (1 - snakeWidth) / 2

  // body segments
  for (let i = 1; i < snakeSegmensts.length - 1; i++) {
    drawHead({
      x,
      y,
      snakeSegmensts: snakeSegmensts.slice(i - 1, i + 1).reverse(),
      canvas,
    })
    drawHead({
      x,
      y,
      snakeSegmensts: snakeSegmensts.slice(i, i + 2),
      canvas,
    })
  }

  ctx.beginPath()
  // connections
  for (let i = 0; i < snakeSegmensts.length - 1; i++) {
    const begin = snakeSegmensts[i]
    const end = snakeSegmensts[i + 1]

    if (begin.left === end.left) {
      ctx.rect(
        x(begin.left + snw2),
        y((begin.top + end.top) / 2 - snw2),
        cellSize * snakeWidth,
        cellSize * (1 - snakeWidth),
      )
    } else {
      ctx.rect(
        x((begin.left + end.left) / 2 - snw2),
        y(begin.top + snw2),
        cellSize * (1 - snakeWidth),
        cellSize * snakeWidth,
      )
    }
  }
  ctx.fill()
}

export const drawSnake = ({ canvas, snakeSegmensts }) => {
  const { x, y } = getFuncs(canvas)

  drawHead({ canvas, x, y, snakeSegmensts })
  drawMiddle({ canvas, snakeSegmensts, x, y })
  drawHead({ canvas, x, y, snakeSegmensts: snakeSegmensts.slice(-2).reverse() })
}
