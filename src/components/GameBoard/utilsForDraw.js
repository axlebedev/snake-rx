import { scaleLinear } from 'd3'

import { cellNum } from './boardConfig'

export const getFuncs = (canvas) => {
  const x = scaleLinear()
    .domain([0, cellNum])
    .range([0, canvas.width])

  const y = scaleLinear()
    .domain([0, cellNum])
    .range([0, canvas.height])

  return { x, y }
}
