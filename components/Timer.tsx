'use client'

import { useEffect, useState } from 'react'

type TimerProps = {
  endsAt: number
  onComplete: () => void
}

export function Timer({ endsAt, onComplete }: TimerProps) {
  const [now, setNow] = useState(Date.now())

  const totalSeconds = Math.max(
    Math.ceil((endsAt - now) / 1000),
    0
  )

  const duration = Math.max(
    Math.ceil((endsAt - (endsAt - totalSeconds * 1000)) / 1000),
    1
  )

  useEffect(() => {
    if (totalSeconds === 0) {
      onComplete()
      return
    }

    const interval = setInterval(() => {
      setNow(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  }, [totalSeconds, onComplete])

  const radius = 48
  const circumference = 2 * Math.PI * radius
  const progress =
    circumference * (1 - totalSeconds / duration)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-3xl font-mono">
        {formatTime(totalSeconds)}
      </div>
    </div>
  )
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

