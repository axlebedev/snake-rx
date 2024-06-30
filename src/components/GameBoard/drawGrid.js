import { colors, cellNum } from './boardConfig'
import { getFuncs } from './utilsForDraw'

export const drawGrid = (canvas) => {
  const { x, y } = getFuncs(canvas)

  const ctx = canvas.getContext('2d')

  ctx.fillStyle = colors.background
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = colors.grid
  ctx.lineWidth = 0.5
  ctx.setLineDash([3, 2])

  ctx.beginPath()
  for (let i = 0; i < cellNum; i++) {
    ctx.moveTo(x(0), y(i))
    ctx.lineTo(x(cellNum), y(i))

    ctx.moveTo(x(i), y(0))
    ctx.lineTo(x(i), y(cellNum))
  }
  ctx.stroke()
}
