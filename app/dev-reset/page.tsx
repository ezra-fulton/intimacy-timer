'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function DevReset() {
  const router = useRouter()
  const [done, setDone] = useState(false)

  useEffect(() => {
    async function clearTokens() {
      try {
        // 1️⃣ Sign out from Supabase → clears local tokens
        await supabase.auth.signOut()

        // 2️⃣ Clear localStorage & sessionStorage for extra safety
        localStorage.clear()
        sessionStorage.clear()

        // 3️⃣ Update state to show reset complete
        setDone(true)

        // 4️⃣ Optional: redirect to /login after short delay
        setTimeout(() => {
          router.replace('/login')
        }, 1000)
      } catch (err) {
        console.error('Dev reset failed', err)
      }
    }

    clearTokens()
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      {done ? (
        <div className="text-center">
          <p className="mb-2 font-bold text-lg">✅ Dev reset complete</p>
          <p>Redirecting to login...</p>
        </div>
      ) : (
        <p>Resetting auth tokens...</p>
      )}
    </div>
  )
}

