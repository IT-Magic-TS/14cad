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
