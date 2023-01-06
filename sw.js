self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installing Service Worker...', event)
  event.waitUntil(
    caches.open('static')
      .then(function(cache) {
        console.log('[Service Worker] Precaching App Shell...')
        cache.addAll([
          '/',
          '/index.html',
          '/icons/favicon.png',
          '/css/style.css',
          '/js/promise.js',
          '/js/fetch.js',
          '/js/script.js',
          '/js/calculations.js',
          '/js/project-cost.js'
        ])
        // cache.add('/')
        // cache.add('/index.html')
      })
    )
})

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker...', event)
  return self.clients.claim()
})

self.addEventListener('fetch', function(event) {
  // console.log('[Service Worker] Fetching Something...', event)
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          console.log(response)
          return response
        } else {
          console.log(event.request)
          return fetch(event.request)
        }
      })
  )
})
