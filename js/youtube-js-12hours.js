// Starting with APIs
  
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(json => console.log(json))

// END of Starting with APIs

// TIP Calculator

  const bill = document.getElementById('c-total')
  const tip = document.getElementById('c-tip')

  const peopleNum = document.getElementById('tip-people-number')
  const tottalPerPerson = document.getElementById('tip-sum')

  const inputs = document.querySelectorAll('input')
  const buttons = document.querySelectorAll('button')

  const tipData = {
    total: 0,
    tip: 20,  
    people: 1,
    result: 0
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', e => {
      if (e.target.id === 'tip-plus') {
        tipData.people += 1
        calculateTotalPerPerson()
      } else if (tipData.people > 1 && e.target.id === 'tip-minus') {
        tipData.people -= 1
        calculateTotalPerPerson()
      }
    })
  })

  inputs.forEach(input => {
    input.addEventListener('change', e => { 
      tipData[e.target.name] = parseFloat(e.target.value)
      calculateTotalPerPerson() 
    })
  })

  const calculateTotalPerPerson = () => {
    const bill = tipData.total
    const tip = tipData.tip
    peopleNum.innerText = tipData.people

    if (bill > 0 && tip > 0) {
      let total = bill * (tip / 100)
      total  = (total + bill) / tipData.people
      tottalPerPerson.innerText = total.toFixed(2)
    } else {
      tottalPerPerson.innerText = tipData.total
    }
  }

// END TIP Calculator

// Understanding the DOM

  const squares = document.querySelectorAll('.colorSquare')
  const restartBtn = document.getElementById('restart')
  const restartContainer = document.getElementById('restart-container')

  const timesClicked = {
    red: 0,
    yellow: 0,
    green: 0
  }

  squares.forEach(square => {     
    // we can use onclick()
    square.addEventListener('click', e => {
      timesClicked[square.value] += 1
      e.target.innerText = timesClicked[square.value]
      restartContainer.classList.remove('hidden')
      // if (e.target.value === 'red') {
      //   // timesClicked.red = timesClicked.red + 1
      //   timesClicked[square.value] += 1
      //   e.target.textContent = timesClicked.red
      // } 
      // if (e.target.value === 'yellow') {
      //   timesClicked.yellow = timesClicked.yellow + 1
      //   e.target.textContent = timesClicked.yellow
      // } 
      // if (e.target.value === 'green') {
      //   timesClicked.green = timesClicked.green + 1
      //   e.target.textContent = timesClicked.green
      // } 
    })
  })

  restartBtn.addEventListener('click', () => {
    restartContainer.classList.add('hidden')
    squares.forEach(s => {
      s.innerText = ''
      timesClicked.red = 0
      timesClicked.yellow = 0
      timesClicked.green = 0
    })
  })

  

// END Understanding the DOM


// ROCK, PAPER, SCISSORS GAME
const scissorsBtn = document.getElementById('scissors')
const rockBtn = document.getElementById('rock')
const paperBtn = document.getElementById('paper')

const playerContainer = document.getElementById('playerContainer')
const computerContainer = document.getElementById('computerContainer')

const playerResult = document.getElementById('player')
const computerResult = document.getElementById('computer')

const finalResult = document.getElementById('final-result');

const restart = document.getElementById('restartRocks')

const paper = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
  <path stroke-linecap="round" stroke-linejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
  </svg>
`

const rock = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12">
  <path d="M21.721 12.752a9.711 9.711 0 00-.945-5.003 12.754 12.754 0 01-4.339 2.708 18.991 18.991 0 01-.214 4.772 17.165 17.165 0 005.498-2.477zM14.634 15.55a17.324 17.324 0 00.332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 00.332 4.647 17.385 17.385 0 005.268 0zM9.772 17.119a18.963 18.963 0 004.456 0A17.182 17.182 0 0112 21.724a17.18 17.18 0 01-2.228-4.605zM7.777 15.23a18.87 18.87 0 01-.214-4.774 12.753 12.753 0 01-4.34-2.708 9.711 9.711 0 00-.944 5.004 17.165 17.165 0 005.498 2.477zM21.356 14.752a9.765 9.765 0 01-7.478 6.817 18.64 18.64 0 001.988-4.718 18.627 18.627 0 005.49-2.098zM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 001.988 4.718 9.765 9.765 0 01-7.478-6.816zM13.878 2.43a9.755 9.755 0 016.116 3.986 11.267 11.267 0 01-3.746 2.504 18.63 18.63 0 00-2.37-6.49zM12 2.276a17.152 17.152 0 012.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0112 2.276zM10.122 2.43a18.629 18.629 0 00-2.37 6.49 11.266 11.266 0 01-3.746-2.504 9.754 9.754 0 016.116-3.985z" />
  </svg>
`

