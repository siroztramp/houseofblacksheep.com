import { blackSheep, renderHouse } from './hub.js'

const CHANNELS = [
  {
    key: 'mail',
    label: 'MAIL',
    code: 'DIRECT LINE',
    frequency: '01 / INBOX',
    x: '-37%',
    y: '-33%',
    href: 'mailto:alsabrgtllc@gmail.com?subject=Project%20enquiry%20-%20HOBS',
    action: 'WRITE TO THE HOUSE',
    copy: 'SEND THE BRIEF, THE QUESTION OR THE HALF FORMED THOUGHT STRAIGHT INTO THE HOUSE.',
  },
  {
    key: 'instagram',
    label: 'INSTAGRAM',
    code: 'VISUAL LINE',
    frequency: '02 / SOCIAL',
    x: '0%',
    y: '-35%',
    href: 'https://www.instagram.com/houseofblacksheep/',
    action: 'OPEN INSTAGRAM',
    copy: 'FOLLOW THE VISUAL TRAIL, DAILY EXPERIMENTS AND THE WORK TAKING SHAPE INSIDE THE HOUSE.',
  },
  {
    key: 'linkedin',
    label: 'LINKEDIN',
    code: 'BUSINESS LINE',
    frequency: '03 / NETWORK',
    x: '37%',
    y: '-16%',
    href: 'https://www.linkedin.com/company/houseofblacksheep/',
    action: 'OPEN LINKEDIN',
    copy: 'CONNECT WITH THE PEOPLE, PARTNERSHIPS AND PROFESSIONAL MOVEMENT BEHIND THE HOUSE.',
  },
  {
    key: 'behance',
    label: 'BEHANCE',
    code: 'WORK LINE',
    frequency: '04 / PORTFOLIO',
    x: '37%',
    y: '40%',
    href: 'https://www.behance.net/houseofblacksheep',
    action: 'OPEN BEHANCE',
    copy: 'ENTER THE LONG FORM ARCHIVE FOR PROJECT STORIES, SYSTEMS AND PROVEN CREATIVE WORK.',
  },
  {
    key: 'youtube',
    label: 'YOUTUBE',
    code: 'MOTION LINE',
    frequency: '05 / BROADCAST',
    x: '0%',
    y: '45%',
    href: 'https://www.youtube.com/@houseofblacksheep',
    action: 'OPEN YOUTUBE',
    copy: 'WATCH IDEAS MOVE THROUGH FILM, PROCESS, CAMPAIGNS AND STORIES FROM THE HOUSE.',
  },
  {
    key: 'facebook',
    label: 'FACEBOOK',
    code: 'COMMUNITY LINE',
    frequency: '06 / SOCIAL',
    x: '-37%',
    y: '40%',
    href: 'https://www.facebook.com/houseofblacksheep/',
    action: 'OPEN FACEBOOK',
    copy: 'KEEP A LINE OPEN FOR RELEASES, CONVERSATIONS AND NEWS FROM THE WIDER HOUSE.',
  },
]

const channelLinks = CHANNELS.map((channel, index) => `
  <a class="connection-port connection-port--${channel.key}" data-channel="${index}" href="${channel.href}" target="_blank" rel="noreferrer" aria-label="Open ${channel.label} in a new tab">
    <i aria-hidden="true"></i>
    <strong>${channel.label}</strong>
    <small>${channel.code}</small>
  </a>`).join('')

const signalLines = CHANNELS.map((channel, index) => {
  const paths = [
    'M50 45 H34 V12 H14',
    'M50 45 V9',
    'M50 45 H68 V25 H86',
    'M50 45 H68 V85 H86',
    'M50 45 V91',
    'M50 45 H32 V85 H14',
  ]
  return `<path class="connection-wire" data-wire="${index}" d="${paths[index]}" pathLength="100"></path>`
}).join('')

