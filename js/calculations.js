// Calculate Panel
const cardStartPoints = document.getElementById('card-start-points')
const btnShowCardStartPoints = document.getElementById('panel-btn-start-points')
const btnCardClose = document.getElementById('btn-card-close')

const inputsA = document.querySelectorAll('#simple-panel-container-A input')
const inputsB = document.querySelectorAll('#simple-panel-container-B input')
const panelGapInput = document.getElementById('panel-gap');
const startsContainer = document.getElementById('startsContainer')
const barLength = document.getElementById('panel-bar-length')

const simplePanel = {
  length: 0,
  barDiameter: 0,
  barNumber: 0,
  height:0,
  X: 0,
  Y: 0,
  starts: []
}

getLocalStorageSP()

// Show Card Start Points
btnShowCardStartPoints.addEventListener('click', () => {
  cardStartPoints.classList.remove('hidden')
  calculateDataSP()
})

// Close Card Start Points
btnCardClose.addEventListener('click', () => { 
  cardStartPoints.classList.add('hidden')
})

inputsA.forEach(input => {
  input.addEventListener('keyup', (e) => {
    simplePanel[e.target.name] = parseFloat(e.target.value)

    calculateDataSP()
  })
})

inputsB.forEach(input => {
  input.addEventListener('keyup', (e) => {
    simplePanel[e.target.name] = parseFloat(e.target.value)

    calculateDataSPB()
  })
})

function calculateDataSPB() {
   const height = parseFloat(simplePanel.height)
   const x = parseFloat(simplePanel.X)
   const y = parseFloat(simplePanel.Y)

   let barL = height + y - x
   barL = Math.round(barL)

   if (barL > 0 && height > 0) {
    barLength.value = barL
   } else {
    barLength.value = 0
   }

   setLocalStorageSP()
}

function calculateDataSP() {
  const L = simplePanel.length
  const Bd = simplePanel.barDiameter
  const Bn = simplePanel.barNumber

  let gap = (L - Bd * Bn) / (Bn + 1);

  let start = parseFloat(gap + Bd / 2)
  const center = parseFloat(gap + Bd)
  const starts = []
  starts.push(start.toFixed(0))
  gap = gap.toFixed(1)

  for (let i = 1; i < Bn; i++) {
    start = start + center
    starts.push(Math.floor(start))
  }

  if (
    simplePanel.length > 0 && 
    simplePanel.barDiameter > 0 &&
    simplePanel.barNumber > 0 &&
    gap > 0
  ) {
    panelGapInput.value = gap
    simplePanel.starts = starts
    startPointsHTML(starts)
  } else {
    panelGapInput.value = 0
    simplePanel.gap = 0
    simplePanel.starts = []

    const el = ` 
      <div id="startsContainer">Bar number is 0. No start points!</div>
    `
    startsContainer.innerHTML = el
  }

  setLocalStorageSP()
}

function startPointsHTML(starts) {
  if (starts.length < 1) return
  const div = document.createElement('div')
  div.classList.add('p-2')

  starts.forEach((start, i) => {
    const startEL = document.createElement('div')
    startEL.classList.add('px-2', 'py-1', 'text-sm', 'text-gray-600', 'flex', 'items-center', 'gap-x-2')
    if (i%2 === 0) {
      startEL.classList.add('bgYellow')
    }
    startEL.innerHTML = `<div>S-${i}: </div><div class="text-lg text-gray-900 font-bold">${start}</div>`
    div.append(startEL)
  })
  startsContainer.innerHTML = ''
  startsContainer.appendChild(div)
}

function setLocalStorageSP() {
  const dataStringify = JSON.stringify(simplePanel)
  localStorage.setItem('simplePanelXY', dataStringify)
}

function getLocalStorageSP() {
  const data = JSON.parse(localStorage.getItem('simplePanelXY'))
  if (data !== null) {
    simplePanel.starts = data.starts
  } else {
    return
  }
  inputsA.forEach(input => {
    if (input.name === 'length') {
      input.value = data.length
      simplePanel.length = data.length
    } 
    if (input.name === 'barDiameter') {
      input.value = data.barDiameter
      simplePanel.barDiameter = data.barDiameter
    } 
    if (input.name === 'barNumber') {
      input.value = data.barNumber
      simplePanel.barNumber = data.barNumber
    } 
  })

  inputsB.forEach(input => {
    if (input.name === 'height') {
      input.value = data.height
      simplePanel.height = data.height
    } 
    if (input.name === 'X') {
      input.value = data.X
      simplePanel.X = data.X
    } 
    if (input.name === 'Y') {
      input.value = data.Y
      simplePanel.Y = data.Y
    } 
  })

  calculateDataSP()
  calculateDataSPB()
}

// END Calculate Panel

// Calculate Stair Balustrade
// Show or hide Drawings
const btnDwgA = document.getElementById('btn-dwg-A-SB')
const btnDwgB = document.getElementById('btn-dwg-B-SB')
const dwgA = document.getElementById('img-A-stair-balustrade')
const dwgB = document.getElementById('img-B-stair-balustrade')

btnDwgA.addEventListener('click', () => {
  dwgA.classList.remove('hidden')
  dwgB.classList.add('hidden')
})

btnDwgB.addEventListener('click', () => {
  dwgB.classList.remove('hidden')
  dwgA.classList.add('hidden')
})

let kData = {
  kGoing: 0,
  kd: 0,
  kBd: 0,
  kBn: 0,
  kgap: 0,
  kRise: 0,
  kStepN: 0,
  kl: 0,
  kAngle: 0,
  kH: 0,
  kD: 0,
  kX: 0,
  kHd: 0,
  starts: []
}

