import { interval, fromEvent, BehaviorSubject } from 'rxjs'

import { directions } from '@/consts'

import { snakeSegments$ } from './snakeSegments.store'
import { direction$ } from './direction.store'
import { apple$ } from './apple.store'

import { doNextTurn, getNewApple } from './logic'

export const startGame = () => {
  const mainInterval$ = new BehaviorSubject(1000)

  const sub = mainInterval$
    .subscribe((value) => {
      const snakeSegments = snakeSegments$.value
      const direction = direction$.value.next
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
      direction$.next({ current: direction, next: direction })

      const nextValue = 1000 - Math.sqrt(snakeSegments.length) * 50
      setTimeout(() => {
        mainInterval$.next(nextValue)
      }, nextValue)
    })

  const keyDowns = fromEvent(document, 'keydown')
    .subscribe((keydown) => {
      const currentDirection = direction$.value.current
      if (keydown.code === 'ArrowDown' && currentDirection !== directions.top) {
        direction$.next({ current: currentDirection, next: directions.bottom })
      }
      if (keydown.code === 'ArrowUp' && currentDirection !== directions.bottom) {
        direction$.next({ current: currentDirection, next: directions.top })
      }
      if (keydown.code === 'ArrowLeft' && currentDirection !== directions.right) {
        direction$.next({ current: currentDirection, next: directions.left })
      }
      if (keydown.code === 'ArrowRight' && currentDirection !== directions.left) {
        direction$.next({ current: currentDirection, next: directions.right })
      }
    })
}
