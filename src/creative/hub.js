import './creative.css'
import hobsLogo from '../assets/creative-primary-logo.svg'
import hobsLogoRaw from '../assets/creative-primary-logo.svg?raw'
import alsabrLogo from '../assets/alsabr-logo.svg'
import sheepRight from '../assets/creative-sheep-exact.svg'
import sheepLeft from '../assets/creative-sheep-reversed.svg'

const hobsProfileLogo = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(hobsLogoRaw.replace('.st0{fill:#FFFFFF;}', '.st0{fill:#f40009;}'))}`

export const PAGES = [
  { slug: '', label: 'House' },
  { slug: 'approach/', label: 'Profile' },
  { slug: 'services/', label: 'Pillars' },
  { slug: 'contact/', label: 'Start' },
]

const creativeBase = /^\/creative(?:\/|$)/.test(window.location.pathname) ? '/creative/' : '/'
export const creativePath = (slug = '') => `${creativeBase}${slug}`

export const SERVICES = [
  { title: 'Branding', copy: 'Names, marks, identities and rulebooks built with enough character to live everywhere.', tags: ['LOGO', 'IDENTITY', 'GUIDELINES'] },
  { title: 'Marketing', copy: 'Go-to-market strategy and always-on content designed to earn attention.', tags: ['STRATEGY', 'SOCIAL', 'CONTENT'] },
  { title: 'Campaigns', copy: 'Single-minded ideas taken from the first line to the final placement.', tags: ['CONCEPT', 'FILM', 'ROLLOUT'] },
  { title: 'Digital Products', copy: 'Websites, apps and interfaces designed, prototyped and shipped.', tags: ['WEB', 'UX / UI', 'BUILD'] },
  { title: 'AI Concepts', copy: 'Generative visuals, rapid prototypes and creative tools with an actual job to do.', tags: ['GENERATIVE', 'PROTOTYPE', 'R&D'] },
]

export const WORK = [
  { title: 'Flock Rebrand', tag: 'IDENTITY', copy: 'A complete identity for a challenger that refused to blend in.' },
  { title: 'Signal Launch', tag: 'CAMPAIGN', copy: 'A sharp launch system that turned a quiet product into a conversation.' },
  { title: 'Grid Commerce', tag: 'DIGITAL', copy: 'A storefront rebuilt around clarity, speed and clean conversion.' },
]

const railSheepEyes = `
  <g class="hobs-rail__eyes">
    <path fill="#fff" stroke="#000" stroke-miterlimit="10" d="M112.1 55.3c-.1-5.1 1.6-9.5 4.9-13.2 5.5-6.1 14.5-6.1 20-.1 7.3 8 6.5 22-1.6 28.3-6.6 5.1-15 3.8-19.8-3.1-2.4-3.5-3.5-7.2-3.5-11.9Z"/>
    <path fill="#151515" d="M137.7 54.4c0 3-2.1 5.5-4.5 5.4-2.3-.1-4.3-2.5-4.4-5.3 0-2.9 2.1-5.4 4.6-5.3 2.4 0 4.3 2.3 4.3 5.2Z"/>
    <path fill="#fff" stroke="#000" stroke-miterlimit="10" d="M175.2 55.7c-.2 5.6-1.9 10.6-6.2 14.2-5.6 4.8-12.1 4.7-17.7-.1-8.3-7-8-22.9.6-29.5 7.3-5.5 16.9-3 21.1 5.6 1.5 3.2 2.2 6.4 2.2 9.8Z"/>
    <path fill="#151515" d="M149.6 54.4c0-3 2-5.4 4.5-5.3 2.4 0 4.4 2.4 4.4 5.2 0 3-2.1 5.5-4.5 5.4-2.4 0-4.4-2.5-4.4-5.3Z"/>
  </g>`

const marqueeItems = ['BRANDING', 'MARKETING', 'CAMPAIGNS', 'DIGITAL PRODUCTS', 'AI CONCEPTS', 'BLACK SHEEP THINKING']
const marqueeSheepEyes = railSheepEyes.replace('hobs-rail__eyes', 'hobs-marquee__eyes')
const marqueeRun = marqueeItems.map((item) => `<span class="hobs-marquee__item">${item}</span><i class="hobs-marquee__separator"><svg viewBox="64 0 160 145" aria-hidden="true"><use class="hobs-marquee__body" href="${hobsLogo}#hobs-sheep-mark"></use>${marqueeSheepEyes}</svg></i>`).join('')

export const blackSheep = ({ count = 1, className = '', buttons = false, styles = [], classes = [] } = {}) =>
  Array.from({ length: count }, (_, i) => {
    const Tag = buttons ? 'button' : 'span'
    const attrs = buttons ? `type="button" aria-label="Black sheep ${i + 1}"` : 'aria-hidden="true"'
    const facingClass = i % 2 ? 'black-sheep--facing-left' : 'black-sheep--facing-right'
    return `<${Tag} class="black-sheep ${facingClass} ${className} ${classes[i] || ''}" data-sheep="${i}" ${attrs} style="--sheep:url(${i % 2 ? sheepLeft : sheepRight});--i:${i};${styles[i] || ''}"><span></span></${Tag}>`
  }).join('')

export function renderHouse({ current, content, showSlider = true, showMarquee = true, showCorporateHome = false, enableSwipe = true }) {
  const arrivalDirection = Number(window.sessionStorage.getItem('hobs-swipe-direction') || 0)
  window.sessionStorage.removeItem('hobs-swipe-direction')
  const arrivalClass = arrivalDirection > 0 ? 'is-arriving-up' : arrivalDirection < 0 ? 'is-arriving-down' : ''
  document.querySelector('#app').innerHTML = `
    <main class="hobs-page ${arrivalClass}" data-current="${current}">
      <div class="hobs-grain" aria-hidden="true"></div>
      <a class="hobs-logo" href="${creativePath()}" aria-label="HOBS Creative House home"><img src="${current ? hobsProfileLogo : hobsLogo}" alt="HOBS - House of Blacksheep"></a>
      ${showSlider ? `<nav class="hobs-rail" aria-label="Creative House pages">
        ${PAGES.map((page) => `<a class="hobs-rail__stop${page.slug === current ? ' is-current' : ''}" href="${creativePath(page.slug)}" aria-label="${page.label}" ${page.slug === current ? 'aria-current="page"' : ''}><span>${page.label}</span><i aria-hidden="true"><svg viewBox="64 0 160 145"><use href="${hobsLogo}#hobs-sheep-mark"></use>${railSheepEyes}</svg></i></a>`).join('')}
      </nav>` : ''}
      ${showCorporateHome ? `<a class="hobs-corporate-home" href="https://alsabrllc.com/" aria-label="Visit AL SABR LLC"><span class="hobs-corporate-home__house"><i class="hobs-corporate-home__mark"><img src="${alsabrLogo}" alt=""></i></span></a>` : ''}
      ${showMarquee ? `<div class="hobs-marquee" aria-hidden="true"><div class="hobs-marquee__track">${Array.from({ length: 4 }, () => `<span class="hobs-marquee__run">${marqueeRun}</span>`).join('')}</div></div>` : ''}
      ${content}
    </main>`

  window.setTimeout(() => {
    document.querySelector('.hobs-page')?.classList.remove('is-arriving-up', 'is-arriving-down')
  }, reduceMotion.matches ? 0 : 920)
  if (enableSwipe) wireSwipe(current)
}

export function wirePointerFlock(container, strength = 52) {
  const sheep = [...container.querySelectorAll('.black-sheep')]
  container.addEventListener('pointermove', (event) => {
    sheep.forEach((item) => {
      const rect = item.getBoundingClientRect()
      const dx = rect.left + rect.width / 2 - event.clientX
      const dy = rect.top + rect.height / 2 - event.clientY
      const distance = Math.hypot(dx, dy) || 1
      const pull = Math.max(0, 1 - distance / 190)
      item.style.setProperty('--px', `${(dx / distance) * strength * pull}px`)
      item.style.setProperty('--py', `${(dy / distance) * strength * pull}px`)
    })
  })
  container.addEventListener('pointerleave', () => sheep.forEach((item) => { item.style.setProperty('--px', '0px'); item.style.setProperty('--py', '0px') }))
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

function wireSwipe(current) {
  const page = document.querySelector('.hobs-page')
  const index = PAGES.findIndex((item) => item.slug === current)
  let wheel = 0
  let reset = 0
  let touchY = 0
  let touchTop = false
  let touchBottom = false
  let moving = false
  const atTop = () => window.scrollY <= 2
  const atBottom = () => window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
  const hasOpenMachine = () => Boolean(document.querySelector('.pillars-machine.has-selection'))
  const isEditableTarget = (target) => target instanceof Element && Boolean(target.closest('input, textarea, select, [contenteditable="true"]'))
  const canMove = (direction, targetIndex = index + direction) => {
    if (hasOpenMachine() || targetIndex < 0 || targetIndex >= PAGES.length || targetIndex === index) return false
    if (window.innerWidth <= 920 && document.documentElement.scrollHeight > window.innerHeight + 2) return direction > 0 ? atBottom() : atTop()
    return true
  }
  const move = (direction, targetIndex = index + direction) => {
    if (moving || !canMove(direction, targetIndex)) return
    moving = true
    const target = PAGES[targetIndex]
    window.sessionStorage.setItem('hobs-swipe-direction', String(direction))
    document.body.style.backgroundColor = target.slug ? '#f0eee9' : '#f40009'
    document.documentElement.style.backgroundColor = target.slug ? '#f0eee9' : '#f40009'
    page.classList.add(direction > 0 ? 'is-leaving-up' : 'is-leaving-down')
    window.setTimeout(() => { window.location.href = creativePath(target.slug) }, reduceMotion.matches ? 0 : 660)
  }

  page.querySelectorAll('.hobs-rail__stop').forEach((link, targetIndex) => {
    link.addEventListener('click', (event) => {
      event.preventDefault()
      if (targetIndex === index) return
      move(Math.sign(targetIndex - index), targetIndex)
    })
  })

  page.querySelector('.hobs-logo')?.addEventListener('click', (event) => {
    if (index <= 0) return
    event.preventDefault()
    move(-1, 0)
  })

  window.addEventListener('wheel', (event) => {
    if (isEditableTarget(event.target) || hasOpenMachine()) return
    const direction = Math.sign(event.deltaY)
    if (!direction || !canMove(direction)) return
    event.preventDefault()
    wheel += event.deltaY
    clearTimeout(reset)
    reset = setTimeout(() => { wheel = 0 }, 180)
    if (Math.abs(wheel) >= 64) { move(Math.sign(wheel)); wheel = 0 }
  }, { passive: false })
  window.addEventListener('touchstart', (event) => { touchY = event.touches[0]?.clientY || 0; touchTop = atTop(); touchBottom = atBottom() }, { passive: true })
  window.addEventListener('touchend', (event) => {
    const travel = (event.changedTouches[0]?.clientY || touchY) - touchY
    if (Math.abs(travel) < 58) return
    const direction = travel < 0 ? 1 : -1
    const scrolls = document.documentElement.scrollHeight > window.innerHeight + 2
    if (window.innerWidth <= 920 && scrolls && ((direction > 0 && !touchBottom) || (direction < 0 && !touchTop))) return
    move(direction)
  }, { passive: true })
  window.addEventListener('keydown', (event) => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey || isEditableTarget(event.target) || hasOpenMachine()) return
    if (event.key === 'PageDown') { event.preventDefault(); move(1) }
    if (event.key === 'PageUp') { event.preventDefault(); move(-1) }
  })
}
