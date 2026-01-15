'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { HeatLevel } from '@/lib/heat-levels'

export default function AddAct() {
  const [text, setText] = useState('')
  const [heat, setHeat] = useState<HeatLevel>('gentle')

  async function save() {
    const { data: act } = await supabase
      .from('acts')
      .insert({ text, heat, is_global: false })
      .select()
      .single()

    await supabase.from('user_acts').insert({
      act_id: act.id,
      active: true,
    })

    setText('')
  }

  return (
    <div className="p-6 flex flex-col gap-4">
      <textarea
        className="p-3 bg-neutral-800 rounded"
        placeholder="Your custom act"
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button onClick={save} className="bg-white text-black p-3 rounded">
        Save Act
      </button>
    </div>
  )
}

