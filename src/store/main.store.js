import {
  fromEvent,
  BehaviorSubject,
  switchMap,
  map,
  filter,
} from 'rxjs'

import { directions } from '@/consts'

import { snakeSegments$ } from './snakeSegments.store'
import { direction$ } from './direction.store'
import { apple$ } from './apple.store'
import { message$ } from './message.store'

import { doNextTurn, getNewApple } from './logic'

const swipeTolerance = 10 // px

const onNewDirection = (newDirection) => {
  const currentDirection = direction$.value.current
  if (newDirection === directions.bottom && currentDirection !== directions.top) {
    direction$.next({ current: currentDirection, next: directions.bottom })
  }
  if (newDirection === directions.top && currentDirection !== directions.bottom) {
    direction$.next({ current: currentDirection, next: directions.top })
  }
  if (newDirection === directions.left && currentDirection !== directions.right) {
    direction$.next({ current: currentDirection, next: directions.left })
  }
  if (newDirection === directions.right && currentDirection !== directions.left) {
    direction$.next({ current: currentDirection, next: directions.right })
  }
}

export const startGame = () => {
  const keyDownsSubscription = fromEvent(document, 'keydown')
    .pipe(
      map((keydown) => {
        switch (keydown.code) {
        case 'ArrowDown':
          return directions.bottom
        case 'ArrowUp':
          return directions.up
        case 'ArrowLeft':
          return directions.left
        case 'ArrowRight':
        default:
          return directions.right
        }
      }),
    )
    .subscribe(onNewDirection)

  fromEvent(document, 'touchstart')
    .pipe(
      switchMap((startEvent) => {
        startEvent.preventDefault()
        startEvent.stopImmediatePropagation()

        return fromEvent(document, 'touchend')
          .pipe(
            map((event) => {
              const start = startEvent.touches[0]
              const end = event.changedTouches[0]
              return {
                dLeft: end.clientX - start.clientX,
                dTop: end.clientY - start.clientY,
              }
            }),
            filter(({ dLeft, dTop }) =>
              Math.abs(dLeft) >= swipeTolerance || Math.abs(dTop) >= swipeTolerance),
            map(({ dLeft, dTop }) => {
              if (Math.abs(dLeft) > Math.abs(dTop)) {
                return dLeft < 0 ? directions.left : directions.right
              }
              return dTop < 0 ? directions.top : directions.bottom
            }),
          )
      }),
    )
    .subscribe(onNewDirection)

  const mainInterval$ = new BehaviorSubject(1000)

  const intervalSubscription = mainInterval$
    .subscribe(() => {
      const snakeSegments = snakeSegments$.value
      const direction = direction$.value.next
      const apple = apple$.value
      const nextTurnValues = doNextTurn({ snakeSegments, direction, apple })

      if (nextTurnValues.gameover) {
        intervalSubscription.unsubscribe()
        keyDownsSubscription.unsubscribe()
        message$.next('YOU DIED')
        return
      }

      if (nextTurnValues.shouldUpdateApple) {
        apple$.next(getNewApple(nextTurnValues.snakeSegments))
      }

      snakeSegments$.next(nextTurnValues.snakeSegments)
      direction$.next({ current: direction, next: direction })

      const nextValue = 1000 - Math.sqrt(snakeSegments.length) * 100
      setTimeout(() => {
        mainInterval$.next(nextValue)
      }, nextValue)
    })
}
