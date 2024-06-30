import { getFuncs } from './utilsForDraw'
import { colors, cellSize } from './boardConfig'

// const drawHead = ({ x, y, snakeSegmensts, ctx }) => {
//   ctx.fillStyle = colors.snake
//
//   const center = snakeSegmensts()
//   // up
//   if (snakeSegmensts[0].y < snakeSegmensts[1].y) {
//     ctx.arc()
//   }
// }

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

  drawSegments({ canvas, snakeSegmensts, x, y })
}
