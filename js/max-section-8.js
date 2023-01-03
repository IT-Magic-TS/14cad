// const prices = [1, 5.3, 1.5, 10.99, -5, 10, 1.5, 34.98]

// const sum = prices.reduce((prev, cur) => prev + cur, 0)

const addBtn = document.getElementById('btn-add')
const searchBtn = document.getElementById('btn-search')

const movies = []

const renderMovies = () => {
  const movieLiest = document.getElementById('movie-list')
  const movieContainer = document.getElementById('render-container')

  movies.length === 0 ? movieContainer.classList.add('hidden') : movieContainer.classList.remove('hidden')

  movieLiest.innerHTML = ''

  movies.forEach((movie, id) => {
    movieLiest.innerHTML += `
      <div class="text-xl text-gray-700 ml-10"><span>${id + 1}. </span>${movie.info.title}</div>
    `
  })
  console.log(movieLiest)
}

const addMovie = () => {
  const title = document.getElementById('title').value
  const extraName = document.getElementById('e-name').value
  const extraInformation = document.getElementById('e-information').value

  const newMovie = {
    info: {
      title, extraName, extraInformation
    },
    id: Math.random()
  }

  movies.push(newMovie)

  renderMovies()
  
  console.log(movies)
}

addBtn.addEventListener('click', addMovie)

renderMovies()
          
    