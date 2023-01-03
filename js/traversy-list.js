// Define UI Vars 
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

const modal = document.querySelector('#popup-modal')
const closeModalBtn = document.querySelector('#btn-close-modal')
const cancelModalBtn = document.querySelector('#btn-cancel')
const removeTaskBtn = document.querySelector('#btn-remove-task')

const clearAllTasksOpenModalBtn = document.querySelector('#clear-tasks')

const containerRemoveTaskBtn = document.querySelector('#container-btn-single')
const containerRemoveAllTasksBtn = document.querySelector('#container-btn-all')
const deleteTaskText = document.querySelector('.delete-task-text')

const clearTasksBtn = document.querySelector('#btn-remove-tasks-all')

const filterTask= document.querySelector('#filter')

let task = ''

loadEventListeners()

// Load all event listeners
function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getTasksFromStorage)
  // Add task event
  form.addEventListener('submit', addTask)
  // Open Modal
  taskList.addEventListener('click', openModal)  
  // Close modal
  closeModalBtn.addEventListener('click', closeModal)
  // Close modal - Cancel BTN
  cancelModalBtn.addEventListener('click', closeModal)
  // Remove Task
  removeTaskBtn.addEventListener('click', removeTask)
  // open modal for clear al tasks
  clearAllTasksOpenModalBtn.addEventListener('click', openModalRemoveAllTasks)
  // Clear all TASKS
  clearTasksBtn.addEventListener('click', clearAllTasks)
  // Filter Tasks
  filterTask.addEventListener('keyup', filterTasks)
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase()

  document.querySelectorAll('.collection-item').forEach(t => {
    const item = t.children[0].textContent

    if(item.toLowerCase().indexOf(text) != -1) {
      t.classList.remove('hidden')
      t.classList.add('flex')
    } else {
      t.classList.remove('flex')
      t.classList.add('hidden')
      console.log(t)
    }
  })
}

// Add Task
function addTask(e) {
  e.preventDefault()
  if (taskInput.value === '') return

  const div = document.createElement('div')
  div.className = 'flex items-center justify-between px-4 py-2 mb-2 border border-green-700 delete-item collection-item'
  div.innerHTML = `
    <p class="text-lg font-bold text-gray-700">${taskInput.value}</p>
    <button class="text-2xl text-red-600 red">X</button>
  `
  taskList.appendChild(div)

  // Store in LocalStorage
  storeTaskInLocaleStorage(taskInput.value)
}

function removeTask() {
  task.remove()
  // Remove Task from LovalStorage
  removeTaskFromLocalStorage(task)
  closeModal()
}

function clearAllTasks() {
  taskList.innerHTML = ''
  localStorage.removeItem('tasks')
  closeModal()
}

// Modal for remove task
function openModal(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    task = e.target.parentElement
    deleteTaskText.textContent = 'Are you sure you want to delete this task?'
    containerRemoveTaskBtn.classList.remove('hidden')
    containerRemoveAllTasksBtn.classList.add('hidden')
    modal.classList.remove('hidden')
  }
}

// Modal for remove all tasks
function openModalRemoveAllTasks() {
  modal.classList.remove('hidden')
  deleteTaskText.textContent = 'Are you sure you want to delete all Tasks?'
  containerRemoveTaskBtn.classList.add('hidden')
  containerRemoveAllTasksBtn.classList.remove('hidden')
}

function closeModal() {
  modal.classList.add('hidden')
}

// LOCALE STORAGE
function storeTaskInLocaleStorage(task) {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task)
  localStorage.setItem('tasks', JSON.stringify(tasks))

  console.log(tasks)
}

function getTasksFromStorage() {
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(t => {
    const div = document.createElement('div')
    div.className = 'flex items-center justify-between px-4 py-2 mb-2 border border-green-700 delete-item collection-item'
    div.innerHTML = `
      <p class="text-lg font-bold text-gray-700">${t}</p>
      <button class="text-2xl text-red-600 red">X</button>
    `
    taskList.appendChild(div)
  })
}

function removeTaskFromLocalStorage(task) {
  console.log(task.children[0].textContent)
  let text = task.children[0].textContent
  let tasks
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  const newTasks = tasks.filter(t => t !== text )

  localStorage.setItem('tasks', JSON.stringify(newTasks))
}