import { blackSheep, creativePath, renderHouse, wirePointerFlock } from './hub.js'
import hobsBackground from '../assets/hobs-bg.svg'

const heroFlock = [
  [2, 8, 3.1, 0], [7, 1, 2.8, 0], [12, 10, 3.4, 0], [4, 4, 3.2, 0], [4, 15, 2.9, 0], [13, 16, 3.1, 0], [23, 12, 2.8, 0],
  [72, 8, 3.1, 1], [78, 1, 2.8, 1], [84, 10, 3.4, 1], [90, 4, 3.2, 1], [75, 15, 2.9, 1], [86, 16, 3.1, 1], [95, 12, 2.8, 1],
  [3, 82, 3.1, 2], [9, 88, 2.8, 2], [15, 83, 3.4, 2], [4, 90, 3.2, 2], [6, 91, 2.9, 2], [17, 92, 3.1, 2], [25, 87, 2.8, 2],
  [72, 82, 3.1, 3], [78, 88, 2.8, 3], [84, 83, 3.4, 3], [90, 90, 3.2, 3], [75, 91, 2.9, 3], [86, 92, 3.1, 3], [95, 87, 2.8, 3],
]

const blackSheepInEachGroup = new Set([3, 10, 17, 24])
const heroFlockStyles = heroFlock.map(([x, y, size, group], i) => {
  const cornerX = group % 2 === 0 ? -1 : 1
  const cornerY = group < 2 ? -1 : 1
  return [
    `--x:${x}%`,
    `--y:${y}%`,
    `--hero-size:${size}rem`,
    `--group:${group}`,
    `--idle-delay:${i * -0.19}s`,
    `--corner-drift-x:${cornerX * 10}px`,
    `--corner-drift-y:${cornerY * 7}px`,
    `--corner-entry-x:${cornerX * 30}px`,
    `--corner-entry-y:${cornerY * 20}px`,
    `--door-drift-x:${cornerX * -8}px`,
    `--door-drift-y:${cornerY * -6}px`,
    `--black-curious-x:${cornerX * -18}px`,
    `--black-curious-y:${cornerY * -12}px`,
  ].join(';')
})
const heroFlockClasses = heroFlock.map(([, , , group], i) => {
  const groupClass = `black-sheep--flock-${group}`
  if (blackSheepInEachGroup.has(i)) return `black-sheep--chosen black-sheep--focus-black ${groupClass}`
  return `black-sheep--white black-sheep--focus-flock ${groupClass}`
})

renderHouse({
  current: '',
  showSlider: false,
  showCorporateHome: true,
  enableSwipe: false,
  content: `<section class="hobs-stage hobs-stage--hero">
    <div class="hero-flock" data-flock>${blackSheep({ count: heroFlock.length, styles: heroFlockStyles, classes: heroFlockClasses })}</div>
    <div class="hobs-copy hobs-copy--center">
      <h1 class="hobs-title"><em>CREATIVE HOUSE</em></h1>
      <p class="hobs-lede hobs-lede--hero">HOUSE OF BLACK SHEEP IS THE TERRITORY WHERE INDEPENDENT CREATORS UNITE. TOGETHER, WE BUILD BRANDING, CAMPAIGNS AND TECHNOLOGY PROJECTS DESIGNED TO MOVE CULTURE AND REVOLUTIONISE THE WORLD.</p>
      <button class="house-door" type="button" data-door aria-label="Enter what we make"><span class="house-door__frame"><i class="house-door__casing"><span class="house-door__panel"></span></i><b>ENTER THE HOUSE</b></span></button>
    </div>
  </section>`,
})

const flock = document.querySelector('[data-flock]')
const door = document.querySelector('[data-door]')
wirePointerFlock(flock, 68)

