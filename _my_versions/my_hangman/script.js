const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß'

const selectedLetters = []

const keyContainer = document.getElementById('key-container')
const figureParts = document.querySelectorAll('.figure-part')

const wrongLetters = []

console.log(figureParts)

window.addEventListener('keydown', e => {
  const keyPressed = e.key !== 'ß' ? e.key.toUpperCase() : e.key
  const correspondingButton = document.getElementById(`key-${keyPressed}`)
  if (!correspondingButton.disabled) {
    handleKeyPressed(correspondingButton)
  }
})

function handleKeyPressed(element) {
  // console.log(element.innerText)
  selectedLetters.push(element.innerText)
  element.disabled = true
  element.classList.add('disabled')
  // console.log(selectedLetters)
  wrongLetters.push(element.innerText)
  showFigureParts(wrongLetters.length)
}

function setupKeys() {
  Array.from(letters).forEach(letter => {
    // console.log(`letter: ${letter}`)
    const buttonEl = document.createElement('button')
    buttonEl.id = `key-${letter}`
    buttonEl.classList.add('key')
    buttonEl.innerText = letter
    buttonEl.addEventListener('click', function (e) {
      handleKeyPressed(e.target)
    })
    keyContainer.appendChild(buttonEl)
  })
}

function showFigureParts(toIndex) {
  figureParts.forEach((part, index) => {
    part.style.display = index < toIndex ? 'block' : 'none'
  })
}

setupKeys()
