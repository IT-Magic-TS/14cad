// const partInputs = document.querySelectorAll('.part-add-inputs input')
const partName = document.getElementById('part-name')
const partQuantity = document.getElementById('part-quantity')
const partPrice = document.getElementById('part-price')

const partTotal = document.querySelector('.partTotal')
const projectTotalPrice = document.getElementById('projectTotalPrice')

const btnAddPart = document.getElementById('btn-add-part')

const partListContainer = document.getElementById('part-list-container')

const modalDeleteParts = document.querySelector('#popup-modal-delete-parts')

const closeModalDeletPartsBtn = document.querySelector('#btn-close-modal-delete-parts')
const cancelModaldeletePartsBtn = document.querySelector('#btn-cancel-delete-parts')

const removePartBtn = document.querySelector('#btn-remove-part')
const removeAllPartsBtn = document.querySelector('#btn-remove-parts-all')

const clearAllPartsOpenModalBtn = document.querySelector('#clear-parts')

const containerRemovePartBtn = document.querySelector('#container-btn-single')
const containerRemoveAllPartsBtn = document.querySelector('#container-btn-all')
let deletePartText = document.querySelector('.delete-part-text')

const part = {
  id: 0,
  partName: '',
  partPrice: 0,
  partQuantity: 0,
  total: 0
}

const projectCost = {
  parts: [],
  totalSum: 0
}

let currentPartId

loadEventListeners()

function loadEventListeners() {
  // document.addEventListener('DOMContentLoaded', getPartsFromStorage)
  btnAddPart.addEventListener('click', addPart)
  partListContainer.addEventListener('click', openDeletePartModal)
  closeModalDeletPartsBtn.addEventListener('click', closeModalParts)
  cancelModaldeletePartsBtn.addEventListener('click', closeModalParts)
  removePartBtn.addEventListener('click', removePart)
  partName.addEventListener('keyup', getName)
  partQuantity.addEventListener('keyup', getQuantity)
  partPrice.addEventListener('keyup', getPrice)
}

// partInputs.forEach(input => {
//   input.addEventListener('keyup', e => {
//     e.preventDefault()
//     e.stopPropagation()
//     part[e.target.name] = e.target.value
//     console.log(projectCost)
//     calculatePartTotal()
//   })
// })

function getName(e) {
  part.partName = e.target.value
  e.preventDefault()
  e.stopPropagation()
  console.log(projectCost)
}

function getQuantity(e) {
  part.partQuantity = parseFloat(e.target.value)
  calculatePartTotal()
  e.preventDefault()
  e.stopPropagation()
  console.log(projectCost)
}

function getPrice(e) {
  part.partPrice = parseFloat(e.target.value)
  calculatePartTotal()
  e.preventDefault()
  e.stopPropagation()
  console.log(projectCost)
}

function calculatePartTotal() {
  const quantity = parseFloat(part.partQuantity)
  const price = parseFloat(part.partPrice)
  const total = price * quantity
  
  if (price > 0 && quantity > 0) {
    partTotal.value = total.toFixed(2)
    part.total = partTotal.value
  } else {
    part.total = 0
  }
}

// ADD PART
function addPart() { 
  const quantity = parseFloat(part.partQuantity)
  const price = parseFloat(part.partPrice)

  if (part.partName.length > 0 && price > 0 && quantity > 0) { 
    const randomId = Math.floor((Math.random() * 10000) + 1)
    part.id = randomId 
    const newArray = [...projectCost.parts]
    newArray.push(part)
    projectCost.parts = [...newArray]
    console.log(projectCost)
    calculateTotalCostOfProject()
    savePartsToStorage()
    render()

    // Reset Numbers
    partName.value = ''
    partPrice.value = 0
    partQuantity.value = 0

    part.id = 0
    part.partName = ''
    part.partPrice = 0
    part.partQuantity = 0
    part.total = 0

    calculatePartTotal()
  }
}

