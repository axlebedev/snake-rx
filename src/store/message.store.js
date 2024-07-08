import { BehaviorSubject } from 'rxjs'

export const message$ = new BehaviorSubject({
  isActive: true,
  text: 'Swipe to start',
  blurRadius: 0,
})
