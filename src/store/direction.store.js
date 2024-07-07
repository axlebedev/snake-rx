import { BehaviorSubject } from 'rxjs'

import { initialValues } from '@/consts'

export const direction$ = new BehaviorSubject({
  current: initialValues.direction,
  next: initialValues.direction,
})
