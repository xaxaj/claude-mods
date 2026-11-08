export type Now = number

declare module 'claude-code' {
  interface PluginState {
    'banniere-nuit': { now: Now }
  }
}
