export const HEAT_LEVELS = [
  { id: 'gentle', label: 'Gentle', icon: '😌' },
  { id: 'playful', label: 'Playful', icon: '😉' },
  { id: 'spicy', label: 'Spicy', icon: '🔥' },
  { id: 'after-dark', label: 'After Dark', icon: '😈' },
] as const

export type HeatLevel = typeof HEAT_LEVELS[number]['id']

