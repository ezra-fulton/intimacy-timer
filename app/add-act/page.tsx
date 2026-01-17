'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

const HEAT_LEVELS = [
  { value: 'gentle', label: 'Gentle' },
  { value: 'playful', label: 'Playful' },
  { value: 'spicy', label: 'Spicy' },
  { value: 'after-dark', label: 'After Dark' },
]

export default function AddActPage() {
  const router = useRouter()

  const [act_text, setActText] = useState('')
  const [heat, setHeat] = useState('gentle')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error('Not authenticated')
      }

      // 1️⃣ Insert into acts
      const { data: error } = await supabase.rpc('add_user_act', {p_user_id: user.id, p_heat: heat, p_new_act: act_text})
      if (error) {
        console.error('Error adding user act: ', error)
        return
      }
      
      router.push('/moment')
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-zinc-900 p-6 rounded-xl shadow-lg"
      >
        <h1 className="text-2xl font-bold text-center">Add Your Own Act</h1>

        {/* Heat selector */}
        <div>
          <label className="block mb-2 text-sm text-zinc-400">Heat Level</label>
          <select
            value={heat}
            onChange={(e) => setHeat(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
          >
            {HEAT_LEVELS.map((h) => (
              <option key={h.value} value={h.value}>
                {h.label}
              </option>
            ))}
          </select>
        </div>

        {/* Act text */}
        <div>
          <label className="block mb-2 text-sm text-zinc-400">
            Describe the act
          </label>
          <textarea
            value={act_text}
            onChange={(e) => setActText(e.target.value)}
            required
            rows={5}
            className="w-full p-3 rounded bg-zinc-800 text-white border border-zinc-700 resize-none"
            placeholder="Write something that can last 5–15 minutes…"
          />
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading || !act_text}
          className="w-full py-3 rounded bg-pink-600 hover:bg-pink-700 disabled:opacity-50 font-semibold"
        >
          {loading ? 'Saving…' : 'Save Act'}
        </button>
      </form>
    </div>
  )
}

