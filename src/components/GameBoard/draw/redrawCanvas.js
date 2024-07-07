import { drawGrid } from './drawGrid'
import { drawSnake } from './drawSnake'
import { drawApple } from './drawApple'

export const redrawCanvas = ({ canvas, snakeSegments, apple }) => {
  drawGrid(canvas)
  drawSnake({ canvas, snakeSegments })
  drawApple({ canvas, applePos: apple })
}
