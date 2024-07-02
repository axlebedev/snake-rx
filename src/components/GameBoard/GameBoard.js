import React, { useEffect, useRef } from 'react'

import {
  boardWidth,
  boardHeight,
} from './boardConfig'
import { drawGrid } from './drawGrid'
import { drawSnake } from './drawSnake'
import { drawApple } from './drawApple'
import './GameBoard.scss'

const snakeSegmensts = [
  { left: 5, top: 5 },
  { left: 5, top: 6 },
  { left: 6, top: 6 },
  { left: 7, top: 6 },
  { left: 8, top: 6 },
  { left: 9, top: 6 },
  { left: 9, top: 7 },
  { left: 8, top: 7 },
  { left: 7, top: 7 },
]
export const GameBoard = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    canvasRef.current.getContext('2d').translate(0.5, 0.5)

    drawGrid(canvasRef.current)
    drawSnake({ canvas: canvasRef.current, snakeSegmensts })
    drawApple({ canvas: canvasRef.current, applePos: { top: 10, left: 10 } })
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
