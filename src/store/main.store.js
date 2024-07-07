import { interval, fromEvent } from 'rxjs'

import { directions } from '@/consts'

import { snakeSegments$ } from './snakeSegments.store'
import { direction$ } from './direction.store'
import { apple$ } from './apple.store'

import { doNextTurn, getNewApple } from './logic'

export const startGame = () => {
  const mainInterval$ = interval(1000)

  const sub = mainInterval$
    .subscribe(() => {
      const snakeSegments = snakeSegments$.value
      const direction = direction$.value
      const apple = apple$.value
      const nextTurnValues = doNextTurn({ snakeSegments, direction, apple })

      if (nextTurnValues.gameover) {
        sub.unsubscribe()
        return
      }

      if (nextTurnValues.shouldUpdateApple) {
        apple$.next(getNewApple(nextTurnValues.snakeSegments))
      }

      snakeSegments$.next(nextTurnValues.snakeSegments)
    })

  const keyDowns = fromEvent(document, 'keydown')
    .subscribe((keydown) => {
      const currentDirection = direction$.value
      if (keydown.code === 'ArrowDown' && currentDirection !== directions.top) {
        direction$.next(directions.bottom)
      }
      if (keydown.code === 'ArrowUp' && currentDirection !== directions.bottom) {
        direction$.next(directions.top)
      }
      if (keydown.code === 'ArrowLeft' && currentDirection !== directions.right) {
        direction$.next(directions.left)
      }
      if (keydown.code === 'ArrowRight' && currentDirection !== directions.left) {
        direction$.next(directions.right)
      }
    })
}