const kInputsA = document.querySelectorAll('#k-container-A input')
const kGap = document.getElementById('kGap')
const kBtnShowStartPoints = document.getElementById('k-btn-start-points')
const kL = document.getElementById('kL')
const kAngle = document.getElementById('kAngle')

const kInputsB = document.querySelectorAll('#k-container-B input')
const kInputsC = document.querySelectorAll('#k-container-C input')

// Show Card Start Points
kBtnShowStartPoints.addEventListener('click', () => {
  cardStartPoints.classList.remove('hidden')
  if (kData.starts.length < 1) {
    const px = document.getElementById('startsContainer')
    px.innerText = 'Bar number = 0 or d = 0. No start points!'
  }
  startPointsHTML(kData.starts)
})

kInputsA.forEach(input => {
  input.addEventListener('keyup', (e) => {
    kData[e.target.name] = e.target.value
    calculateKData()
  })
})

kInputsB.forEach(input => {
  input.addEventListener('keyup', (e) => {
    kData[e.target.name] = e.target.value
    calculateKData()
  })
})

// kInputsC.forEach(input => {
//   input.addEventListener('keyup', (e) => {
//     // if (e.target.value.length === 0) e.target.value =
//     kData[e.target.name] = e.target.value
//     calculateKData()
//   })
// })

kGetLocalStorage()

function calculateKData() {
  const going = parseFloat(kData.kGoing)
  const d = parseFloat(kData.kd)
  const Bd = parseFloat(kData.kBd)
  const Bn = parseFloat(kData.kBn)
  const starts = []

  let gap = (going - Bd * Bn) / Bn

  if (gap > 0 && gap < going && !Number.isNaN(gap)) {
    kData.kgap = gap
    kGap.value = gap.toFixed(1)
    if(d > 0) {
      let start = gap + Bd / 2 - d
      const center = gap + Bd
      starts.push(Math.round(start))
      for (i = 1; i < Bn; i++) {
        start += center
        starts.push(Math.round(start))
      }
      kData.starts = starts
    }
  } else {
    kData.kgap = 0
    kGap.value = 0.0
  }

  // Container B
  const rise = parseFloat(kData.kRise)
  const stepNumber = parseFloat(kData.kStepN)

  const x = Math.pow(rise, 2) + Math.pow(going, 2)
  const dStep = Math.sqrt(x)
  const L = dStep * stepNumber
  
  if (rise > 0 && going > 0 && L > 0) {   
    kL.value = Math.round(L)
  } else {
    kL.value = 0
  }

  // Calculate Angle
  const angleRadian = Math.atan(rise / going)
  let angleDegree = (180 / Math.PI) * angleRadian
  angleDegree = 90 - angleDegree
  
  if (rise > 0 && going > 0 && angleDegree > 0) {
    kAngle.value = angleDegree.toFixed(2) 
  } else {
    kAngle.value = 0
  }

  // Container C BARS LENGTH
  let H = parseFloat(kData.kH)
  let Hd = parseFloat(kData.kHd)
  let X = parseFloat(kData.kX)

  if (Number.isNaN(H)) H = 0
  if (Number.isNaN(Hd)) Hd = 0
  if (Number.isNaN(X)) X = 0

  const barCentre = gap + Bd
  const d1 = gap - d + Bd

  const y = Hd / Math.cos(angleRadian)

  const x1 = d1 * Math.tan(angleRadian)
  const x2 = barCentre * Math.tan(angleRadian)
  const barHHDX = H - y + X

  let barLength_x = barHHDX + x1

  const barsLength = []
  barsLength.push(Math.round(barLength_x))

  const barContainer = document.getElementById('bar-length-container')
  
  for (i = 1; i < Bn; i++) {
    barLength_x += x2
    barsLength.push(Math.round(barLength_x))
  }

  let cHtml = '';
  barsLength.forEach((bar, i) => {
    const el = `
      <div class="mt-2">
        <p class="text-lg text-gray-700 border-b-2">
          Bar <span class="font-bold text-gray-900">${i + 1}</span> length = <span class="font-bold text-gray-900">${bar} (${stepNumber} bars)</span>
        </p>
      </div>
    `
    cHtml += el
  })
  const isNotNum = Number.isNaN(barsLength[0])
  if (barsLength.length > 0 && !isNotNum) {
    barContainer.innerHTML = cHtml
  } else {
    barContainer.innerHTML = ''
  }

  kSetLocalStorage()
}

// Set LocalStorage
function kSetLocalStorage() {
  const data = JSON.stringify(kData)
  localStorage.setItem('kCalcData', data)
}

function kGetLocalStorage() {
  const data = JSON.parse(localStorage.getItem('kCalcData'))
  if (data !== null) {
    kInputsA.forEach(input => {
      if (input.name === 'kGoing') input.value = data.kGoing
      if (input.name === 'kd') input.value = data.kd
      if (input.name === 'kBd') input.value = data.kBd
      if (input.name === 'kBn') input.value = data.kBn
    })

    kInputsB.forEach(input => {
      if (input.name === 'kRise') input.value = data.kRise
      if (input.name === 'kStepN') input.value = data.kStepN  
      if (input.name === 'kH') input.value = data.kH
      if (input.name === 'kHd') input.value = data.kHd  
      if (input.name === 'kX') input.value = data.kX          
    })

    kData = { ...data }
    calculateKData()
  }
}


// END Calculate Stair Balustrade