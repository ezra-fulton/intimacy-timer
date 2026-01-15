'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import HeatSelector from '@/components/HeatSelector'
import Timer from '@/components/Timer'
import { HeatLevel } from '@/lib/heat-levels'

export default function Moment() {
  const [heat, setHeat] = useState<HeatLevel>('gentle')
  const [act, setAct] = useState<string | null>(null)
  const [duration, setDuration] = useState<number | null>(null)

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

    const { data } = await supabase
      .from('user_acts')
      .select('acts(text)')
      .eq('active', true)
      .eq('acts.heat', heat)

    if (!data?.length) return

    const row = data[Math.floor(Math.random() * data.length)]
    const act = row.acts[0]
    setAct(act.text)
    setDuration([300, 600, 900][Math.floor(Math.random() * 3)])
  }

  if (act && duration) {
    return (
      <div className="p-6 flex flex-col gap-6 items-center">
        <p className="text-xl text-center">{act}</p>
        <Timer seconds={duration} />
      </div>
    )
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <HeatSelector value={heat} onChange={setHeat} />
      <button
        onClick={start}
        className="bg-white text-black p-4 rounded text-xl"
      >
        Start a Moment
      </button>
    </div>
  )
}