renderHouse({
  current: 'contact/',
  content: `<section class="hobs-stage hobs-stage--connection">
    <div class="connection-copy">
      <p class="hobs-kicker">House connection exchange</p>
      <h1 class="hobs-title">FIND US.<br><em>OR BE FOUND.</em></h1>
      <p class="hobs-lede">Choose a live channel to reach us now, or leave your coordinates and let the right black sheep come back to you.</p>

      <form class="callback-ticket callback-ticket--expanded" data-callback-form>
        <div class="callback-ticket__heading"><span>LEAVE YOUR COORDINATES</span><b>HOUSE WILL RETURN THE SIGNAL</b></div>
        <p class="callback-ticket__intro">GIVE US THE FIRST LINE. WE WILL OPEN A READY-TO-SEND EMAIL DRAFT FOR YOU.<span class="callback-ticket__fallback" data-form-status aria-live="polite">NO EMAIL APP? WRITE DIRECTLY TO <a href="mailto:alsabrgtllc@gmail.com">ALSABRGTLLC@GMAIL.COM</a></span></p>
        <div class="callback-ticket__fields">
          <label><span>YOUR NAME</span><input name="name" autocomplete="name" maxlength="120" placeholder="NAME / COMPANY" required></label>
          <label><span>REPLY TO</span><input name="reply" autocomplete="email" maxlength="160" placeholder="EMAIL / HANDLE" required></label>
          <label class="callback-ticket__phone"><span>PHONE NUMBER / OPTIONAL</span><input name="phone" type="tel" autocomplete="tel" maxlength="40" placeholder="+971 00 000 0000"></label>
          <label class="callback-ticket__brief"><span>THE FIRST LINE</span><textarea name="brief" maxlength="2000" placeholder="WHAT SHOULD WE START?" required></textarea></label>
          <button type="submit"><i aria-hidden="true"></i>OPEN EMAIL DRAFT</button>
        </div>
      </form>
    </div>

    <section class="connection-board" data-machine style="--runner-x:0%;--runner-y:0%">
      <header><span>BLACK SHEEP SIGNAL YARD</span><b data-status aria-live="polite">SHEEP AT HOUSE RELAY</b></header>
      <div class="connection-board__field">
        <svg class="connection-wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${signalLines}</svg>
        ${channelLinks}
        <button class="connection-relay" type="button" data-return aria-label="Return the signal sheep to the house relay">
          <span class="connection-relay__ring" aria-hidden="true"></span>
          <span class="connection-relay__sockets" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
        </button>
        <div class="connection-runner" aria-hidden="true">${blackSheep({ count: 1 })}</div>
      </div>
      <footer class="connection-route-card">
        <div><span data-frequency>NO ROUTE OPEN</span><strong data-route-title>CHOOSE A GATE</strong></div>
        <p data-board-message>HOVER A LINE TO TRACE IT. CLICK A GATE TO OPEN ITS CHANNEL IN A NEW TAB.</p>
      </footer>
    </section>
  </section>`,
})

const machine = document.querySelector('[data-machine]')
const ports = [...document.querySelectorAll('[data-channel]')]
const wires = [...document.querySelectorAll('[data-wire]')]
const returnControl = document.querySelector('[data-return]')
const status = document.querySelector('[data-status]')
const message = document.querySelector('[data-board-message]')
const frequency = document.querySelector('[data-frequency]')
const routeTitle = document.querySelector('[data-route-title]')
const callbackForm = document.querySelector('[data-callback-form]')
const callbackStatus = document.querySelector('[data-form-status]')
const connectionCopy = callbackForm.closest('.connection-copy')
let activeChannel = -1
let pendingChannel = -1
let routeTimer
let alignmentFrame

function alignCallbackTicket() {
  window.cancelAnimationFrame(alignmentFrame)
  alignmentFrame = window.requestAnimationFrame(() => {
    if (!window.matchMedia('(min-width: 921px)').matches) {
      connectionCopy.style.removeProperty('--callback-grow')
      return
    }

    const currentGrowth = Number.parseFloat(getComputedStyle(connectionCopy).getPropertyValue('--callback-grow')) || 0
    const targetBottom = machine.getBoundingClientRect().bottom
    const ticketBottom = callbackForm.getBoundingClientRect().bottom
    const baseDelta = targetBottom - ticketBottom + currentGrowth * 1.5
    const growth = Math.max(0, baseDelta / 1.5)
    connectionCopy.style.setProperty('--callback-grow', `${growth}px`)
    alignmentFrame = window.requestAnimationFrame(() => {
      const correction = machine.getBoundingClientRect().bottom - callbackForm.getBoundingClientRect().bottom
      if (Math.abs(correction) > 1) connectionCopy.style.setProperty('--callback-grow', `${Math.max(0, growth + correction / 1.5)}px`)
    })
  })
}

window.addEventListener('resize', alignCallbackTicket)
window.addEventListener('load', alignCallbackTicket, { once: true })
document.fonts?.ready.then(alignCallbackTicket)
alignCallbackTicket()

function moveSheep(x = '0%', y = '0%') {
  machine.style.setProperty('--runner-x', x)
  machine.style.setProperty('--runner-y', y)
}

function lockChannel(index) {
  const channel = CHANNELS[index]
  if (!channel) return
  activeChannel = index
  pendingChannel = -1
  moveSheep(channel.x, channel.y)
  machine.classList.remove('is-routing')
  machine.removeAttribute('aria-busy')
  machine.classList.add('has-route')
  ports.forEach((port, portIndex) => {
    const selected = portIndex === index
    port.classList.toggle('is-active', selected)
  })
  wires.forEach((wire, wireIndex) => wire.classList.toggle('is-active', wireIndex === index))
  status.textContent = `${channel.label} GATE OPEN`
  frequency.textContent = channel.frequency
  routeTitle.textContent = channel.label
  message.textContent = channel.copy
}

