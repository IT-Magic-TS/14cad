class Product {
  // title = 'DEFAULT'
  // imageUrl
  // description
  // price

  constructor(title, image, price, desc) {
    this.title = title
    this.imageUrl = image
    this.price = price
    this.description = desc
  }
}

class ShoppingCart {
  items = []

  addProduct(product) {
    this.items.push(product)
    this.totalOutput.innerHTML = ` <h2 class="text-3xl font-bold text-yellow-200">Total: $1</h2>`
  }

  render() {
    const cartEl = document.getElementById('cart-container')
    cartEl.innerHTML = `
      <h2 class="text-3xl font-bold text-yellow-200">Total: $0</h2>
      <button 
        class="px-4 py-2 mt-3 text-lg font-semibold text-gray-800 bg-white border-2 border-white rounded-md hover:bg-slate-400"
      >Order Now!</button>   
    `
    this.totalOutput = cartEl.querySelector('h2')
    return cartEl
  }
}

class ProductItem {
  constructor(product) {
    this.product = product
  }

  addToCart() {
    App.addProductToCart(this.product)
  }

  render() {
    const divEl = document.createElement('div')
    divEl.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'max-w-md', 'p-2', 'm-2', 'mx-auto', 'border-2', 'border-blue-100', 'rounded-md', 'shadow-md', 'gap-y-3')
    divEl.innerHTML = `
      <img 
        src="${this.product.imageUrl}" 
        alt="${this.product.title}" 
        class="object-cover w-full h-48"
      >
      <h2 class="text-2xl font-semibold text-gray-800">${this.product.title}</h2>
      <div class="text-lg text-gray-600">Price: <span class="font-bold">\$${this.product.price}</span></div>
      <div class="text-gray-700">${this.product.description}</div>
      <button 
        class="px-4 py-2 font-bold border-4 bg-amber-300 border-amber-300 hover:bg-white"
      >Add to Basket</button>
    `

    const addCartBtn = divEl.querySelector('button')

    addCartBtn.addEventListener('click', this.addToCart.bind(this))

    return divEl
  }
}

class ProductList {
  products = [
    new Product(
      'Scroll Panel',
      'https://i.etsystatic.com/30908689/r/il/ed0f20/3210335752/il_794xN.3210335752_km9m.jpg',
      2.54,
      'This is digital artwork ready for instant download and ready to be used on projects in software such as AutoCAD'
    ),
    new Product(
      'Panel M29',
      'https://i.etsystatic.com/30908689/r/il/aafd3b/3212165404/il_794xN.3212165404_le7p.jpg',
      7.22,
      'Watermark will not be on the downloadable files.'
    )
  ]

  constructor() {}

  render() {
    const renderHook = document.getElementById('app')
    const innerContainer = document.createElement('div')
    for (const prod of this.products) {
      const productItem = new ProductItem(prod)
      const prodEl = productItem.render()
      innerContainer.append(prodEl)
    }
    renderHook.append(innerContainer)
  }
}

class Shop {
  render() {
    this.cart = new ShoppingCart()
    this.cart.render()
    const productList = new ProductList()
    productList.render()
  }
}

class App {
  static cart
  
  static init() {
    const shop = new Shop()
    shop.render() 
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product)
  }
}

App.init()