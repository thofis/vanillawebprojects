import terms from './terms.js'

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß'


const keyContainer = document.getElementById('key-container')
const figureParts = document.querySelectorAll('.figure-part')
const categoryEl = document.getElementById('category')
const termEl = document.getElementById('term')

const popup = document.getElementById('popup')
const popupBtn = document.getElementById('btn-popup')
const popupMessage = document.getElementById('msg-popup')

let selectedLetters = []
let wrongLetters = []
let correctLetters = []

let category = undefined;
let term = undefined;
let hiddenTerm = undefined

console.log(figureParts)

window.addEventListener('keydown', e => {
  const keyPressed = e.key !== 'ß' ? e.key.toUpperCase() : e.key
  if (e.keyCode === 13 /* enter key */ && popup.style.display !== 'none') {
    initNewGame()
    return
  }
  const correspondingButton = document.getElementById(`key-${keyPressed}`)
  if (!correspondingButton.disabled) {
    handleKeyPressed(correspondingButton)
  }
})

popupBtn.addEventListener('click', e => {
  initNewGame()
})

function handleKeyPressed(element) {
  // console.log(element.innerText)

  const selectedLetter = element.innerText

  selectedLetters.push(selectedLetter)
  element.disabled = true
  element.classList.add('disabled')
  // console.log(selectedLetters)

  checkGuess(selectedLetter)

  updateHiddenterm()
  updateFigure()

  // won
  if (hiddenTerm === term) {
    console.log('Richtig geraten!')
    // popup.className = ''
    popup.classList.remove('lost')
    popup.classList.add('won')
    popup.style.display = 'flex';
    popupMessage.innerText = "Richtig geraten!"
  }
  // lost
  else if (figureParts.length == wrongLetters.length) {
    console.log('Leider verloren.')
    popup.classList.remove('won')
    popup.classList.add('lost')
    popup.style.display = 'flex';
    correctLetters = letters;
    popupMessage.innerText = "Leider verloren."
    updateHiddenterm()
  }


}

function updateFigure() {
  showFigureParts(wrongLetters.length)
}

function checkGuess(letter) {
  if (term.indexOf(letter) > -1) {
    correctLetters.push(letter)
  } else {
    wrongLetters.push(letter)
  }
}

function updateHiddenterm() {
  hiddenTerm = Array.from(term).map(ch => correctLetters.includes(ch) || !letters.includes(ch) ? ch : '_').join('')
  termEl.innerText = hiddenTerm
}

function setupKeys() {
  keyContainer.innerHTML = ''
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


function getRandomCategory() {
  // var item = items[Math.floor(Math.random() * items.length)];
  return terms[Math.floor(Math.random() * terms.length)]
}

function getRandomTermOfCategory(category, termToRemove) {
  const terms = category.terms
  let randomTerm = null;
  let undefinedCounter = 0;
  while (!randomTerm && undefinedCounter < 10) {
    randomTerm = terms[Math.floor(Math.random() * terms.length)]
    undefinedCounter++;
  }
  return randomTerm
}

function removeTerm(category, termToRemove) {
  category.terms = category.terms.filter(term => term !== termToRemove)

}

function setupTerm() {
  category = getRandomCategory()
  term = getRandomTermOfCategory(category)
  // removeTerm(category, term)

  hiddenTerm = Array.from(term).map(ch => letters.includes(ch)  ? '_' : ch).join('')

  categoryEl.innerText = category.category
  termEl.innerText = hiddenTerm


  // console.log(`random category: ${category.category}`)
  // console.log(`random term of this category: ${term}`)
}


function initNewGame() {
  setupKeys()
  setupTerm()
  wrongLetters = []
  selectedLetters = []
  correctLetters = []
  popup.style.display = 'none'
  showFigureParts(0)
}

initNewGame()


