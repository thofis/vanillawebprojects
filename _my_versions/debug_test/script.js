const updateButton = document.getElementById('update')
const counterDisplay = document.getElementById('counter')

let counter = 0;

updateButton.addEventListener('click', e => {
  console.log(e.target.id)
  console.log(`counterY: ${counter++}`)
  counterDisplay.value = counter;
})