function routeChannel(index) {
  const channel = CHANNELS[index]
  if (!channel) return
  window.clearTimeout(routeTimer)
  const hadRoute = activeChannel >= 0
  pendingChannel = index
  machine.classList.remove('has-route')
  machine.classList.add('is-routing')
  machine.setAttribute('aria-busy', 'true')
  ports.forEach((port) => {
    port.classList.remove('is-active')
  })
  wires.forEach((wire) => wire.classList.remove('is-active'))
  status.textContent = hadRoute ? 'SHEEP RETURNING TO THE HOUSE' : 'HOUSE GATE OPENING'
  if (hadRoute) moveSheep()
  else moveSheep(channel.x, channel.y)
  routeTimer = window.setTimeout(() => lockChannel(index), hadRoute ? 780 : 170)
}

function returnToHouse() {
  window.clearTimeout(routeTimer)
  activeChannel = -1
  pendingChannel = -1
  machine.classList.remove('has-route', 'is-routing')
  machine.classList.remove('is-signaling')
  machine.removeAttribute('aria-busy')
  machine.classList.add('is-returning')
  moveSheep()
  ports.forEach((port) => {
    port.classList.remove('is-active')
  })
  wires.forEach((wire) => wire.classList.remove('is-active', 'is-preview'))
  status.textContent = 'SHEEP RETURNING TO THE HOUSE'
  frequency.textContent = 'NO ROUTE OPEN'
  routeTitle.textContent = 'CHOOSE A GATE'
  message.textContent = 'HOVER A LINE TO TRACE IT. CLICK A GATE TO OPEN ITS CHANNEL IN A NEW TAB.'
  routeTimer = window.setTimeout(() => {
    machine.classList.remove('is-returning')
    status.textContent = 'SHEEP AT HOUSE RELAY'
  }, 780)
}

ports.forEach((port, index) => {
  const restoreStatus = () => {
    wires[index].classList.remove('is-preview')
    if (!port.matches(':hover') && document.activeElement !== port) machine.classList.remove('is-signaling')
    if (pendingChannel >= 0) status.textContent = activeChannel >= 0 ? 'SHEEP RETURNING TO THE HOUSE' : 'HOUSE GATE OPENING'
    else {
      const active = CHANNELS[activeChannel]
      status.textContent = active ? `${active.label} GATE OPEN` : 'SHEEP AT HOUSE RELAY'
      if (active) moveSheep(active.x, active.y)
      else moveSheep()
    }
  }
  port.addEventListener('pointerenter', () => {
    machine.classList.add('is-signaling')
    moveSheep(CHANNELS[index].x, CHANNELS[index].y)
    if (activeChannel !== index) wires[index].classList.add('is-preview')
    status.textContent = `${CHANNELS[index].label} GATE FOUND`
  })
  port.addEventListener('focus', () => {
    machine.classList.add('is-signaling')
    moveSheep(CHANNELS[index].x, CHANNELS[index].y)
    if (activeChannel !== index) wires[index].classList.add('is-preview')
    status.textContent = `${CHANNELS[index].label} GATE FOUND`
  })
  port.addEventListener('pointerleave', restoreStatus)
  port.addEventListener('blur', restoreStatus)
  port.addEventListener('click', () => routeChannel(index))
})

returnControl.addEventListener('click', returnToHouse)

callbackForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const values = new FormData(callbackForm)
  const name = String(values.get('name') || '').trim()
  const reply = String(values.get('reply') || '').trim()
  const phone = String(values.get('phone') || '').trim() || 'NOT PROVIDED'
  const brief = String(values.get('brief') || '').trim()
  const requiredValues = [
    [callbackForm.querySelector('[name="name"]'), name],
    [callbackForm.querySelector('[name="reply"]'), reply],
    [callbackForm.querySelector('[name="brief"]'), brief],
  ]
  const missing = requiredValues.find(([, value]) => !value)?.[0]
  if (missing) {
    missing.setCustomValidity('Please complete this field.')
    missing.reportValidity()
    missing.addEventListener('input', () => missing.setCustomValidity(''), { once: true })
    callbackStatus.textContent = 'ADD YOUR NAME, REPLY DETAILS AND FIRST LINE BEFORE OPENING THE DRAFT.'
    return
  }
  const subject = encodeURIComponent(`CALLBACK SIGNAL FROM ${name}`)
  const body = encodeURIComponent(`NAME / COMPANY: ${name}\nREPLY TO: ${reply}\nPHONE: ${phone}\nFIRST LINE: ${brief}\n\nROUTED THROUGH THE HOBS CONNECTION EXCHANGE.`)
  callbackStatus.textContent = 'OPENING YOUR EMAIL APP. REVIEW THE DRAFT AND PRESS SEND TO COMPLETE THE ENQUIRY.'
  window.location.href = `mailto:alsabrgtllc@gmail.com?subject=${subject}&body=${body}`
})
