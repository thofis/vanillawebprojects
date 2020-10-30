const mainBtn = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillionairesBtn = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calculateWealthBtn = document.getElementById('calculate-wealth')

let data = []

getRandomUser()
getRandomUser()
getRandomUser()

// fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json()
  // console.log(data)
  const user = data.results[0]

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  }
  addData(newUser)
  // console.log(newUser)
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`
  providedData.forEach(item => {
    const el = document.createElement('div')
    el.classList.add('person')
    el.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
    main.appendChild(el)
  })
}

function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function doubleMoney() {
  data = data.map(it => {
    return {...it, money: it.money * 2}
  })
  updateDOM()
}

function sortByRichest() {
  data.sort((a, b) => b.money - a.money)
  updateDOM()
}

function filterMill() {
  console.log('filter Mill')
  data = data.filter(it => it.money >= 1000000)
  updateDOM()
}

function calcTotal() {
  const total = data.reduce((accu, it) => accu + it.money, 0)
  console.log('total: ' + total)
  const el = document.createElement('div')
  el.innerHTML = `<h3>Total:<strong> ${formatMoney(total)}</strong></h3>`
  main.appendChild(el)
}

addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillionairesBtn.addEventListener('click', filterMill)
calculateWealthBtn.addEventListener('click', calcTotal)

