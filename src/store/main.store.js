import { interval } from 'rxjs'

import { snakeSegments$ } from './snakeSegments.store'
import { direction$ } from './direction.store'
import { apple$ } from './apple.store'

import { doNextTurn, getNewApple } from './logic'

export const startMain = () => {
  const main$ = interval(100)

  const sub = main$
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
}
