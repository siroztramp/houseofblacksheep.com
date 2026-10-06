import { blackSheep, renderHouse } from './hub.js'

const portfolioModules = import.meta.glob('../assets/portfolio/*.jpg', { eager: true, query: '?url', import: 'default' })
const portfolioAsset = (name) => portfolioModules[`../assets/portfolio/${name}`]
const project = (image, title, tag, note) => ({ image: portfolioAsset(image), title, tag, note })
const publicProof = (...works) => works
const privateProof = (route) => Array.from({ length: 3 }, (_, index) => ({
  image: '',
  title: 'PUBLIC CASE NOT ATTACHED',
  tag: `${route} / FILE ${String(index + 1).padStart(2, '0')}`,
  note: 'THE PROVIDED PORTFOLIOS DO NOT INCLUDE A PUBLIC CASE FOR THIS ROUTE.',
}))

const work = {
  heartfelt: project('heartfelt-identity.jpg', 'HEARTFELT', 'IDENTITY & RETAIL', 'A WARM IDENTITY BUILT TO LIVE ACROSS STORES, PACKAGING AND DELIVERY.'),
  akashIdentity: project('akash-identity.jpg', 'AKASH MOHAN', 'IDENTITY SYSTEM', 'A DISTINCTIVE BUSINESS IDENTITY EXTENDED THROUGH EVERYDAY BRAND MATERIALS.'),
  salwa: project('salwa-packaging.jpg', 'SALWA DATES', 'POSITIONING & PACKAGING', 'PREMIUM PRODUCT POSITIONING EXPRESSED THROUGH A RICH PACKAGING SYSTEM.'),
  knot: project('knotntot-packaging.jpg', 'KNOT N TOT', 'IDENTITY & PACKAGING', 'A PLAYFUL FAMILY SYSTEM BUILT AROUND PRODUCT, PACKAGING AND GROWTH.'),
  homegrown: project('homegrown-identity.jpg', 'HOMEGROWN', 'IDENTITY SYSTEM', 'A NATURAL CARE BRAND GIVEN A BOLD, OWNABLE VISUAL LANGUAGE.'),
  homegrownPack: project('homegrown-packaging.jpg', 'HOMEGROWN', 'PRODUCT PACKAGING', 'A MONOCHROMATIC PRODUCT WORLD THAT MAKES NATURAL CARE FEEL DISTINCT.'),
  trunosh: project('trunosh-identity.jpg', 'TRUNOSH', 'FOOD BRAND IDENTITY', 'A BRIGHT PRODUCT IDENTITY MADE TO TRAVEL ACROSS PACKAGING AND SPACE.'),
  trunoshSocial: project('trunosh-social.jpg', 'TRUNOSH', 'PRODUCT CAMPAIGN', 'A FLEXIBLE VISUAL SYSTEM FOR PRODUCT STORIES AND SOCIAL RELEASES.'),
  recpro: project('recpro-rebrand.jpg', 'RECPRO', 'REBRAND & ROLLOUT', 'A SHARPER SOUND AND LIGHTING BRAND CARRIED FROM MARK TO FLEET.'),
  printoneOutdoor: project('printone-outdoor.jpg', 'PRINTONE', 'REBRAND ROLLOUT', 'A CLEARER BRAND POSITION TAKEN INTO A LARGE SCALE OUTDOOR CAMPAIGN.'),
  printoneDigital: project('printone-digital.jpg', 'PRINTONE', 'DIGITAL CAMPAIGN', 'A CONSISTENT CAMPAIGN LANGUAGE FOR PEOPLE, PRODUCTS AND DIGITAL POSTS.'),
  esperaRollout: project('espera-rollout.jpg', 'ESPERA', 'BRAND ROLLOUT', 'AN INTERIOR BRAND SYSTEM EXTENDED ACROSS SPACE, MESSAGE AND EXPERIENCE.'),
  esperaDigital: project('espera-digital.jpg', 'ESPERA', 'MOBILE EXPERIENCE', 'A DIGITAL BRAND EXPERIENCE THAT CARRIES THE SAME MATERIAL CHARACTER.'),
  akashDigital: project('akash-digital.jpg', 'AKASH MOHAN', 'WEB EXPERIENCE', 'A BRANDED WEBSITE EXPERIENCE DESIGNED AROUND CLARITY AND CONFIDENCE.'),
  officeCircus: project('office-circus.jpg', 'OFFICE CIRCUS', 'CAMPAIGN FILM', 'A RELATABLE FILM CONCEPT THAT TURNS WORKPLACE FRUSTRATION INTO A WAY OUT.'),
  goPlay: project('go-play-nite.jpg', 'GO PLAY NITE', 'TRAVEL CAMPAIGN', 'A HUMOR LED FILM SERIES BUILT AROUND THE CONSEQUENCES OF POOR PLANNING.'),
  inticure: project('inticure-campaign.jpg', 'INTICURE', 'SOCIAL FILM SERIES', 'A SENSITIVE SUBJECT COMMUNICATED THROUGH FAMILIAR EVERYDAY MOMENTS.'),
  future: project('future-campaign.jpg', 'SUMMIT OF FUTURE', 'SOCIAL CAMPAIGN', 'SUSTAINABILITY ACTIONS TURNED INTO VIVID, MEMORABLE VISUAL STORIES.'),
  popos: project('popos-campaign.jpg', 'POPEES', 'PURPOSE CAMPAIGN', 'A GIRL CHILD DAY CAMPAIGN THAT CHALLENGES HOW STEREOTYPES BEGIN.'),
  uberBeu: project('uber-beu-campaign.jpg', 'BEU × UBER', 'SPEC CAMPAIGN', 'A PROVOCATIVE BRAND COLLABORATION CONCEPT BUILT AROUND MOVEMENT AND DESIRE.'),
  multiSocial: project('multi-brand-social.jpg', 'MULTI BRAND SOCIAL', 'CONTENT SYSTEMS', 'A RANGE OF PRODUCT AND SERVICE CAMPAIGNS SHAPED FOR SOCIAL MEDIA.'),
}

