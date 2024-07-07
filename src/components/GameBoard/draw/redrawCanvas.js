import { drawGrid } from './drawGrid'
import { drawSnake } from './drawSnake'
import { drawApple } from './drawApple'

export const redrawCanvas = ({ canvas, snakeSegments, apple, nextDirection }) => {
  drawGrid(canvas)
  drawSnake({ canvas, snakeSegments, nextDirection })
  drawApple({ canvas, applePos: apple })
}
