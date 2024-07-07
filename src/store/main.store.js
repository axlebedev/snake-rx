import { interval } from 'rxjs'

import { snakeSegments$ } from './snakeSegments.store'
import { direction$ } from './direction.store'

import { doNextTurn } from './logic'

export const startMain = () => {
  const main$ = interval(100)

  const sub = main$
    .subscribe(() => {
      const snakeSegments = snakeSegments$.value
      const direction = direction$.value
      const nextTurnValues = doNextTurn({ snakeSegments, direction })

      if (nextTurnValues.gameover) {
        sub.unsubscribe()
        return
      }

      snakeSegments$.next(nextTurnValues.snakeSegments)
    })
}