const pillars = [
  {
    key: 'brand',
    title: 'BRANDING',
    signal: 'IDENTITY BAY',
    line: 'WE DEFINE THE POSITION, IDENTITY AND ARCHITECTURE THAT MAKE A BRAND IMPOSSIBLE TO MISTAKE.',
    services: [
      ['BRAND STRATEGY & POSITIONING', 'WE FIND THE SHARPEST PLACE FOR A BRAND TO STAND AND THE CLEAREST REASON FOR PEOPLE TO CHOOSE IT.', publicProof(work.heartfelt, work.akashIdentity, work.salwa)],
      ['VISUAL IDENTITY SYSTEMS', 'WE BUILD A DISTINCTIVE VISUAL LANGUAGE THAT STAYS COHERENT WHEREVER THE BRAND MOVES.', publicProof(work.knot, work.homegrown, work.trunosh)],
      ['REBRANDING & REPOSITIONING', 'WE KEEP WHAT MATTERS, CHALLENGE WHAT DOES NOT AND MOVE THE BRAND INTO A STRONGER FUTURE.', publicProof(work.recpro, work.printoneOutdoor, work.homegrownPack)],
      ['LONG TERM BRAND ARCHITECTURE', 'WE ORGANISE PRODUCTS, STORIES AND EXPERIENCES INTO ONE SYSTEM BUILT TO GROW.', publicProof(work.esperaRollout, work.knot, work.salwa)],
    ],
  },
  {
    key: 'campaign',
    title: 'CAMPAIGN',
    signal: 'MOVEMENT BAY',
    line: 'WE TURN BRANDS INTO MOVEMENT THROUGH SHARP IDEAS AND END TO END CAMPAIGN EXECUTION.',
    services: [
      ['ONLINE & OFFLINE CAMPAIGN DESIGN', 'WE CREATE ONE CAMPAIGN IDEA POWERFUL ENOUGH TO MOVE THROUGH SCREENS, STREETS AND CULTURE.', publicProof(work.future, work.popos, work.printoneOutdoor)],
      ['END TO END EXECUTION', 'WE TAKE THE IDEA FROM ITS FIRST SKETCH TO ITS FINAL RELEASE WITHOUT LOSING ITS ENERGY.', publicProof(work.officeCircus, work.goPlay, work.inticure)],
      ['FOUNDER LED CREATIVE DIRECTION', 'SENIOR CREATIVE THINKING STAYS CLOSE TO THE WORK FROM THE FIRST QUESTION TO THE LAST DETAIL.', publicProof(work.uberBeu, work.trunoshSocial, work.multiSocial)],
      ['ZERO COMPROMISE QUALITY CONTROL', 'EVERY TOUCHPOINT IS TESTED, REFINED AND HELD TO THE SAME UNAPOLOGETIC STANDARD.', publicProof(work.printoneDigital, work.future, work.homegrown)],
    ],
  },
  {
    key: 'development',
    title: 'DEVELOPMENT',
    signal: 'BUILD BAY',
    defaultService: 3,
    line: 'WE BUILD THE AI TOOLS, SOFTWARE AND OPERATING SYSTEMS THAT GIVE IDEAS A WORKING BACKBONE.',
    services: [
      ['AI TOOLS & SOFTWARE PRODUCTS', 'WE TURN INTELLIGENT IDEAS INTO USEFUL PRODUCTS PEOPLE CAN ACTUALLY USE.', privateProof('AI PRODUCT')],
      ['ERP & CRM SYSTEMS', 'WE CONNECT PEOPLE, INFORMATION AND DECISIONS THROUGH SYSTEMS DESIGNED AROUND REAL WORK.', privateProof('ERP / CRM')],
      ['BUSINESS OPERATING SYSTEMS', 'WE BUILD THE DIGITAL BACKBONE THAT HELPS AN ORGANISATION THINK, MOVE AND SCALE.', privateProof('OPERATING SYSTEM')],
      ['DIGITAL TRANSITION STRATEGY', 'WE PLAN A PRACTICAL PATH FROM OLD LIMITATIONS TO A MORE EVOLVED WAY OF WORKING.', publicProof(work.akashDigital, work.esperaDigital, work.printoneDigital)],
    ],
  },
]