const gatherWhiteSheepFlock = (items, startingStates, group) => {
  const positions = items.map((item, index) => {
    const rect = item.getBoundingClientRect()
    const matrix = new DOMMatrixReadOnly(getComputedStyle(item).transform)
    const x = rect.left + rect.width * 0.5 - matrix.m41
    const y = rect.top + rect.height * 0.5 - matrix.m42
    const startingState = startingStates.get(item)
    return {
      item,
      x,
      y,
      startX: startingState.x - x,
      startY: startingState.y - y,
      startTilt: startingState.tilt,
      width: rect.width,
      height: rect.height,
    }
  })
  const flockRect = flock.getBoundingClientRect()
  const orderedPositions = [...positions].sort((a, b) => a.y - b.y || a.x - b.x)
  const packingGap = 0.35
  const gatheredScale = 1
  const visibleBodyWidthRatio = 0.44
  const visibleBodyHeightRatio = 0.58
  const randomBetween = (minimum, maximum) => minimum + Math.random() * (maximum - minimum)
  const restingTilts = orderedPositions.map(() => randomBetween(-2.2, 2.2))
  const footprints = orderedPositions.map(({ width, height }, index) => {
    const tilt = Math.abs(restingTilts[index]) * Math.PI / 180
    const visibleWidth = width * visibleBodyWidthRatio
    const visibleHeight = height * visibleBodyHeightRatio
    return {
      width: (visibleWidth * Math.cos(tilt) + visibleHeight * Math.sin(tilt)) * gatheredScale,
      height: (visibleHeight * Math.cos(tilt) + visibleWidth * Math.sin(tilt)) * gatheredScale,
    }
  })
  const footprintOrder = footprints
    .map((footprint, index) => ({ index, area: footprint.width * footprint.height }))
    .sort((first, second) => second.area - first.area)
  const maximumFootprintWidth = Math.max(...footprints.map(({ width }) => width))
  const maximumFootprintHeight = Math.max(...footprints.map(({ height }) => height))
  let clusterLayout = null

  for (let expansion = 0; expansion < 7 && !clusterLayout; expansion += 1) {
    const areaWidth = maximumFootprintWidth * (3.1 + expansion * 0.12)
    const areaHeight = maximumFootprintHeight * (2.55 + expansion * 0.1)

    for (let restart = 0; restart < 36 && !clusterLayout; restart += 1) {
      const candidateLayout = Array(footprints.length)
      let complete = true

      for (const { index } of footprintOrder) {
        const footprint = footprints[index]
        let destination = null

        for (let attempt = 0; attempt < 500 && !destination; attempt += 1) {
          const candidate = {
            x: randomBetween(-areaWidth * 0.5 + footprint.width * 0.5, areaWidth * 0.5 - footprint.width * 0.5),
            y: randomBetween(-areaHeight * 0.5 + footprint.height * 0.5, areaHeight * 0.5 - footprint.height * 0.5),
            tilt: restingTilts[index],
          }
          const overlaps = candidateLayout.some((placed, placedIndex) => {
            if (!placed) return false
            const neededX = (footprint.width + footprints[placedIndex].width) * 0.5 + packingGap
            const neededY = (footprint.height + footprints[placedIndex].height) * 0.5 + packingGap
            return Math.abs(candidate.x - placed.x) < neededX && Math.abs(candidate.y - placed.y) < neededY
          })
          if (!overlaps) destination = candidate
        }

        if (!destination) {
          complete = false
          break
        }
        candidateLayout[index] = destination
      }

      if (complete) clusterLayout = candidateLayout
    }
  }

  if (!clusterLayout) {
    clusterLayout = footprints.map((_, index) => ({
      x: (index % 3 - 1) * maximumFootprintWidth,
      y: (Math.floor(index / 3) - 0.5) * maximumFootprintHeight,
      tilt: restingTilts[index],
    }))
  }
  const clusterLeft = Math.min(...clusterLayout.map(({ x }, index) => x - footprints[index].width * 0.5))
  const clusterRight = Math.max(...clusterLayout.map(({ x }, index) => x + footprints[index].width * 0.5))
  const clusterTop = Math.min(...clusterLayout.map(({ y }, index) => y - footprints[index].height * 0.5))
  const clusterBottom = Math.max(...clusterLayout.map(({ y }, index) => y + footprints[index].height * 0.5))
  const averageX = positions.reduce((total, position) => total + position.x, 0) / positions.length
  const averageY = positions.reduce((total, position) => total + position.y, 0) / positions.length
  const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum)
  const cornerX = group % 2 === 0 ? -1 : 1
  const cornerY = group < 2 ? -1 : 1
  let desiredTargetX = averageX

  if (cornerX > 0) {
    const blackSheep = flock.querySelector(`.black-sheep--flock-${group}.black-sheep--focus-black`)
    const blackRect = blackSheep.getBoundingClientRect()
    const blackStyle = getComputedStyle(blackSheep)
    const blackCuriousX = Number.parseFloat(blackStyle.getPropertyValue('--black-curious-x')) || 0
    const blackFinalCenterX = blackRect.left + blackRect.width * 0.5 + blackCuriousX
    const blackVisibleHalfWidth = blackRect.width * visibleBodyWidthRatio * 0.5
    desiredTargetX = blackFinalCenterX + blackVisibleHalfWidth + 7 - clusterLeft
  }

  const targetX = clamp(desiredTargetX, flockRect.left - clusterLeft, flockRect.right - clusterRight)
  const targetY = clamp(averageY, flockRect.top - clusterTop, flockRect.bottom - clusterBottom)
  const blackSheep = flock.querySelector(`.black-sheep--flock-${group}.black-sheep--focus-black`)
  const blackRect = blackSheep.getBoundingClientRect()
  const blackCenterX = blackRect.left + blackRect.width * 0.5
  const blackCenterY = blackRect.top + blackRect.height * 0.5
  const blackVisibleHalfWidth = blackRect.width * visibleBodyWidthRatio * 0.5
  const blackDestinationX = cornerX < 0
    ? targetX + clusterRight + blackVisibleHalfWidth + 8
    : targetX + clusterLeft - blackVisibleHalfWidth - 8
  blackSheep.style.setProperty('--black-curious-x', `${blackDestinationX - blackCenterX}px`)
  blackSheep.style.setProperty('--black-curious-y', `${targetY - blackCenterY}px`)

  orderedPositions.forEach(({ item, x, y, startX, startY, startTilt }, index) => {
    const destination = clusterLayout[index]
    const destinationX = targetX + destination.x
    const destinationY = targetY + destination.y
    const entryX = destinationX - x
    const entryY = destinationY - y
    const joltX = cornerX * (7 + index % 3 * 1.5)
    const joltY = cornerY * (5 + index % 2 * 1.5)
    const fearTilt = index % 2 ? 2.2 : -2.2

    item.style.setProperty('--corner-entry-x', `${entryX}px`)
    item.style.setProperty('--corner-entry-y', `${entryY}px`)
    item.style.setProperty('--gather-start-x', `${startX}px`)
    item.style.setProperty('--gather-start-y', `${startY}px`)
    item.style.setProperty('--gather-start-tilt', startTilt)
    item.style.setProperty('--fear-jolt-x', `${joltX}px`)
    item.style.setProperty('--fear-jolt-y', `${joltY}px`)
    item.style.setProperty('--fear-rebound-x', `${startX + joltX * 0.32}px`)
    item.style.setProperty('--fear-rebound-y', `${startY + joltY * 0.32}px`)
    item.style.setProperty('--fear-tilt', `${fearTilt}deg`)
    item.style.setProperty('--fear-rebound-tilt', `${fearTilt * -0.28}deg`)
    item.style.setProperty('--fear-rest-tilt', `${destination.tilt}deg`)
    item.style.setProperty('--gathered-scale', gatheredScale)
    item.style.setProperty('--fear-delay', '0ms')
  })
}

