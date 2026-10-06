import { blackSheep, renderHouse } from './hub.js'

const profile = [
  {
    label: 'WHO ARE WE?',
    short: 'WHO',
    copy: 'HOUSE OF BLACK SHEEP IS AN INDEPENDENT CREATIVE TERRITORY WHERE ORIGINAL THINKERS FIND ONE ANOTHER, COMBINE THEIR STRENGTHS AND BUILD WORK WITH THE POWER TO MATTER.',
  },
  {
    label: 'WHY DO WE EXIST?',
    short: 'WHY',
    copy: 'WE BELIEVE THE WORLD IS NOT SHORT OF CREATORS. IT IS SHORT OF PLATFORMS THAT RECOGNISE THEM AND OPPORTUNITIES THAT ALLOW THEIR STRONGEST IDEAS TO BECOME REAL.',
  },
  {
    label: 'WHAT ARE WE BUILDING?',
    short: 'WHAT',
    copy: 'WE UNITE INDEPENDENT CREATORS INTO A POWERFUL GLOBAL COMMUNITY, TURNING INDIVIDUAL TALENT INTO SHARED MOMENTUM, MEANINGFUL OPPORTUNITIES AND WORK THAT CAN REVOLUTIONISE THE WORLD.',
  },
  {
    label: 'HOW DO WE MAKE IT REAL?',
    short: 'HOW',
    copy: 'WE BRING INNOVATIVE IDEAS TO LIFE THROUGH PROJECTS IN BRANDING, MARKETING AND TECHNOLOGY, USING CREATIVITY TO IMPROVE CULTURE, BUSINESS AND EVERYDAY LIFE.',
  },
]

const gearTeeth = Array.from({ length: 8 }, (_, i) => `<rect x="44" y="4" width="12" height="25" rx="2" transform="rotate(${i * 45} 50 50)"/>`).join('')

renderHouse({
  current: 'approach/',
  content: `<section class="hobs-stage hobs-stage--profile">
    <div class="hobs-copy">
      <h1 class="hobs-title">INDEPENDENT<br>MINDS.<br><em>ONE TERRITORY.</em></h1>
      <p class="hobs-lede profile-intro">WE BRING CREATIVE MINDS AND TECHNOLOGY TOGETHER TO TURN NOISY IDEAS INTO MEANINGFUL EXPERIENCES, MAKING THE WORLD MORE EVOLVED, MORE IMAGINATIVE AND MORE BEAUTIFUL.</p>
    </div>
    <div class="profile-stack">
      <div class="profile-machine" data-profile role="group" aria-label="Interactive profile drop machine">
        <div class="profile-machine__sheep" data-sheep>${blackSheep({ count: 1 })}</div>
        ${Array.from({ length: 5 }, (_, level) => `<div class="profile-level" data-level="${level}" style="--level:${level}">
          <span class="profile-platform" aria-hidden="true"><i></i><i></i></span>
          ${level ? `<strong>${profile[level - 1].short}<span class="profile-question-mark">?</span></strong>` : ''}
        </div>`).join('')}
        <div class="profile-gears" role="group" aria-label="Forward and reverse gear assembly">
          <button class="profile-gear profile-gear--forward" type="button" data-gear aria-label="Move the profile gear forward">
            <svg viewBox="0 0 100 100" aria-hidden="true">${gearTeeth}<circle cx="50" cy="50" r="31"/><circle class="profile-gear__hole" cx="50" cy="50" r="13"/></svg>
          </button>
          <button class="profile-gear profile-gear--reverse" type="button" data-reverse-gear aria-label="Move the profile gear backward">
            <svg viewBox="0 0 100 100" aria-hidden="true">${gearTeeth}<circle cx="50" cy="50" r="31"/><circle class="profile-gear__hole" cx="50" cy="50" r="13"/></svg>
          </button>
        </div>
      </div>
      <div class="approach-readout profile-readout" aria-live="polite">
        <div><h2 data-title>OPERATE THE GEARS</h2><p data-copy>TURN THE LARGE GEAR TO MOVE FORWARD. TURN THE SMALL GEAR TO MOVE BACKWARD.</p></div>
      </div>
    </div>
  </section>`,
})

const machine = document.querySelector('[data-profile]')
const sheep = machine.querySelector('[data-sheep]')
const levels = [...machine.querySelectorAll('[data-level]')]
const gear = document.querySelector('[data-gear]')
const reverseGear = document.querySelector('[data-reverse-gear]')
const title = document.querySelector('[data-title]')
const copy = document.querySelector('[data-copy]')
let state = -1
let moving = false
let gearPosition = 0
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const motionDelay = (milliseconds) => reducedMotion ? 0 : milliseconds

function turnGears(direction) {
  gearPosition += direction
  gear.style.setProperty('--gear-turn', gearPosition)
  reverseGear.style.setProperty('--gear-turn', gearPosition)
}

function resetMachine() {
  state = -1
  sheep.style.setProperty('--sheep-level', 0)
  levels.forEach((level) => level.classList.remove('is-split', 'is-active'))
  title.textContent = 'OPERATE THE GEARS'
  copy.textContent = 'TURN THE LARGE GEAR TO MOVE FORWARD. TURN THE SMALL GEAR TO MOVE BACKWARD.'
  machine.classList.add('is-resetting')
  window.setTimeout(() => machine.classList.remove('is-resetting'), motionDelay(520))
}

gear.addEventListener('click', () => {
  if (moving) return
  moving = true
  turnGears(1)

  if (state === profile.length - 1) {
    window.setTimeout(resetMachine, motionDelay(300))
    window.setTimeout(() => { moving = false }, motionDelay(850))
    return
  }

  const currentLevel = state + 1
  const nextState = state + 1
  levels[currentLevel].classList.add('is-split')
  window.setTimeout(() => {
    state = nextState
    sheep.style.setProperty('--sheep-level', state + 1)
  }, motionDelay(230))
  window.setTimeout(() => {
    levels.forEach((level) => level.classList.remove('is-active'))
    levels[state + 1].classList.add('is-active')
    title.textContent = profile[state].label
    copy.textContent = profile[state].copy
  }, motionDelay(690))
  window.setTimeout(() => { moving = false }, motionDelay(900))
})

reverseGear.addEventListener('click', () => {
  if (moving || state < 0) return
  turnGears(-1)

  moving = true
  const currentState = state
  const previousState = state - 1
  levels.forEach((level) => level.classList.remove('is-active'))
  levels[currentState].classList.remove('is-split')

  window.setTimeout(() => {
    state = previousState
    sheep.style.setProperty('--sheep-level', state + 1)
  }, motionDelay(230))
  window.setTimeout(() => {
    if (state < 0) {
      title.textContent = 'OPERATE THE GEARS'
      copy.textContent = 'TURN THE LARGE GEAR TO MOVE FORWARD. TURN THE SMALL GEAR TO MOVE BACKWARD.'
    } else {
      levels[state + 1].classList.add('is-active')
      title.textContent = profile[state].label
      copy.textContent = profile[state].copy
    }
  }, motionDelay(690))
  window.setTimeout(() => { moving = false }, motionDelay(900))
})
