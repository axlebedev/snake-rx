import { BehaviorSubject } from 'rxjs'

import { initialValues } from '@/consts'
import { getNewApple } from './logic'

export const apple$ = new BehaviorSubject(getNewApple(initialValues.snakeSegments))
