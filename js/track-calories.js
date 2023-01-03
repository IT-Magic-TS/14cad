// Storage Controller
const StorageCtrl = (function() {
  // Public methods
  return {
    storeItem: (item) => {
      let items = []
      // Check if any itms in ls
      if (localStorage.getItem('items') === null) {
        // Push new item
        items.push(item)
        localStorage.setItem('items', JSON.stringify(items))
      } else {
        items = JSON.parse(localStorage.getItem('items'))

        items.push(item)

        localStorage.setItem('items', JSON.stringify(items))
      }
    },
    clearItems: () => {
      localStorage.clear()
    },
    getItemsStorage: () => {
      let items = JSON.parse(localStorage.getItem('items'))

      if (items === null) {
        items = []
      } 
      return items;
    },
    deleteItem: (id) => {
      let items = JSON.parse(localStorage.getItem('items'))
      const newItems = items.filter(item => item.id !== id)

      localStorage.setItem('items', JSON.stringify(newItems))
    },
    updateItem: (item) => {
      let items = JSON.parse(localStorage.getItem('items'))

      const newItems = items.map(i => {
        if (i.id === item.id) {
          i.name = item.name
          i.calories = item.calories
        }
        return i
      })

      localStorage.setItem('items', JSON.stringify(newItems))
    }
  }
})()

// Item Controller ---------------------------------------------------------------------------------------------
const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories){
    this.id = id
    this.name = name   
    this.calories = calories
  }

  // Data Structure / State
  const data = {
    // items: [
    //   // {id: 0, name: 'Steak', calories: 1200},
    //   // {id: 1, name: 'Banana', calories: 120},
    //   // {id: 2, name: 'Ice Cream', calories: 1800}
    // ],
    items: StorageCtrl.getItemsStorage(),
    currentItem: null,
    totalCalories: 0
  }

  // Public Methods
  return {
    getItems: function() {
      return data.items
    },
    addItem: function(input) {
      let ID;
      // Create ID
      ID = data.items.length > 0 ? data.items[data.items.length - 1].id + 1 : 0
      // Calories to number
      const calories = parseInt(input.calories)

      // Create a new item
      newItem = new Item(ID, input.name, calories)

      // Add to items array
      data.items.push(newItem)

      return newItem
    },

    getItemById: function(id) {
      return data.items.find(item => item.id === id)
    },
    updateItem: function(name, calories) {
      // Calories to number
      calories = parseInt(calories)

      const item = data.items.find(item => item.id === data.currentItem.id)
      if (item) {
        item.name = name
        item.calories = calories
      }

      // Update Storage
      StorageCtrl.updateItem(item)

      return item;
    },

    deleteItem: function(item) {
      // Get ids
      const ids = data.items.map(item => item.id)

      //Get index
      const index = ids.indexOf(item.id)

      // Remove item
      data.items.splice(index, 1)

      // Remove item from storage
      StorageCtrl.deleteItem(item.id)
    },

    clearAllItems: function() {
      data.items = []
      StorageCtrl.clearItems()
    },

    setCurrentItem: function(item) {
      data.currentItem = item
    },

    getCurrentItem: function() {
      return data.currentItem
    },

    getTotalCalories: function() {
      let total = 0;
      data.items.forEach(item => {
        total += item.calories
      })
      data.totalCalories = total

      return data.totalCalories
    },

    logData: function() {
      return data
    }
  }
})();
// END Item Controller ---------------------------------------------------------------------------------------------

// UI Controller -------------------------------------------------------------------------------------------
const UICtrl = (function(items) {
  const UISelectors = {
    itemList: '#ul-container',
    listItems: '#ul-container li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    clearBtn: '.clear-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '#total-calories'
  }

  // Public Methods
  return {
    populateItemList: function(items) {
      let html = ''

      items.forEach(item => {
        html += `
          <li class="flex justify-between px-2 items-center item-list" id="item-${item.id}">
            <div class="text-xl gap-x-2 flex text-gray-700">
              ${item.name}: <span class="font-bold text-green-800">${item.calories} Calories</span>
            </div>
            <a href="" class="text-cyan-700 cursor-pointer">
              <img src="images/icon-pencil.svg" alt="icon pencil" class="w-6 h-6 edit-item">
            </a>
          </li>
        `
      })
      // Insert htm into ul
      document.querySelector(UISelectors.itemList).innerHTML = html
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },
    addListItem: function(item){
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block'
      const li = `
        <li class="flex justify-between px-2 items-center" id="item-${item.id}">
          <div class="text-xl gap-x-2 flex text-gray-700">
            ${item.name}: <span class="font-bold text-green-800">${item.calories} Calories</span>
          </div>
          <a href="" class="text-cyan-700 cursor-pointer">
            <img src="images/icon-pencil.svg" alt="icon pencil" class="w-6 h-6 edit-item">
          </a>
        </li>
      `
      // Insert Item
      document.querySelector(UISelectors.itemList).insertAdjacentHTML('beforeend', li)
    },

    updateListItem: function(item) {
      let listItems = document.querySelectorAll(UISelectors.listItems)

      // Turn Node list into array
      listItems = Array.from(listItems)
      
      listItems.forEach(function(listItem) {
        const itemId = listItem.getAttribute('id')

        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `
          <li class="flex justify-between px-2 items-center" id="item-${item.id}">
            <div class="text-xl gap-x-2 flex text-gray-700">
              ${item.name}: <span class="font-bold text-green-800">${item.calories} Calories</span>
            </div>
            <a href="" class="text-cyan-700 cursor-pointer">
              <img src="images/icon-pencil.svg" alt="icon pencil" class="w-6 h-6 edit-item">
            </a>
          </li>
          `
        }
      })
    },
    delteItemFromList: function(id) {
      const itemID = `#item-${id}`
      const item = document.querySelector(itemID)
      item.remove()
      this.clearEditState()
    },
    clearFields: function() {
      document.querySelector(UISelectors.itemNameInput).value = ''
      document.querySelector(UISelectors.itemCaloriesInput).value = ''
    },
    addItemToForm: function() {
      document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name
      document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories
      UICtrl.showEditState()
    },

    clearItems: function() {
      let items = document.querySelectorAll(UISelectors.listItems)

      // Turn node list into array
      items = Array.from(items)

      items.forEach(function(item) {
        item.remove()
      })
    },

    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = 'none'
    },
    showTotalCalories: function(totaCalories) {
      document.querySelector(UISelectors.totalCalories).textContent = totaCalories
    },

    // EDIT STATE
    clearEditState: function() {
      UICtrl.clearFields()
      document.querySelector(UISelectors.updateBtn).style.display = 'none'
      document.querySelector(UISelectors.deleteBtn).style.display = 'none'
      document.querySelector(UISelectors.backBtn).style.display = 'none'
      document.querySelector(UISelectors.addBtn).style.display = 'inline'
    },

    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = 'inline'
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline'
      document.querySelector(UISelectors.backBtn).style.display = 'inline'
      document.querySelector(UISelectors.addBtn).style.display = 'none'
    },

    getSelectors: function() {
      return UISelectors
    }
  }
})();
// End UICtrl ------------------------------------------------------------------------------------------------

