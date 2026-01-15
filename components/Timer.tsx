'use client'
import { useEffect, useState } from 'react'

export default function Timer({ seconds }: { seconds: number }) {
  const [time, setTime] = useState(seconds)

  useEffect(() => {
    if (time <= 0) return
    const i = setInterval(() => setTime(t => t - 1), 1000)
    return () => clearInterval(i)
  }, [time])

  return (
    <div className="text-6xl font-mono">
      {Math.floor(time / 60)}:{String(time % 60).padStart(2, '0')}
    </div>
  )
}

