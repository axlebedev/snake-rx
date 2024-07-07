import { last, random, isEqual } from 'lodash'

import { directions } from '@/consts'
import { cellNum } from '@/boardConfig'

const dSegment = {
  [directions.left]: { top: 0, left: -1 },
  [directions.right]: { top: 0, left: 1 },
  [directions.top]: { top: -1, left: 0 },
  [directions.bottom]: { top: 1, left: 0 },
}
const getNewSegment = ({ head, direction }) => {
  return {
    top: head.top + dSegment[direction].top,
    left: head.left + dSegment[direction].left,
  }
}

const checkIsSnakeValid = ({ snakeSegments }) => {
  const head = last(snakeSegments)
  const isSnakeInsideOfBoard = (
    head.left > 0
    && head.left <= cellNum
    && head.top > 0
    && head.top <= cellNum
  )
  if (!isSnakeInsideOfBoard) {
    return false
  }

  for (let i = 0; i < snakeSegments.length - 1; ++i) {
    const segment = snakeSegments[i]
    if (head.left === segment.left && head.top === segment.top) {
      return false
    }
  }
  return true
}

export const doNextTurn = ({ snakeSegments, direction, apple }) => {
  const newSegment = getNewSegment({ head: last(snakeSegments), direction })

  const isEatApple = newSegment.top === apple.top && newSegment.left === apple.left
  if (isEatApple) {
    return {
      snakeSegments: [
        ...snakeSegments,
        newSegment,
      ],
      shouldUpdateApple: true,
    }
  }

  const nextSnakeSegments = [
    ...snakeSegments.slice(1),
    newSegment,
  ]

  const isValid = checkIsSnakeValid({ snakeSegments: nextSnakeSegments })

  if (!isValid) {
    return {
      gameover: true,
    }
  }

  return {
    snakeSegments: nextSnakeSegments,
  }
}

const getRandomPos = () => {
  return {
    top: random(1, cellNum),
    left: random(1, cellNum),
  }
}

export const getNewApple = (snakeSegments) => {
  // 1..cellNum
  let newApple = getRandomPos()
  while (snakeSegments.find((segment) => {
    return isEqual(segment, newApple)
  })) {
    newApple = getRandomPos()
  }
  return newApple
}