// App Controller --------------------------------------------------------------------------------------------
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
  // Load event listeners
  const loadEventListeners = function() {
    // Get UI selectors
    const UISelectors = UICtrl.getSelectors()

    // Add item event
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)

    // Disable submit on enter
    document.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault()
        return false
      }
    })

    // Edit icon clik event
    document.querySelector(UISelectors.itemList).addEventListener('click', itemeditClick)

    // Update item event
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemeUpdateSubmit)

    // Delete item event
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit)

    // Back Button Event
    document.querySelector(UISelectors.backBtn).addEventListener('click', function(e) {
      UICtrl.clearEditState()
      e.preventDefault()
    })

    // Clear items event
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick)
  }

  // Add item submit
  const itemAddSubmit = function(e) {
    e.preventDefault()
    
    // Get form input from UI Controller
    const input = UICtrl.getItemInput()

    // Check for name and calories input
    if (input.name !== '' && input.calories !== '') {
      // Add Item
      const newItem = ItemCtrl.addItem(input)
      // Add item to UI List
      UICtrl.addListItem(newItem)

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories()

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories)

      // Store in local storage
      StorageCtrl.storeItem(newItem)

      // Clear fields
      UICtrl.clearFields()
    }
  }

  // Edit click
  const itemeditClick = function(e) {
    if(e.target.classList.contains('edit-item')) {
      const listId = e.target.parentNode.parentNode.id

      // Break into array
      const listIdArr = listId.split('-')

      // Get the actual id
      const id = parseInt(listIdArr[1])

      // Get Item
      const itemtoEdit = ItemCtrl.getItemById(id)

      // Set current item
      ItemCtrl.setCurrentItem(itemtoEdit)

      // Add item to form
      UICtrl.addItemToForm()
    }

    e.preventDefault()
  }

  // Update item submit
  const itemeUpdateSubmit = function(e) {
    // Get item input
    const input = UICtrl.getItemInput()

    // Update Item
    const updateItem = ItemCtrl.updateItem(input.name, input.calories)

    // Update UI
    UICtrl.updateListItem(updateItem)

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories()

    // Add total calories to UI
    UICtrl.showTotalCalories(totalCalories)

    UICtrl.clearEditState()

    e.preventDefault()
  }

  // Delete button event
  const itemDeleteSubmit = function(e) {
    // Get current item
    const currentItem = ItemCtrl.getCurrentItem()

    // delete from item controler
    ItemCtrl.deleteItem(currentItem)

    // Delete from UI
    UICtrl.delteItemFromList(currentItem.id)

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories()

    // Add total calories
    UICtrl.showTotalCalories(totalCalories)

    UICtrl.clearEditState()

    e.preventDefault()
  }

  // Clear items event
  const clearAllItemsClick = function(e) {
    // Delete all items from data structure
    ItemCtrl.clearAllItems()

    // Remove from UI
    UICtrl.clearItems()

    // Get total calories
    const totalCalories = ItemCtrl.getTotalCalories()

    // Add total calories
    UICtrl.showTotalCalories(totalCalories)

    e.preventDefault()     
  } 

  // Public Methods
  return {
    init: function() {  
      // EDIT State
      UICtrl.clearEditState()
       
      // Fetch items
      const items = ItemCtrl.getItems()

      // Check if any items
      if (items.length === 0) {
        UICtrl.hideList()
      } else {
        // Populate lits with items
        UICtrl.populateItemList(items)
      }

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories()

      // Add total calories to UI
      UICtrl.showTotalCalories(totalCalories)

      // Load event listeners
      loadEventListeners()
    }
  }
})(ItemCtrl, StorageCtrl, UICtrl);

// Initialize App
App.init()