const initialServiceIndex = (pillar) => pillar.defaultService ?? 0
const proofCollection = (pillar, serviceIndex) => {
  const orderedServices = [
    pillar.services[serviceIndex],
    ...pillar.services.filter((_, index) => index !== serviceIndex),
  ]
  const seen = new Set()
  const works = []
  orderedServices.forEach((service) => service[2].forEach((item) => {
    const key = item.image || `${item.title}-${item.tag}`
    if (seen.has(key)) return
    seen.add(key)
    works.push(item)
  }))
  return works
}

const gearTeeth = Array.from({ length: 8 }, (_, index) => `<rect x="44" y="4" width="12" height="25" rx="2" transform="rotate(${index * 45} 50 50)"/>`).join('')
const closeGear = `<svg viewBox="0 0 100 100" aria-hidden="true">${gearTeeth}<circle cx="50" cy="50" r="31"/><circle class="service-close-gear__hole" cx="50" cy="50" r="13"/></svg>`

const supportingProofs = (collection, showcased) => {
  const used = new Set(showcased.map((item) => item.image).filter(Boolean))
  const pool = [...collection.slice(5), ...Object.values(work)]
  const seen = new Set()
  return pool.filter((item) => {
    if (!item.image || used.has(item.image) || seen.has(item.image)) return false
    seen.add(item.image)
    return true
  })
}

const evidenceCards = (works) => works.map((item, index) => `<article class="evidence-card${item.image ? ' has-project' : ' is-private'}" data-work-card style="--card:${index}" aria-label="${item.title}">
  <div class="evidence-card__image">
    <img data-project-image ${item.image ? `data-src="${item.image}"` : ''} alt="${item.image ? `${item.title} project` : ''}" loading="lazy" decoding="async">
    <span class="evidence-card__redacted">${blackSheep({ count: 1 })}<i></i></span>
  </div>
</article>`).join('')

const moreCard = (works) => `<button class="evidence-card evidence-card--more" type="button" data-more-card aria-label="Show the next project thumbnails">
  <span class="evidence-card__mosaic">${works.slice(0, 4).map((item) => `<img data-more-image data-src="${item.image}" alt="${item.title} project thumbnail" loading="lazy" decoding="async">`).join('')}</span>
  <strong>MORE WORK</strong>
</button>`

const runwayFlock = (pillar) => {
  const count = pillar.title.replace(/\s/g, '').length
  const styles = Array.from({ length: count }, (_, index) => `--flock-index:${index};`)
  return blackSheep({ count, styles })
}

