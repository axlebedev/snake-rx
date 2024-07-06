import { BehaviorSubject } from 'rxjs'

import { initialValues } from '@/consts'

export const snakeSegments$ = new BehaviorSubject(initialValues.snakeSegments)