const gatherWhiteSheepFlocks = (startingStates) => {
  for (let group = 0; group < 4; group += 1) {
    const items = [...flock.querySelectorAll(`.black-sheep--focus-flock.black-sheep--flock-${group}`)]
    gatherWhiteSheepFlock(items, startingStates, group)
  }
}

const startFlockGather = () => {
  if (flock.classList.contains('is-gathering') || flock.classList.contains('is-gather-preparing')) return
  const startingStates = new Map([...flock.querySelectorAll('.black-sheep--focus-flock')].map((item) => {
    const rect = item.getBoundingClientRect()
    const tilt = getComputedStyle(item).rotate
    return [item, {
      x: rect.left + rect.width * 0.5,
      y: rect.top + rect.height * 0.5,
      tilt: tilt === 'none' ? '0deg' : tilt,
    }]
  }))
  flock.classList.add('is-gather-preparing')
  gatherWhiteSheepFlocks(startingStates)
  window.requestAnimationFrame(() => {
    if (flock.classList.contains('is-gather-preparing')) flock.classList.add('is-gathering')
  })
}

const stopFlockGather = () => {
  if (flock.classList.contains('is-entering')) return
  flock.classList.remove('is-gathering', 'is-gather-preparing')
}

const setBlackSheepDoorTargets = () => {
  const doorRect = door.getBoundingClientRect()
  const doorX = doorRect.left + doorRect.width * 0.5
  const doorY = doorRect.top + doorRect.height * 0.5
  const maximumWalk = Math.min(88, Math.max(46, window.innerWidth * 0.07))

  flock.querySelectorAll('.black-sheep--focus-black').forEach((item) => {
    const rect = item.getBoundingClientRect()
    const sheepX = rect.left + rect.width * 0.5
    const sheepY = rect.top + rect.height * 0.5
    const differenceX = doorX - sheepX
    const differenceY = doorY - sheepY
    const distance = Math.hypot(differenceX, differenceY) || 1
    const walkDistance = Math.min(maximumWalk, distance * 0.35)
    item.style.setProperty('--black-curious-x', `${differenceX / distance * walkDistance}px`)
    item.style.setProperty('--black-curious-y', `${differenceY / distance * walkDistance}px`)
  })
}

