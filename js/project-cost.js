// Get inputs and calculate part total
const partName = document.getElementById('part-name')
const partQuantity = document.getElementById('part-quantity')
const partPrice = document.getElementById('part-price')
const partTotal = document.querySelector('.partTotal')

// Add part to the part list
const btnAddPart = document.getElementById('btn-add-part')

// CONTAINER - Parts
const partListContainer = document.getElementById('part-list-container')

const closeModalDeletPartsBtn = document.querySelector('#btn-close-modal-delete-parts')
const cancelModaldeletePartsBtn = document.querySelector('#btn-cancel-delete-parts')

const removePartBtn = document.querySelector('#btn-remove-part')
const removeAllPartsBtn = document.querySelector('#btn-remove-parts-all')

const clearAllPartsOpenModalBtn = document.querySelector('#clear-parts-btn')

const containerRemovePartBtn = document.querySelector('#container-btn-single')
const containerRemoveAllPartsBtn = document.querySelector('#container-btn-all')
const modalDeleteParts = document.querySelector('#popup-modal-delete-parts')
let deletePartText = document.querySelector('.delete-part-text')

// BTN to remove all parts
const btnRemoveAllParts = document.getElementById('btn-remove-parts-all')

// Update PART
const containerBtnsUpdate = document.getElementById('container-btns-update')
const btnPartUpdate = document.getElementById('btn-part-update')
const btnPartUpdateCancel = document.getElementById('btn-part-update-cancel')

loadEventListeners()

function loadEventListeners() {
  // LOCALSTORAGE
  document.addEventListener('DOMContentLoaded', getPartsFromStorage)

  // Get inputs and calculate part total
  partName.addEventListener('keyup', getName)
  partQuantity.addEventListener('keyup', getQuantity)
  partPrice.addEventListener('keyup', getPrice)

  // Add part to the part list
  btnAddPart.addEventListener('click', addPart)

  partListContainer.addEventListener('click', openDeletePartModal)
  closeModalDeletPartsBtn.addEventListener('click', closeModalParts)
  cancelModaldeletePartsBtn.addEventListener('click', closeModalParts)
  removePartBtn.addEventListener('click', removePart)
  clearAllPartsOpenModalBtn.addEventListener('click', openModalRemoveAllParts)

  // Remove all parts
  btnRemoveAllParts.addEventListener('click', clearParts)

  // Update Part
  btnPartUpdateCancel.addEventListener('click', cancelUpdatePart)
  btnPartUpdate.addEventListener('click', updatePart)
}

const projectCost = {
  parts: [],
  totalSum: 0
}

let pName = '', pQuantity = 0, pPrice = 0, pTotal = 0
let currentPartId

function getName(e) {
  if (!e.target.value) pName = ''
  pName = e.target.value
  e.preventDefault()
  e.stopPropagation()
}

function getQuantity(e) {
  if (!e.target.value) pQuantity = 0
  pQuantity = parseFloat(e.target.value)
  calculatePartTotal()
  e.preventDefault()
  e.stopPropagation()
}

function getPrice(e) {
  if (!e.target.value) pPrice = 0
  pPrice = parseFloat(e.target.value)
  calculatePartTotal()
  e.preventDefault()
  e.stopPropagation()
}

function calculatePartTotal() {
  const quantity = parseFloat(pQuantity)
  const price = parseFloat(pPrice)
  const total = price * quantity
  
  if (price > 0 && quantity > 0 && total > 0) {
    partTotal.value = total.toFixed(2)
    pTotal = partTotal.value
  } else {
    pTotal = 0
  }
}

// ADD PART
function addPart() { 
  if (pName.length < 1 || pPrice < 1 || pQuantity < 1) return

  projectCost.parts.push({
    id: Math.floor((Math.random() * 10000) + 1),
    partName: pName,
    partPrice: pPrice,
    partQuantity: pQuantity,
    total: pTotal
  })

  partName.value = null
  partQuantity.value = null
  partPrice.value = null

  render()
  partTotal.value = 0.00
  pTotal = 0.00
  pQuantity = 0
  pPrice = 0
  calculateTotalCostOfProject()
  savePartsToStorage()
}

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

function removePart() {  
  const newArray = projectCost.parts.filter(part => part.id !== +currentPartId)
  projectCost.parts = newArray
  render()
  savePartsToStorage()
  calculateTotalCostOfProject()
  closeModalParts()
}

function clearParts() {
  projectCost.parts = []
  localStorage.clear('xxProjectCost')
  projectTotalPrice.innerText = 0.00
  render()
  closeModalParts()
}

// Open RemovePart Modal
function openDeletePartModal(e) {
  if (e.target.parentElement.classList.contains('delete-part')) {
    currentPartId = e.target.parentElement.getAttribute('data-id')
    deletePartText.textContent = 'Are you sure you want to delete this part?'
    containerRemovePartBtn.classList.remove('hidden')
    containerRemoveAllPartsBtn.classList.add('hidden')
    modalDeleteParts.classList.remove('hidden')
  } else if (e.target.parentElement.classList.contains('edit-part')) {
    // START WITH UPDATE PART
    currentPartId = +e.target.parentElement.getAttribute('data-id')
    containerBtnsUpdate.classList.remove('hidden')
    btnAddPart.classList.add('hidden')

    const part = projectCost.parts.find(p => p.id === currentPartId)
    
    const total = +part.total

    partTotal.value = total.toFixed(2)
    partName.value = part.partName
    partPrice.value = part.partPrice
    partQuantity.value = part.partQuantity

    pName = part.partName
    pQuantity = +part.partQuantity
    pPrice = +part.partPrice
    pTotal = +part.partQuantity
  }
}

function updatePart() {
  const index = projectCost.parts.map(p => p.id).indexOf(currentPartId)
  projectCost.parts[index].partName = pName
  projectCost.parts[index].partQuantity = pQuantity
  projectCost.parts[index].partPrice = pPrice
  projectCost.parts[index].total = pTotal

  render()
  calculateTotalCostOfProject()
  savePartsToStorage()
  cancelUpdatePart()
}

function cancelUpdatePart() {
  partTotal.value = 0.00
  partName.value = null
  partPrice.value = null
  partQuantity.value = null

  pName = ''
  pQuantity = 0
  pPrice = 0
  pTotal = 0
  containerBtnsUpdate.classList.add('hidden')
  btnAddPart.classList.remove('hidden')
}

// Modal for remove all parts
function openModalRemoveAllParts() {
  if (projectCost.parts.length < 1) return
  modalDeleteParts.classList.remove('hidden')
  deletePartText.textContent = 'Are you sure you want to delete all Parts?'
  containerRemovePartBtn.classList.add('hidden')
  containerRemoveAllPartsBtn.classList.remove('hidden')
}

function closeModalParts() {
  modalDeleteParts.classList.add('hidden')
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
