import React, { useEffect, useRef } from 'react'

import { snakeSegments$ } from '@/store/snakeSegments.store'
import { apple } from '@/store/apple.store'
import { startMain } from '@/store/main.store'
import {
  boardWidth,
  boardHeight,
} from '@/boardConfig'

import { drawGrid } from './draw/drawGrid'
import { drawSnake } from './draw/drawSnake'
import { drawApple } from './draw/drawApple'
import './GameBoard.scss'

export const GameBoard = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    canvasRef.current.getContext('2d').translate(0.5, 0.5)
    startMain()

    snakeSegments$
      .subscribe((snakeSegments) => {
        console.log('%c11111', 'background:#0090ff', 'snakeSegments=', snakeSegments)
        drawGrid(canvasRef.current)
        drawSnake({ canvas: canvasRef.current, snakeSegments })
        drawApple({ canvas: canvasRef.current, applePos: apple })
      })
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
