const boxes = document.querySelectorAll(".box")
const resetBtn = document.querySelector("#reset-btn")
const newGameBtn = document.querySelector("#new-btn")
const msgContainer = document.querySelector(".msg-container")
const msg = document.querySelector("#msg")
const turnIndicator = document.querySelector("#current-turn")
const scoreO = document.querySelector("#score-o")
const scoreX = document.querySelector("#score-x")

let turnO = true //playerX, playerO
let count = 0 //To Track Draw
const scores = { O: 0, X: 0 }

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
]

const resetGame = () => {
  turnO = true
  count = 0
  enableBoxes()
  msgContainer.classList.add("hide")
  updateTurnIndicator()
}

const updateTurnIndicator = () => {
  turnIndicator.textContent = turnO ? "O" : "X"
}

const updateScore = (winner) => {
  scores[winner]++
  scoreO.textContent = scores.O
  scoreX.textContent = scores.X
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O"
      turnO = false
    } else {
      //playerX
      box.innerText = "X"
      turnO = true
    }
    box.disabled = true
    count++

    const isWinner = checkWinner()

    if (count === 9 && !isWinner) {
      gameDraw()
    }

    updateTurnIndicator()
  })
})

const gameDraw = () => {
  msg.innerText = `Game was a Draw!`
  msgContainer.classList.remove("hide")
  disableBoxes()
  celebrateDraw()
}

const disableBoxes = () => {
  for (const box of boxes) {
    box.disabled = true
  }
}

const enableBoxes = () => {
  for (const box of boxes) {
    box.disabled = false
    box.innerText = ""
  }
}

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}!`
  msgContainer.classList.remove("hide")
  disableBoxes()
  celebrateWinner()
  updateScore(winner)
}

const checkWinner = () => {
  for (const pattern of winPatterns) {
    const pos1Val = boxes[pattern[0]].innerText
    const pos2Val = boxes[pattern[1]].innerText
    const pos3Val = boxes[pattern[2]].innerText

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val)
        return true
      }
    }
  }
}

const celebrateWinner = () => {
  const duration = 5 * 1000
  const animationEnd = Date.now() + duration
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1001 }

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    const particleCount = 50 * (timeLeft / duration)

    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      }),
    )
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      }),
    )
  }, 250)
}

const celebrateDraw = () => {
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1001 }
  confetti(
    Object.assign({}, defaults, {
      particleCount: 100,
      origin: { x: 0.5, y: 0.5 },
    }),
  )
}

newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)

// Initialize turn indicator and scores
updateTurnIndicator()
scoreO.textContent = scores.O
scoreX.textContent = scores.X

