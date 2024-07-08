import React, { useEffect, useState } from 'react'

import { message$ } from '@/store/message.store'

import './Message.scss'

export const Message = () => {
  const [isActive, setActive] = useState(null)

  useEffect(() => {
    message$.subscribe(({ isActive }) => setActive(isActive))
  }, [])

  if (!isActive) {
    return null
  }

  return (
    <div
      className="Message"
      style={{ backdropFilter: `blur(${message$.value.blurRadius}px)` }}

    >
      {message$.value.text}
    </div>
  )
}
