'use client'  // Must be first line for client component

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    async function checkAuth() {
      try {
	const { data: { session } } = await supabase.auth.getSession()
	if (!session) {
          router.replace('/login')
  	  return
	}
	
        // ✅ Step 1: check backend for actual user
        const { data: { user }, error } = await supabase.auth.getUser()

        if (error) {
          console.error('Auth error', error)
        }

        if (user) {
          // User exists on backend → safe to go to /moment
          router.replace('/moment')
        } else {
          // No user → send to login
          router.replace('/login')
        }
      } catch (err) {
        console.error('Unexpected auth check error', err)
        router.replace('/login')
      }
    }

    checkAuth()
  }, [router])

  return null // nothing to render while checking
}

