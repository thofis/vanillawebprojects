// function calculate() {
//   fetch('items.json', {
//     method: 'GET'
//   }).then(response => response.json()).then(data => {
//     console.log(data)
//     // document.body.innerHTML = data[2].text
//   })
// }
// calculate()

const currencyElementOne = document.getElementById('currency-one')
const currencyElementTwo = document.getElementById('currency-two')
const amountElementOne = document.getElementById('amount-one')
const amountElementTwo = document.getElementById('amount-two')

const rateElement = document.getElementById('rate')
const swapBtn = document.getElementById('swap')

// fetch exchange rate and update dom
function calculate() {
  const currencyOne = currencyElementOne.value
  const currencyTwo = currencyElementTwo.value
  fetch(`https://api.exchangerate-api.com/v4/latest/${currencyOne}`)
    .then(res=>res.json())
    .then(data=>{
      // console.log(data)
      const rate = data.rates[currencyTwo]
      // console.log(rate)
      rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`

      amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
    })
}

// event listeners
currencyElementOne.addEventListener('change', calculate)
currencyElementTwo.addEventListener('change', calculate)
amountElementOne.addEventListener('input', calculate)
amountElementTwo.addEventListener('input', calculate)

swapBtn.addEventListener('click', ()=> {
  // const temp = currencyElementOne.value
  // currencyElementOne.value = currencyElementTwo.value
  // currencyElementTwo.value = temp

  [currencyElementOne.value, currencyElementTwo.value] = [currencyElementTwo.value, currencyElementOne.value]

  calculate()
})

calculate()