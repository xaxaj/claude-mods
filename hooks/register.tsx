import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

const now = atom({ plugin: 'banniere-nuit', key: 'now' } as const, 0)

// Heure de Paris : le serveur est en UTC.
export const paris = (ms: number) => {
  const p = new Intl.DateTimeFormat('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(ms)
  const hour = Number(p.find(x => x.type === 'hour')?.value)
  const minute = p.find(x => x.type === 'minute')?.value ?? '00'
  return { hour, text: `${String(hour).padStart(2, '0')}:${minute}` }
}

// Étoiles fixes : la scène ne change pas d'un rendu à l'autre.
const STARS = [[40,18,1.2],[95,52,.8],[150,24,1],[210,64,.7],[265,14,1.1],[330,40,.8],[395,20,1.3],[450,58,.7],[520,30,1],[585,12,.8],[640,46,1.1],[700,22,.7],[760,56,.9],[130,72,.6],[480,8,.9],[610,70,.6]]

const PHRASES_FR = [
  'Chaque ligne de code te rapproche du but.',
  'Petit pas aujourd\'hui, grand projet demain.',
  'La constance bat le talent.',
  'Tu construis quelque chose qui compte.',
  'Un bug corrigé, c\'est une victoire.',
  'Avance, même lentement.',
  'Le meilleur moment, c\'est maintenant.',
  'Fais-le bien, puis fais-le mieux.',
  'Ta persévérance fera la différence.',
  'Concentre-toi sur une chose à la fois.',
  'Les grandes choses prennent du temps.',
  'Crois en ce que tu bâtis.',
]

const PHRASES_EN = [
  'Every line of code gets you closer.',
  'Small step today, big project tomorrow.',
  'Consistency beats talent.',
  'You are building something that matters.',
  'A fixed bug is a victory.',
  'Keep going, even slowly.',
  'The best time is now.',
  'Do it well, then do it better.',
  'Your persistence will make the difference.',
  'Focus on one thing at a time.',
  'Great things take time.',
  'Believe in what you build.',
]

// Change toutes les 15 minutes, la même phrase pour tout le quart d'heure.
export const phrase = (ms: number, lang: string = 'fr') => {
  const list = lang === 'en' ? PHRASES_EN : PHRASES_FR
  return list[Math.floor(ms / 900_000) % list.length]
}

export const nightSvg = (time: string, quote: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="90" style="display:block">
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1026"/><stop offset="1" stop-color="#1f2a5a"/></linearGradient>
<radialGradient id="glow"><stop offset="0" stop-color="#fff6d5" stop-opacity=".45"/><stop offset="1" stop-color="#fff6d5" stop-opacity="0"/></radialGradient>
<filter id="neon" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3" result="b"><animate attributeName="stdDeviation" values="2;5;2" dur="3s" repeatCount="indefinite"/></feGaussianBlur><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<mask id="crescent"><rect x="-1000" width="3000" height="90" fill="#fff"/><circle cx="722" cy="34" r="20" fill="#000"/></mask>
</defs>
<rect width="100%" height="90" rx="12" fill="url(#sky)"/>
<g><animateTransform attributeName="transform" type="translate" values="0 0;-14 2;0 0" dur="24s" repeatCount="indefinite"/>
${STARS.map(([x, y, r], i) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff"><animate attributeName="opacity" values=".15;1;.15" dur="${2 + (i % 4)}s" begin="${(i * 0.37).toFixed(2)}s" repeatCount="indefinite"/></circle>`).join('')}
</g>
<line x1="0" y1="0" x2="40" y2="-12" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity="0">
<animate attributeName="opacity" values="0;0;.9;0" keyTimes="0;.85;.9;1" dur="9s" repeatCount="indefinite"/>
<animateTransform attributeName="transform" type="translate" values="560 10;560 10;420 52" keyTimes="0;.85;1" dur="9s" repeatCount="indefinite"/>
</line>
<svg x="100%" overflow="visible"><g transform="translate(-800 0)">
<circle cx="712" cy="40" r="42" fill="url(#glow)"><animate attributeName="opacity" values=".5;1;.5" dur="3s" repeatCount="indefinite"/></circle>
<g filter="url(#neon)"><circle cx="712" cy="40" r="22" fill="#fdf3c4" stroke="#ffe066" stroke-width="2" mask="url(#crescent)"/>
<animate attributeName="opacity" values=".8;1;.8" dur="3s" repeatCount="indefinite"/></g>
</g></svg>
<path d="M0 90 L0 70 Q90 52 180 68 T380 64 T580 70 T800 62 T1000 66 T1200 60 T1400 68 T1600 62 T1800 66 T2000 60 T2200 68 T2400 62 L2400 90 Z" fill="#0a0f22"/>
<text x="28" y="44" font-family="system-ui,sans-serif" font-size="28" font-weight="600" fill="#ffffff">${time}</text>
<text x="28" y="70" font-family="system-ui,sans-serif" font-size="14" fill="#c3cbf2">${quote}</text>
</svg>`

// Même cadre que la nuit : ciel bleu, soleil qui rayonne, nuages qui passent.
export const daySvg = (time: string, quote: string) => `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="90" style="display:block">
<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a8ee6"/><stop offset="1" stop-color="#9fd3ff"/></linearGradient>
<radialGradient id="glow"><stop offset="0" stop-color="#fff3a0" stop-opacity=".7"/><stop offset="1" stop-color="#fff3a0" stop-opacity="0"/></radialGradient>
<g id="cloud" fill="#fff"><ellipse cx="0" cy="0" rx="26" ry="9"/><ellipse cx="-12" cy="-6" rx="12" ry="9"/><ellipse cx="9" cy="-8" rx="14" ry="11"/></g>
</defs>
<rect width="100%" height="90" rx="12" fill="url(#sky)"/>
<svg x="100%" overflow="visible"><g transform="translate(-800 0)">
<circle cx="712" cy="40" r="46" fill="url(#glow)"><animate attributeName="r" values="40;50;40" dur="4s" repeatCount="indefinite"/></circle>
<g transform="translate(712 40)"><g stroke="#ffd23f" stroke-width="2.5" stroke-linecap="round">
${Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="-27" x2="0" y2="-35" transform="rotate(${i * 30})"/>`).join('')}
<animateTransform attributeName="transform" type="rotate" values="0;360" dur="30s" repeatCount="indefinite"/></g>
<circle r="20" fill="#ffd23f"/></g>
</g></svg>
<use href="#cloud" opacity=".95"><animateTransform attributeName="transform" type="translate" values="-60 30;860 30" dur="60s" repeatCount="indefinite"/></use>
<use href="#cloud" opacity=".8"><animateTransform attributeName="transform" type="translate" values="300 18;860 18;-60 18;300 18" keyTimes="0;.4;.4001;1" dur="90s" repeatCount="indefinite"/></use>
<use href="#cloud" opacity=".7"><animateTransform attributeName="transform" type="translate" values="560 50;860 50;-60 50;560 50" keyTimes="0;.25;.2501;1" dur="75s" repeatCount="indefinite"/></use>
<path d="M0 90 L0 82 Q90 74 180 80 T380 78 T580 82 T800 72 T1000 80 T1200 74 T1400 82 T1600 76 T1800 80 T2000 74 T2200 82 T2400 76 L2400 90 Z" fill="#4caf50"/>
<text x="28" y="44" font-family="system-ui,sans-serif" font-size="28" font-weight="600" fill="#0d2a4a">${time}</text>
<text x="28" y="70" font-family="system-ui,sans-serif" font-size="14" fill="#123a63">${quote}</text>
</svg>`

export const isNight = (hour: number) => hour >= 21 || hour < 7

export const register: Register = (on, options) => {
  const lang = options.langue === 'en' ? 'en' : 'fr'
  // Horloge démarrée une seule fois : à l'ouverture de la session, ou au premier affichage après un /reload-plugins
  let ticking = false
  const start = async ($: any) => { // le $ de n'importe quel crochet
    if (ticking) return
    ticking = true
    const tick = async () => { const ms = await $.clock.now(); await update($, now, () => ms) }
    await tick()
    $.clock.every(30_000, tick)
  }

  on('session.start', async ($, e, next) => {
    await start($)
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    await start($)
    const ms = (await read($, now)) || (await $.clock.now())
    const { hour, text } = paris(ms)
    // Les bandeaux des autres extensions (ponytail) restent affichés sous la bannière.
    const below = await next(e)
    const ui = $.ui.resolve(e)
    const banner = e.surface === 'terminal'
      ? <ui.Text color="cyan">{isNight(hour) ? '🌙' : '☀️'} {text} · {phrase(ms, lang)}</ui.Text>
      : <ui.Svg isInteractive height={90} source={(isNight(hour) ? nightSvg : daySvg)(text, phrase(ms, lang))} alt={`${text}, ${phrase(ms, lang)}`} />
    return <ui.Box flexDirection="column">{banner}{below}</ui.Box>
  })
}
