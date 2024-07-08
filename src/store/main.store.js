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

export const startGame = () => {
  const gameIsRunning$ = new BehaviorSubject(false)

  const isNotOppositeDirection = (dir) => {
    const { current } = direction$.value
    return !(
      dir === directions.left && current === directions.right
      || dir === directions.right && current === directions.left
      || dir === directions.top && current === directions.bottom
      || dir === directions.bottom && current === directions.top
    )
  }

  const onNewDirection = (newDirection) => {
    if (newDirection === null) {
      gameIsRunning$.next(false)
    } else {
      gameIsRunning$.next(true)
      direction$.next({
        current: direction$.value.current,
        next: newDirection,
      })
    }
  }

  const keyDownsSubscription = fromEvent(document, 'keydown')
    .pipe(
      map((keydown) => {
        switch (keydown.code) {
        case 'ArrowDown':
          return directions.bottom
        case 'ArrowUp':
          return directions.top
        case 'ArrowLeft':
          return directions.left
        case 'ArrowRight':
          return directions.right
        default:
          return null
        }
      }),
      filter(isNotOppositeDirection),
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
            map(({ dLeft, dTop }) => {
              if (Math.abs(dLeft) < swipeTolerance && Math.abs(dTop) < swipeTolerance) {
                return null
              }
              if (Math.abs(dLeft) > Math.abs(dTop)) {
                return dLeft < 0 ? directions.left : directions.right
              }
              return dTop < 0 ? directions.top : directions.bottom
            }),
            filter(isNotOppositeDirection),
          )
      }),
    )
    .subscribe(onNewDirection)

  const mainInterval$ = new BehaviorSubject(1000)

  const runInterval = () => {
    const nextValue = 1000 - Math.sqrt(snakeSegments$.value.length) * 100
    setTimeout(() => {
      mainInterval$.next(nextValue)
    }, nextValue)
  }
  const intervalSubscription = mainInterval$
    .subscribe(() => {
      if (!gameIsRunning$.value) {
        runInterval()
        return
      }

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

      runInterval()
    })
}