const scissors = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-12 h-12">
  <path fill-rule="evenodd" d="M8.128 9.155a3.751 3.751 0 11.713-1.321l1.136.656a.75.75 0 01.222 1.104l-.006.007a.75.75 0 01-1.032.157 1.421 1.421 0 00-.113-.072l-.92-.531zm-4.827-3.53a2.25 2.25 0 013.994 2.063.756.756 0 00-.122.23 2.25 2.25 0 01-3.872-2.293zM13.348 8.272a5.073 5.073 0 00-3.428 3.57c-.101.387-.158.79-.165 1.202a1.415 1.415 0 01-.707 1.201l-.96.554a3.751 3.751 0 10.734 1.309l13.729-7.926a.75.75 0 00-.181-1.374l-.803-.215a5.25 5.25 0 00-2.894.05l-5.325 1.629zm-9.223 7.03a2.25 2.25 0 102.25 3.897 2.25 2.25 0 00-2.25-3.897zM12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
  <path d="M16.372 12.615a.75.75 0 01.75 0l5.43 3.135a.75.75 0 01-.182 1.374l-.802.215a5.25 5.25 0 01-2.894-.051l-5.147-1.574a.75.75 0 01-.156-1.367l3-1.732z" />
  </svg>
`

gameData = {
  player: 0,
  computer: 0,
  setWinner: 'Draw'
}

scissorsBtn.innerHTML = scissors
rockBtn.innerHTML = rock
paperBtn.innerHTML = paper
 
const randomNum = () => {
  return Math.floor(Math.random() * 3)
}

restart.addEventListener('click', () => {
  computerContainer.classList.add('hidden')
  playerContainer.classList.add('hidden')
  gameData.player = 0
  gameData.computer = 0
  gameData.setWinner = 'Draw'
  finalResult.classList.add('hidden')
  playerResult.textContent = gameData.player
  computerResult.textContent = gameData.computer
})

rockBtn.addEventListener('click', () => {
  playGame(rock, 'rock')
})

paperBtn.addEventListener('click', () => {
  playGame(paper, 'paper')
})

scissorsBtn.addEventListener('click', () => {
  playGame(scissors, 'scissors')
})

const playGame = (playerCard, playerCharacter) => {
  const randomN = randomNum()
  playerContainer.innerHTML = playerCard    
   
  playerContainer.classList.remove('hidden')
  playerContainer.classList.add('mx-auto', 'animate-spin')

  computerContainer.classList.remove('hidden')
  computerContainer.classList.add('mx-auto')

  score(playerCharacter, randomN)

  playerResult.textContent = gameData.player
  computerResult.textContent = gameData.computer

  finalResult.classList.remove('hidden')
  finalResult.children[0].textContent = gameData.setWinner
 
  if (randomN === 0) {
    computerContainer.innerHTML = rock
  } else if (randomN === 1) {
    computerContainer.innerHTML = paper
  } else if (randomN === 2) {
    computerContainer.innerHTML = scissors
  } else {
    computerContainer.classList.add('hidden')
    playerContainer.classList.add('hidden')
  }
}

const score = (p, c) => {
  if (p === 'rock'){
    if (c === 0) return gameData.setWinner = 'Draw'
    if (c === 1) {
      gameData.computer = gameData.computer + 1
      gameData.setWinner = 'Winner is Computer'
    }
    if (c === 2) {
      gameData.player = gameData.player + 1
      gameData.setWinner = 'Winner is Player'
    }
  }

  if (p === 'paper'){
    if (c === 1) return gameData.setWinner = 'Draw'
    if (c === 2) {
      gameData.computer = gameData.computer + 1
      gameData.setWinner = 'Winner is Computer'
    }
    if (c === 0) {
      gameData.player = gameData.player + 1
      gameData.setWinner = 'Winner is Player'
    }
  }

  if (p === 'scissors'){
    if (c === 2) return gameData.setWinner = 'Draw'
    if (c === 0) {
      gameData.computer = gameData.computer + 1
      gameData.setWinner = 'Winner is Computer'
    }
    if (c === 1) {
      gameData.player = gameData.player + 1
      gameData.setWinner = 'Winner is Player'
    }
  }
}
// END ROCK, PAPER, SCISSORS GAME

