import { last } from 'lodash'

import { directions } from '@/consts'
import { colors, cellSize, snakeWidth } from '@/boardConfig'

import { getFuncs } from './utilsForDraw'

const drawBodyCircles = ({ ctx, snakeSegments, x, y }) => {
  const radius = snakeWidth * cellSize / 2
  ctx.fillStyle = colors.snake
  snakeSegments.forEach(({ top, left }) => {
    ctx.beginPath()
    ctx.arc(x(left), y(top), radius, 0, 2 * Math.PI)
    ctx.fill()
  })
}

const drawBodyConnections = ({ ctx, snakeSegments, x, y }) => {
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

const drawEyesWhite = ({ ctx, snakeSegments, nextDirection, x, y }) => {
  const radius = 0.25 // 0.25 * cellWidth
  const radiusPx = radius * cellSize
  ctx.fillStyle = colors.eyeWhite
  const { left, top } = last(snakeSegments)

  ctx.beginPath()
  if (nextDirection === directions.top) {
    ctx.arc(x(left - radius), y(top - radius), radiusPx, 0, 2 * Math.PI)
    ctx.arc(x(left + radius), y(top - radius), radiusPx, 0, 2 * Math.PI)
  }
  if (nextDirection === directions.bottom) {
    ctx.arc(x(left - radius), y(top + radius), radiusPx, 0, 2 * Math.PI)
    ctx.arc(x(left + radius), y(top + radius), radiusPx, 0, 2 * Math.PI)
  }
  if (nextDirection === directions.left) {
    ctx.arc(x(left - radius), y(top + radius), radiusPx, 0, 2 * Math.PI)
    ctx.arc(x(left - radius), y(top - radius), radiusPx, 0, 2 * Math.PI)
  }
  if (nextDirection === directions.right) {
    ctx.arc(x(left + radius), y(top + radius), radiusPx, 0, 2 * Math.PI)
    ctx.arc(x(left + radius), y(top - radius), radiusPx, 0, 2 * Math.PI)
  }
  ctx.fill()
}

const drawEyesBlack = ({ ctx, snakeSegments, nextDirection, x, y }) => {
  const radius = 0.25 // 0.25 * cellWidth
  const radiusBlack = 0.1 // * cellWidth
  const radiusPx = radiusBlack * cellSize
  ctx.fillStyle = colors.eyeBlack
  const { left, top } = last(snakeSegments)

  ctx.beginPath()
  if (nextDirection === directions.top) {
    ctx.arc(x(left - radius), y(top - radius - radiusBlack * 1.5), radiusPx, 0, 2 * Math.PI)
    ctx.arc(x(left + radius), y(top - radius - radiusBlack * 1.5), radiusPx, 0, 2 * Math.PI)
  }
  if (nextDirection === directions.bottom) {
    ctx.arc(x(left - radius), y(top + radius + radiusBlack * 1.5), radiusPx, 0, 2 * Math.PI)
    ctx.arc(x(left + radius), y(top + radius + radiusBlack * 1.5), radiusPx, 0, 2 * Math.PI)
  }
  if (nextDirection === directions.left) {
    ctx.arc(x(left - radius - radiusBlack * 1.5), y(top + radius), radiusPx, 0, 2 * Math.PI)
    ctx.arc(x(left - radius - radiusBlack * 1.5), y(top - radius), radiusPx, 0, 2 * Math.PI)
  }
  if (nextDirection === directions.right) {
    ctx.arc(x(left + radius + radiusBlack * 1.5), y(top + radius), radiusPx, 0, 2 * Math.PI)
    ctx.arc(x(left + radius + radiusBlack * 1.5), y(top - radius), radiusPx, 0, 2 * Math.PI)
  }
  ctx.fill()
}

export const drawSnake = ({ canvas, snakeSegments, nextDirection }) => {
  const { x, y } = getFuncs(canvas)
  const ctx = canvas.getContext('2d')

  drawBodyCircles({ ctx, snakeSegments, x, y })
  drawBodyConnections({ ctx, snakeSegments, x, y })
  drawEyesWhite({ ctx, snakeSegments, nextDirection, x, y })
  drawEyesBlack({ ctx, snakeSegments, nextDirection, x, y })
}