const runwayTitle = (title) => `<strong aria-label="${title}">${[...title].map((letter, index) => `<span class="pillar-letter" data-letter="${index}">${letter}</span>`).join('')}</strong>`

const renderPanel = (pillar, pillarIndex) => {
  const serviceIndex = initialServiceIndex(pillar)
  const service = pillar.services[serviceIndex]
  const collection = proofCollection(pillar, serviceIndex)
  const works = collection.slice(0, 5)
  const supporting = supportingProofs(collection, works)
  return `<article class="pillar-panel pillar-panel--${pillar.key}" data-pillar="${pillarIndex}" style="--pillar:${pillarIndex}">
    <button class="pillar-trigger" type="button" data-open="${pillarIndex}" aria-expanded="false">
      ${runwayTitle(pillar.title)}
      <span class="pillar-slope-flock" aria-hidden="true">${runwayFlock(pillar)}</span>
    </button>
    <section class="service-bay__detail pillar-portfolio-detail" aria-hidden="true">
      <header>
        <div><h2>${pillar.title}</h2><p>${pillar.line}</p></div>
        <button class="service-close-gear" type="button" data-close aria-label="Return to all three pillars">${closeGear}</button>
      </header>
      <div class="service-bay__body">
        <nav class="service-indexer" aria-label="Browse ${pillar.title} services" style="--active-service:${serviceIndex}">
          <div class="service-indexer__track">
            ${pillar.services.map((item, index) => `<button class="service-dial${index === serviceIndex ? ' is-active' : ''}" type="button" data-service="${index}" aria-pressed="${index === serviceIndex}"><strong>${item[0]}</strong></button>`).join('')}
            <i class="service-indexer__carriage" aria-hidden="true">${blackSheep({ count: 1 })}</i>
          </div>
        </nav>
        <section class="service-evidence" aria-label="${pillar.title} proven work">
          <header><h3 data-work-title>${service[0]}</h3><p data-work-note>${service[1]}</p></header>
          <div class="service-evidence__cards">${evidenceCards(works)}${moreCard(supporting)}</div>
        </section>
      </div>
    </section>
  </article>`
}

renderHouse({
  current: 'services/',
  showMarquee: false,
  content: `<section class="hobs-stage hobs-stage--pillars">
    <header class="pillars-heading">
      <h1>BEAT GRAVITY. <em>EXIT THE LOOP.</em></h1>
      <p>WHEN YOUR BRIEF KEEPS RETURNING TO THE SAME SAFE ANSWERS, PROGRESS LOSES GROUND. WE CREATE AN ORIGINAL SOLUTION AROUND YOUR EXACT REQUIREMENT AND BUILD IT ALL THE WAY INTO REALITY.</p>
    </header>
    <div class="pillars-machine" data-pillars>${pillars.map(renderPanel).join('')}</div>
  </section>`,
})

const machine = document.querySelector('[data-pillars]')
const panels = [...machine.querySelectorAll('[data-pillar]')]

