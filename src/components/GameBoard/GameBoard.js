import React, { useEffect, useRef } from 'react'

import {
  boardWidth,
  boardHeight,
} from './boardConfig'
import { drawGrid } from './drawGrid'
import './GameBoard.scss'

export const GameBoard = () => {
  const ref = useRef(null)

  useEffect(() => {
    drawGrid(ref.current)
  });

  return (
    <canvas
      ref={ref}
      className="GameBoard"
      width={boardWidth}
      height={boardHeight}
    />
  )
}
