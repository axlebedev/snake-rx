import React, { useEffect, useState } from 'react'

import { message$ } from '@/store/message.store'

import './Message.scss'

export const Message = () => {
  const [text, setText] = useState(null)

  useEffect(() => {
    message$.subscribe((value) => {
      setText(value)
    })
  }, [])

  if (!text) {
    return null
  }

  return (
    <div className="Message">{text}</div>
  )
}