function wireSlopeFlocks() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const states = panels.map((panel) => {
    const sheep = [...panel.querySelectorAll('.pillar-slope-flock .black-sheep')]
    const title = panel.querySelector('.pillar-trigger > strong')
    const letters = [...title.querySelectorAll('.pillar-letter')].filter((letter) => letter.textContent.trim())
    const flock = panel.querySelector('.pillar-slope-flock')
    const homeRange = panel.classList.contains('pillar-panel--brand')
      ? [.31, .55]
      : panel.classList.contains('pillar-panel--campaign')
        ? [.62, .88]
        : [.1, .4]
    const state = {
      panel,
      sheep,
      title,
      letters,
      flock,
      homeRange,
      homePositions: [],
      direction: panel.classList.contains('pillar-panel--campaign') ? 1 : -1,
      positions: [],
      velocities: [],
      targets: [],
      grounded: reducedMotion,
      width: 0,
      sheepWidth: 0,
      dirty: true,
      settleTimer: 0,
    }

    const setGrounded = (grounded) => {
      state.grounded = grounded || reducedMotion
      panel.classList.toggle('is-grounded', state.grounded)
      state.dirty = true
      window.clearTimeout(state.settleTimer)
      if (state.grounded && !reducedMotion) {
        // The runway needs to finish straightening before its letter centres are measured.
        state.settleTimer = window.setTimeout(() => { state.dirty = true }, 280)
      }
    }

    panel.addEventListener('pointerenter', () => setGrounded(true))
    panel.addEventListener('pointerleave', () => {
      if (!panel.contains(document.activeElement)) setGrounded(false)
    })
    panel.addEventListener('focusin', () => setGrounded(true))
    panel.addEventListener('focusout', () => window.setTimeout(() => {
      if (!panel.contains(document.activeElement) && !panel.matches(':hover')) setGrounded(false)
    }, 0))
    setGrounded(state.grounded)
    return state
  })

  const measure = (state) => {
    const width = state.panel.clientWidth
    if (!width) return
    const previousWidth = state.width
    const sheepWidth = state.sheep[0]?.offsetWidth || 0
    const [rangeStart, rangeEnd] = state.homeRange
    const margin = sheepWidth / 2 + 8
    const desiredSpan = Math.max(width * (rangeEnd - rangeStart), Math.max(0, state.sheep.length - 1) * sheepWidth * 1.12)
    const span = Math.min(Math.max(0, width - margin * 2), desiredSpan)
    const centre = width * ((rangeStart + rangeEnd) / 2)
    const start = Math.max(margin, Math.min(width - margin - span, centre - span / 2))
    const divisions = Math.max(1, state.sheep.length - 1)

    state.width = width
    state.sheepWidth = sheepWidth
    state.homePositions = state.sheep.map((_, index) => start + (span * index) / divisions)
    const flockRect = state.flock.getBoundingClientRect()
    state.targets = state.letters.map((letter) => {
      const rect = letter.getBoundingClientRect()
      return rect.left + rect.width / 2 - flockRect.left
    })
    if (!state.positions.length) state.positions = [...state.homePositions]
    else if (previousWidth && Math.abs(previousWidth - width) > 1) state.positions = state.positions.map((position) => position * (width / previousWidth))
    state.velocities = state.sheep.map((_, index) => state.velocities[index] || 7.2 + (index % 3) * .55)
    state.dirty = false
  }

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver((entries) => entries.forEach((entry) => {
      const state = states.find((item) => item.panel === entry.target)
      if (state) state.dirty = true
    }))
    states.forEach((state) => observer.observe(state.panel))
  } else {
    window.addEventListener('resize', () => states.forEach((state) => { state.dirty = true }))
  }

  let previous = performance.now()
  const frame = (now) => {
    const elapsed = Math.min((now - previous) / 1000, .05)
    previous = now

    const restoring = machine.classList.contains('is-restoring')
    if (!document.hidden && (!machine.classList.contains('has-selection') || restoring)) {
      states.forEach((state) => {
        if (state.dirty || !state.width) measure(state)
        const margin = state.sheepWidth / 2 + 8

        state.sheep.forEach((item, index) => {
          if (restoring) {
            state.positions[index] = state.homePositions[index]
            state.velocities[index] = 7.2 + (index % 3) * .55
          } else if (state.grounded) {
            const target = state.targets[index] ?? state.width / 2
            const easing = reducedMotion ? 1 : 1 - Math.exp(-14 * elapsed)
            state.positions[index] += (target - state.positions[index]) * easing
            if (Math.abs(target - state.positions[index]) < .35) state.positions[index] = target
            state.velocities[index] = 0
          } else {
            state.velocities[index] = Math.min(38, Math.max(7.2, state.velocities[index]) + 4.8 * elapsed)
            state.positions[index] += state.direction * state.velocities[index] * elapsed
            if (state.direction < 0 && state.positions[index] < -margin) {
              state.positions[index] = state.width + margin
              state.velocities[index] = 7.2
            }
            if (state.direction > 0 && state.positions[index] > state.width + margin) {
              state.positions[index] = -margin
              state.velocities[index] = 7.2
            }
          }
          item.style.setProperty('--sheep-x', `${state.positions[index]}px`)
        })
      })
    }
    if (reducedMotion) return
    window.requestAnimationFrame(frame)
  }
  window.requestAnimationFrame(frame)

  document.fonts?.ready.then(() => states.forEach((state) => { state.dirty = true }))
}

wireSlopeFlocks()

let openTimer
let closeTimer

function loadPanelImages(panel) {
  panel.querySelectorAll('img[data-src]').forEach((image) => {
    image.src = image.dataset.src
    image.removeAttribute('data-src')
  })
}

