'use client'
import { HEAT_LEVELS, HeatLevel } from '@/lib/heat-levels'

export default function HeatSelector({
  value,
  onChange,
}: {
  value: HeatLevel
  onChange: (h: HeatLevel) => void
}) {
  return (
    <div className="flex flex-col gap-3">
      {HEAT_LEVELS.map(h => {
        const selected = value === h.id

        return (
          <button
            key={h.id}
            onClick={() => onChange(h.id)}
            className={`
              flex items-center gap-3 px-4 py-3 rounded-lg text-left
              ${selected
                ? 'bg-white text-black'
                : 'bg-neutral-800 text-neutral-100 hover:bg-neutral-700'}
            `}
          >
            {/* Icon column */}
            <span className="w-6 text-center text-lg">
              {h.icon}&nbsp;&nbsp;&nbsp;
            </span>

            {/* Text column */}
            <span className="flex-1 font-medium">
              {h.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