const sendBlackSheepThroughDoor = () => {
  const items = [...flock.querySelectorAll('.black-sheep--focus-black')]
  const startingStates = new Map(items.map((item) => {
    const rect = item.getBoundingClientRect()
    const tilt = getComputedStyle(item).rotate
    return [item, {
      x: rect.left + rect.width * 0.5,
      y: rect.top + rect.height * 0.5,
      tilt: tilt === 'none' ? '0deg' : tilt,
    }]
  }))
  const doorRect = door.getBoundingClientRect()
  const doorX = doorRect.left + doorRect.width * 0.5
  const doorY = doorRect.top + doorRect.height * 0.52

  flock.classList.add('is-black-enter-preparing')
  items.forEach((item) => {
    const rect = item.getBoundingClientRect()
    const matrix = new DOMMatrixReadOnly(getComputedStyle(item).transform)
    const baseX = rect.left + rect.width * 0.5 - matrix.m41
    const baseY = rect.top + rect.height * 0.5 - matrix.m42
    const startingState = startingStates.get(item)
    const startX = startingState.x - baseX
    const startY = startingState.y - baseY
    const enterX = doorX - baseX
    const enterY = doorY - baseY

    item.style.setProperty('--black-enter-start-x', `${startX}px`)
    item.style.setProperty('--black-enter-start-y', `${startY}px`)
    item.style.setProperty('--black-enter-start-tilt', startingState.tilt)
    item.style.setProperty('--black-enter-near-x', `${startX + (enterX - startX) * 0.82}px`)
    item.style.setProperty('--black-enter-near-y', `${startY + (enterY - startY) * 0.82}px`)
    item.style.setProperty('--black-enter-x', `${enterX}px`)
    item.style.setProperty('--black-enter-y', `${enterY}px`)
    item.classList.add('is-approaching')
  })
  flock.classList.remove('is-black-enter-preparing')
}

const setCurious = (curious) => {
  if (curious) setBlackSheepDoorTargets()
  flock.classList.toggle('is-curious', curious)
  if (curious) startFlockGather()
  else stopFlockGather()
}
door.addEventListener('pointerenter', () => setCurious(true))
door.addEventListener('pointerleave', () => {
  if (document.activeElement !== door) setCurious(false)
})
door.addEventListener('focus', () => setCurious(true))
door.addEventListener('blur', () => setCurious(false))
door.addEventListener('click', () => {
  if (flock.classList.contains('is-entering')) return

  startFlockGather()

  flock.classList.add('is-entering')
  sendBlackSheepThroughDoor()
  door.disabled = true
  door.classList.add('is-open')
  window.setTimeout(() => { window.location.href = creativePath('approach/') }, 1700)
})

const revealHomepage = () => window.requestAnimationFrame(() => {
  document.documentElement.classList.add('is-ready')
})
const fontReady = document.fonts?.ready || Promise.resolve()
const backgroundReady = new Promise((resolve) => {
  const image = new Image()
  image.addEventListener('load', resolve, { once: true })
  image.addEventListener('error', resolve, { once: true })
  image.src = hobsBackground
  if (image.complete) resolve()
})
Promise.race([
  Promise.all([fontReady, backgroundReady]),
  new Promise((resolve) => window.setTimeout(resolve, 5000)),
]).then(revealHomepage)