function openPillar(index) {
  if (machine.classList.contains('has-selection') || machine.classList.contains('is-restoring')) return
  window.clearTimeout(openTimer)
  window.clearTimeout(closeTimer)
  machine.classList.add('has-selection')
  const departing = panels.filter((_, panelIndex) => panelIndex !== index)
  const selectedPanel = panels[index]
  loadPanelImages(selectedPanel)
  panels.forEach((panel, panelIndex) => {
    const selected = panelIndex === index
    const departureIndex = departing.indexOf(panel)
    panel.classList.toggle('is-selected', selected)
    panel.classList.toggle('is-away', !selected)
    panel.classList.toggle('is-away-left', !selected && departureIndex === 0)
    panel.classList.toggle('is-away-right', !selected && departureIndex === 1)
    panel.inert = !selected
    panel.querySelector('[data-open]').setAttribute('aria-expanded', 'false')
    panel.querySelector('.pillar-portfolio-detail').setAttribute('aria-hidden', 'true')
  })

  const reveal = () => {
    selectedPanel.classList.add('is-open')
    selectedPanel.querySelector('[data-open]').setAttribute('aria-expanded', 'true')
    selectedPanel.querySelector('.pillar-portfolio-detail').setAttribute('aria-hidden', 'false')
    selectedPanel.querySelector('[data-close]').focus({ preventScroll: true })
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) reveal()
  else openTimer = window.setTimeout(reveal, 260)
}

function resetPillars(focusPanel) {
  window.clearTimeout(closeTimer)
  window.clearTimeout(openTimer)
  machine.classList.remove('has-selection', 'is-restoring')
  panels.forEach((panel) => {
    panel.classList.remove('is-open', 'is-closing', 'is-away', 'is-away-left', 'is-away-right', 'is-selected', 'is-homecoming', 'is-rail-return')
    panel.inert = false
    panel.querySelector('[data-open]').setAttribute('aria-expanded', 'false')
    panel.querySelector('.pillar-portfolio-detail').setAttribute('aria-hidden', 'true')
    panel.querySelector('[data-close]').disabled = false
  })
  focusPanel?.querySelector('[data-open]').focus({ preventScroll: true })
}

function restorePillars(activePanel) {
  activePanel.classList.remove('is-open', 'is-closing')
  activePanel.querySelector('.pillar-portfolio-detail').setAttribute('aria-hidden', 'true')
  machine.classList.add('is-restoring')

  const returningPanels = [
    ...panels.filter((panel) => panel.classList.contains('is-away-left')),
    ...panels.filter((panel) => panel.classList.contains('is-away-right')),
  ]

  const finishRestore = () => {
    machine.classList.remove('has-selection', 'is-restoring')
    panels.forEach((panel) => {
      panel.classList.remove('is-away', 'is-away-left', 'is-away-right', 'is-selected', 'is-homecoming', 'is-rail-return')
      panel.inert = false
      panel.querySelector('[data-open]').setAttribute('aria-expanded', 'false')
      panel.querySelector('[data-close]').disabled = false
    })
    activePanel.querySelector('[data-open]').focus({ preventScroll: true })
  }

  const returnNextPanel = (index) => {
    const panel = returningPanels[index]
    if (!panel) {
      closeTimer = window.setTimeout(finishRestore, 360)
      return
    }

    panel.classList.remove('is-away', 'is-away-left', 'is-away-right')
    panel.classList.add('is-homecoming')
    closeTimer = window.setTimeout(() => {
      panel.classList.remove('is-homecoming')
      returnNextPanel(index + 1)
    }, 640)
  }

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      activePanel.classList.remove('is-selected')
      activePanel.classList.add('is-rail-return')
      activePanel.querySelector('[data-open]').setAttribute('aria-expanded', 'false')
      closeTimer = window.setTimeout(() => {
        activePanel.classList.remove('is-rail-return')
        returnNextPanel(0)
      }, 680)
    })
  })
}

function closePillars(event) {
  window.clearTimeout(openTimer)
  const activePanel = event.currentTarget.closest('[data-pillar]')
  if (!activePanel?.classList.contains('is-open') || activePanel.classList.contains('is-closing')) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    resetPillars(activePanel)
    return
  }

  activePanel.classList.add('is-closing')
  event.currentTarget.blur()
  event.currentTarget.disabled = true
  closeTimer = window.setTimeout(() => restorePillars(activePanel), 920)
}

