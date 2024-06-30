import React, { useEffect, useRef } from 'react'

import {
  boardWidth,
  boardHeight,
} from './boardConfig'
import { drawGrid } from './drawGrid'
import { drawSnake } from './drawSnake'
import './GameBoard.scss'

const snakeSegmensts = [
  { left: 5, top: 5 },
  { left: 5, top: 6 },
  { left: 6, top: 6 },
  { left: 7, top: 6 },
  { left: 8, top: 6 },
  { left: 9, top: 6 },
]
export const GameBoard = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    drawGrid(canvasRef.current)
    drawSnake({ canvas: canvasRef.current, snakeSegmensts })
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="GameBoard"
      width={boardWidth}
      height={boardHeight}
    />
  )
}
