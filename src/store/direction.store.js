import { BehaviorSubject } from 'rxjs'

import { initialValues } from '@/consts'

export const direction$ = new BehaviorSubject(initialValues.direction)
