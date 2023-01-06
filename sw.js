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
          '/js/project-cost.js',
          '/images/it-magic.webp',
          '/images/it-magic.png',
          '/images/logo-14.webp',
          '/images/logo-14.png',
          '/images/A-xl.webp',
          '/images/A-xl.jpg',
          '/images/A-main-sm.webp',
          '/images/A-main-sm.jpg',
          '/images/panel-simple-sm.png',
          '/images/panel-simple-sm.webp',
          '/images/panel-simple.png',
          '/images/panel-simple.webp',
          '/images/B1.webp',
          '/images/B1.png',
          '/images/A5-sm.png',
          '/images/A5-sm.webp',
          '/images/A5.png',
          '/images/A5.webp'
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
