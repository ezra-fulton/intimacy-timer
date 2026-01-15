'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import HeatSelector from '@/components/HeatSelector'
import { Timer } from '@/components/Timer'
import { HeatLevel } from '@/lib/heat-levels'
import { useRouter } from 'next/navigation'

const SAVED_ENDS_AT  = 'moment_ends_at'
const SAVED_ACT  = 'act'

export default function Moment() {
  const [heat, setHeat] = useState<HeatLevel>('gentle')
  const [act, setAct] = useState<string | null>(null)
  const router = useRouter()
  const [endsAt, setEndsAt] = useState<number>(0)

  useEffect(() => {
       const savedEndsAt = window.localStorage.getItem(SAVED_ENDS_AT)
       const savedAct = window.localStorage.getItem(SAVED_ACT)
       if (savedEndsAt) {
         setEndsAt(Number(savedEndsAt))
       }
       if (savedAct) {
         setAct(savedAct)
       }
  }, [])

  async function start() {
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      console.error('No user session!')
      return
    }

    // 2️⃣ Seed default acts for new users
    console.log('User ID for seeding:', user.id)

    const { error: seedError } = await supabase.rpc('seed_acts_for_user', { user_uuid: user.id })
    if (seedError) {
      console.error('Error seeding acts:', seedError)
    }
 
    const { data: act, error } = await supabase.rpc('get_random_act_for_user', {p_user_id: user.id, p_heat: heat})
    if (error) {
      console.error('Error getting random act: ', error)
      return
    }
    setAct(act)
    const chosenDuration = [300, 600, 900][Math.floor(Math.random() * 3)]
    const end = Date.now() + chosenDuration * 1000
    setEndsAt(end)
    window.localStorage.setItem(SAVED_ENDS_AT, String(end))
    window.localStorage.setItem(SAVED_ACT, act)
  }

  function handleComplete() {
    window.localStorage.removeItem(SAVED_ENDS_AT)
    window.localStorage.removeItem(SAVED_ACT)
    setEndsAt(0)
    setAct(null)
    router.push('/moment')
  }

  if (endsAt === 0) {
	  return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 p-4">
	    <div className="p-6 flex flex-col gap-6">
	      <HeatSelector value={heat} onChange={setHeat} />
	      <button
		onClick={start}
		className="bg-white text-black p-4 rounded text-xl"
	      >
		Start a Moment
	      </button>
	    </div></div>
	  )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 p-4">
    <div className="p-6 flex flex-col gap-6 items-center">
      <p className="text-3xl text-center">{act}</p>
      {endsAt !== null && (
        <Timer
          endsAt={endsAt}
          onComplete={handleComplete}
        />
      )} 
    </div>
    </div>
    )

}

