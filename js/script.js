const tabs = document.querySelectorAll('.tab')
const panels = document.querySelectorAll('.panel')
const btn = document.getElementById('menu-btn')
const menu = document.getElementById('menu')
const logo = document.getElementById('logo')
const logoText = document.getElementById('logo-text')

const btnClosePrivacy = document.getElementById('btn-close-privacy-1')
const btnClosePrivacy2 = document.getElementById('btn-close-privacy')
const modalPrivacy = document.getElementById('popup-modal-privacy')
const btnOpenPrivacy = document.getElementById('btn-privacy-open')
const btnOpenPrivacy2 = document.getElementById('btn-privacy-open-2')

const cookieContainer = document.getElementById('cookie-container')
const cookieBtn = document.getElementById('cookie-btn')

// Cookie - load container or button
document.addEventListener('DOMContentLoaded', function() {
  const data = JSON.parse(localStorage.getItem('cookies-14cad'))
  // console.log('DATA: ', data)
  if (data) {
    cookieContainer.classList.add('hidden')
  }
})

cookieBtn.addEventListener('click', function() {
  cookieContainer.classList.add('hidden')
  localStorage.setItem('cookies-14cad', 'true')
})


btnClosePrivacy.addEventListener('click', function() {
  modalPrivacy.classList.add('hidden')
})

btnClosePrivacy2.addEventListener('click', function() {
  modalPrivacy.classList.add('hidden')
})

btnOpenPrivacy.addEventListener('click', function() {
  modalPrivacy.classList.toggle('hidden')
})

btnOpenPrivacy2.addEventListener('click', function() {
  modalPrivacy.classList.toggle('hidden')
})

const link = document.querySelectorAll('.link')

link.forEach(l => l.addEventListener('click', navToggle))

// Tabs menu event listener
tabs.forEach((tab) => tab.addEventListener('click', onTabClick))

// Hamburger button listener
btn.addEventListener('click', navToggle)

function onTabClick(e) {
  e.preventDefault()
  e.stopPropagation()
  const classString = e.target.getAttribute('data-target')
  // console.log(e.target)
  // Deactivate all tabs
  tabs.forEach((tab) => {
    tab.children[0].classList.remove(
      'border-softRed',
      'border-b-4',
      'md:border-b-0'
    )
  })

  // Hide all panels
  panels.forEach((panel) => panel.classList.add('hidden'))

  // Activate a new tab and panel based on the target
  e.target.classList.add('border-softRed', 'border-b-4')
  document
    .getElementById('panels')
    .getElementsByClassName(classString)[0]
    .classList.remove('hidden')
}

function navToggle() {
  btn.classList.toggle('open')
  menu.classList.toggle('flex')
  menu.classList.toggle('hidden')

  if (menu.classList.contains('flex')) {
    // logo.setAttribute('src', './images/logo-bookmark-footer.svg')
    logoText.classList.remove('text-amber-900')
    logoText.classList.add('text-white')
  } else {
    // logo.setAttribute('src', './images/logo-bookmark.svg')
    logoText.classList.add('text-amber-900')
    logoText.classList.remove('text-white')
  }
}

// Start Service Worker
let deferredPrompt;

if (!window.Promise) {
  window.Promise = Promise
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function() {
    // console.log('Service worker registered!')
  })
}

window.addEventListener('beforeinstallprompt', function(event) {
  // console.log('beforeinstallprompt fired')
  // event.preventDefault()
  // deferredPrompt = event
  // return false
})

// let promise = new Promise(function(resolve, reject) {
//   setTimeout(() => {
//     resolve('Afte 3 seconds')
//   }, 3000);
// })

// promise.then(text => console.log(text)).catch(err => console.log(err))

// fetch('https://httpbin.org/ip').then(res => {
//   console.log(res)
//   return res.json()
// })
//   .then(data => console.log(data))
//   .catch(err => console.log(err))

// fetch('https://httpbin.org/post', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Accept': 'application/json'
//   },
//   body: JSON.stringify({message: 'Does this work?'})
// })
//   .then(res => {
//   console.log(res)
//   return res.json()
// })
//   .then(data => console.log(data))
//   .catch(err => console.log(err))

