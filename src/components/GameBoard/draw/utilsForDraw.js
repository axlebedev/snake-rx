import { scaleLinear } from 'd3'

import { cellNum } from '@/boardConfig'

export const getFuncs = (canvas) => {
  const cellWidth2 = canvas.width / cellNum / 2
  const cellHeight2 = canvas.height / cellNum / 2

  const x = scaleLinear()
    .domain([0, cellNum])
    .range([-cellWidth2, canvas.width - cellWidth2])

  const y = scaleLinear()
    .domain([0, cellNum])
    .range([-cellHeight2, canvas.height - cellHeight2])

  return { x, y }
}

export const getGridFuncs = (canvas) => {
  const x = scaleLinear()
    .domain([0, cellNum])
    .range([0, canvas.width])

  const y = scaleLinear()
    .domain([0, cellNum])
    .range([0, canvas.height])

  return { x, y }
}

export const drawCircle = (ctx, left, top, radius) => {
  ctx.arc(left, top, radius, 0, Math.PI * 2)
}