function removePart() {  
  const newArray = projectCost.parts.filter(part => part.id !== +currentPartId)
  projectCost.parts = newArray
  render()
  savePartsToStorage()
  calculateTotalCostOfProject()
  closeModalParts()
}

function clearAllParts() {
  if (projectCost.parts.length < 1) return

  projectCost.parts = []
  render()
  savePartsToStorage()
  calculateTotalCostOfProject()
  closeModalParts()
}

// Open Delete Moda
function openDeletePartModal(e) {
  //console.log('EE: ', e.target.parentElement)
  console.log(e.target.parentElement)
  if (e.target.parentElement.classList.contains('delete-part')) {
    currentPartId = e.target.parentElement.getAttribute('data-id')
    deletePartText = 'Are you sure you want to delete this part?'
    containerRemovePartBtn.classList.remove('hidden')
    containerRemoveAllPartsBtn.classList.add('hidden')
    modalDeleteParts.classList.remove('hidden')
  }
}

// Modal for remove all parts
function openModalRemoveAllParts() {
  modal.classList.remove('hidden')
  deletePartText.textContent = 'Are you sure you want to delete all Parts?'
  containerRemovePartBtn.classList.add('hidden')
  containerRemoveAllPartsBtn.classList.remove('hidden')
}

function closeModalParts() {
  modalDeleteParts.classList.add('hidden')
}
// End MODAL - Part remove or Clear Parts

function calculateTotalCostOfProject() {
  if (projectCost.parts.length < 1) return
  function reducer(accumulato, currentValue, index) {
    const returns = parseFloat(accumulato) + parseFloat(currentValue)
    return returns
  }
  const arrParts = [...projectCost.parts]
  const arrayOfTotals = arrParts.map(part => part.total)
  const total = arrayOfTotals.reduce(reducer)
  projectCost.totalSum = parseFloat(total).toFixed(2)

  if (total > 0) {
    projectTotalPrice.innerText = parseFloat(total).toFixed(2)
  } else {
    projectTotalPrice.innerText = 0.00
  }
}

// RENDER
function render() { 
  partListContainer.innerHTML = ''
  if (projectCost.parts.length < 1) {
    const el = document.createElement('h2')
    el.classList.add('p-4', 'text-lg', 'text-center', 'text-blue-700', 'bg-yellow-100')
    el.innerText = 'No Parts!'
    partListContainer.appendChild(el)
    return
  }
  projectCost.parts.forEach(part => {
    const div = document.createElement('div')
    div.classList.add('flex', 'items-center', 'justify-between', 'border-b-2', 'border-blue-400')
    div.innerHTML = `
      <div class="flex items-center justify-between w-full mr-4">
        <div class="flex flex-col lg:flex-row text-label-bigger">${part.partName}&nbsp;<span class="text-label">(price: <span class="text-label-bigger">${part.partPrice}</span>)</span></div>
        <div class="flex gap-x-2">
          <div class="text-label">quantity: <span class="text-label-bigger">${part.partQuantity}</span></div>
          <div class="border-r-2 border-blue-400"></div>
          <div class="text-label">total: <span class="text-label-bigger">${part.total}</span></div>
        </div>
      </div>

      <div class="flex pb-2 gap-x-4 ml-6">

        <button 
          type="button" 
          class="red delete-part"
          data-id=${part.id}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
      
        </button>
        <button
          type="button"
          class="green edit-part"
          data-id=${part.id}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
      
        </button>

      </div>
    `
    partListContainer.appendChild(div)  
  })
}

// Start LocalStorage
function savePartsToStorage() {
  localStorage.setItem('xxProjectCost', JSON.stringify(projectCost))
} 

function getPartsFromStorage() {
  if (localStorage.getItem('xxProjectCost') === null) {
    return
  } else {
    const data = JSON.parse(localStorage.getItem('xxProjectCost'))
    projectCost.parts = data.parts
    projectCost.totalSum = data.totalSum
  }
  calculateTotalCostOfProject()
  render()
}
