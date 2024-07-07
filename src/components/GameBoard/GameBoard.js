import React, { useEffect, useRef } from 'react'

import { snakeSegments$ } from '@/store/snakeSegments.store'
import { apple$ } from '@/store/apple.store'
import { direction$ } from '@/store/direction.store'
import { startGame } from '@/store/main.store'
import {
  boardWidth,
  boardHeight,
} from '@/boardConfig'

import { Message } from '../Message/Message'

import { redrawCanvas } from './draw/redrawCanvas'
import './GameBoard.scss'

export const GameBoard = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    canvasRef.current.getContext('2d').translate(0.5, 0.5)
    startGame()

    snakeSegments$
      .subscribe((snakeSegments) => {
        redrawCanvas({
          canvas: canvasRef.current,
          snakeSegments,
          apple: apple$.value,
          nextDirection: direction$.value.next,
        })
      })

    apple$
      .subscribe((apple) => {
        redrawCanvas({
          canvas: canvasRef.current,
          snakeSegments: snakeSegments$.value,
          apple,
          nextDirection: direction$.value.next,
        })
      })

    direction$
      .subscribe((newDirection) => {
        redrawCanvas({
          canvas: canvasRef.current,
          snakeSegments: snakeSegments$.value,
          apple: apple$.value,
          nextDirection: newDirection.next,
        })
      })
  }, [])

  return (
    <div style={{ width: boardWidth, height: boardHeight, position: 'relative' }}>
      <canvas
        ref={canvasRef}
        className="GameBoard"
        width={boardWidth}
        height={boardHeight}
      />
      <Message />
    </div>
  )
}