panels.forEach((panel, pillarIndex) => {
  panel.querySelector('[data-open]').addEventListener('click', () => openPillar(pillarIndex))
  panel.querySelector('[data-close]').addEventListener('click', closePillars)
  const dials = [...panel.querySelectorAll('[data-service]')]
  const indexer = panel.querySelector('.service-indexer')
  const track = panel.querySelector('.service-indexer__track')
  const carriage = panel.querySelector('.service-indexer__carriage')
  const title = panel.querySelector('[data-work-title]')
  const note = panel.querySelector('[data-work-note]')
  const cards = [...panel.querySelectorAll('[data-work-card]')]
  const moreCardControl = panel.querySelector('[data-more-card]')
  const moreImages = [...panel.querySelectorAll('[data-more-image]')]
  const initialCollection = proofCollection(pillars[pillarIndex], initialServiceIndex(pillars[pillarIndex]))
  let currentSupporting = supportingProofs(initialCollection, initialCollection.slice(0, 5))
  let moreOffset = 0
  let currentService = initialServiceIndex(pillars[pillarIndex])
  let carriageTimer

  const alignCarriage = () => {
    const activeDial = dials[currentService]
    if (!activeDial || !track || !carriage) return
    const trackBounds = track.getBoundingClientRect()
    const dialBounds = activeDial.getBoundingClientRect()
    if (!trackBounds.width || !dialBounds.width) return
    const leftInset = Math.min(26, Math.max(20, dialBounds.width * .16))
    indexer.style.setProperty('--carriage-x', `${dialBounds.left - trackBounds.left + leftInset}px`)
    indexer.style.setProperty('--carriage-y', `${dialBounds.top + dialBounds.height / 2 - trackBounds.top}px`)
  }

  const carriageObserver = 'ResizeObserver' in window ? new ResizeObserver(alignCarriage) : null
  carriageObserver?.observe(track)

  const renderMoreImages = (advance = false) => {
    if (!currentSupporting.length) {
      moreCardControl.hidden = true
      return
    }
    moreCardControl.hidden = false
    if (advance) moreOffset = (moreOffset + moreImages.length) % currentSupporting.length
    moreImages.forEach((image, index) => {
      const item = currentSupporting[(moreOffset + index) % currentSupporting.length]
      if (!item) {
        image.removeAttribute('src')
        image.alt = ''
        return
      }
      image.src = item.image
      image.alt = `${item.title} project thumbnail`
    })
    if (advance) {
      moreCardControl.classList.remove('is-switching')
      void moreCardControl.offsetWidth
      moreCardControl.classList.add('is-switching')
    }
  }

  const selectService = (serviceIndex) => {
    const [selected, selectedNote] = pillars[pillarIndex].services[serviceIndex]
    const collection = proofCollection(pillars[pillarIndex], serviceIndex)
    const works = collection.slice(0, 5)
    const supporting = supportingProofs(collection, works)
    currentService = serviceIndex
    indexer.style.setProperty('--active-service', serviceIndex)
    dials.forEach((item, index) => {
      const active = index === serviceIndex
      item.classList.toggle('is-active', active)
      item.setAttribute('aria-pressed', String(active))
    })
    title.textContent = selected
    note.textContent = selectedNote
    cards.forEach((card, index) => {
      const item = works[index]
      const image = card.querySelector('[data-project-image]')
      card.classList.toggle('has-project', Boolean(item.image))
      card.classList.toggle('is-private', !item.image)
      card.setAttribute('aria-label', item.title)
      if (item.image) image.src = item.image
      else image.removeAttribute('src')
      image.alt = item.image ? `${item.title} project` : ''
    })
    currentSupporting = supporting
    moreOffset = 0
    renderMoreImages()
    panel.classList.remove('is-switching')
    void panel.offsetWidth
    panel.classList.add('is-switching')
    window.requestAnimationFrame(alignCarriage)
    window.clearTimeout(carriageTimer)
    carriageTimer = window.setTimeout(alignCarriage, 220)
  }

  dials.forEach((dial, serviceIndex) => dial.addEventListener('click', () => selectService(serviceIndex)))
  moreCardControl.addEventListener('click', () => renderMoreImages(true))
  window.requestAnimationFrame(alignCarriage)
})
