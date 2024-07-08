import { BehaviorSubject } from 'rxjs'

export const message$ = new BehaviorSubject({ isActive: false, text: '', blurRadius: 1 })
