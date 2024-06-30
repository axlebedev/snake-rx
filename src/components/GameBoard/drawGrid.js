import { scaleLinear } from 'd3'

import { colors, cellNum } from './boardConfig'

export const drawGrid = (canvas) => {
  const x = scaleLinear()
    .domain([0, cellNum])
    .range([0, canvas.width])

  const y = scaleLinear()
    .domain([0, cellNum])
    .range([0, canvas.height])


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
