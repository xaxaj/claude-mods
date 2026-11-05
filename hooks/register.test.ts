import { test, expect } from 'claude-code/testing'
import { paris, isNight, nightSvg, daySvg, phrase } from './register'

test('heure de Paris et nuit', () => {
  expect(paris(Date.UTC(2026, 10, 5, 23, 31)).text).toBe('00:31')
  expect(isNight(0)).toBe(true)
  expect(isNight(21)).toBe(true)
  expect(isNight(12)).toBe(false)
  expect(isNight(7)).toBe(false)
})

test('image nuit avec l\'heure', () => {
  const svg = nightSvg('00:31', 'Avance.')
  expect(svg.startsWith('<svg')).toBe(true)
  expect(svg.includes('00:31')).toBe(true)
})

test('phrase stable 15 minutes puis change', () => {
  const t = Date.UTC(2026, 10, 5, 23, 30)
  expect(phrase(t)).toBe(phrase(t + 14 * 60_000))
  expect(phrase(t)).not.toBe(phrase(t + 15 * 60_000))
})

test('image de jour', () => {
  expect(daySvg('12:00', 'Avance.').includes('#ffd23f')).toBe(true)
})
