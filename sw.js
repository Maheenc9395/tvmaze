// load the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }, function(error) {
      console.log('Service Worker registration failed:', error);
    });
  });
}                    
 

// Define cache names
const CACHE_NAME = 'my-app-cache-v3';
const DYNAMIC_CACHE_NAME = 'my-app-dynamic-cache-v3';

// Files to cache during install
const STATIC_ASSETS = [
'/', 
'/index.html',
'/style.css',
'/apiexample.js',
'/manifest.json',
'/icons.json',
'/android',
'/icons',
'/tv.png',
'/icons/icon512_rounded.png',
'/icons/icon512_maskable.png',
'/Screenshots/Screenshot.png',
'/Screenshots/Screenshot1.png',
'/Screenshots/Screenshot2.png',

// Add other static files you want to cache
];

// Install event: Cache static assets
self.addEventListener('install', event => {
event.waitUntil(
  caches.open(CACHE_NAME).then(cache => {
    console.log('Opened cache');
    return cache.addAll(STATIC_ASSETS);
  })
);
});

// Activate event: Clean up old caches
self.addEventListener('activate', event => {
event.waitUntil(
  caches.keys().then(cacheNames => {
    return Promise.all(
      cacheNames.map(cache => {
        if (cache !== CACHE_NAME && cache !== DYNAMIC_CACHE_NAME) {
          console.log('Deleting old cache:', cache);
          return caches.delete(cache);
        }
      })
    );
  })
);
});

// Fetch event: Network-first strategy
self.addEventListener('fetch', event => {
event.respondWith(
  fetch(event.request)
    .then(networkResponse => {
      // If network fetch is successful, cache the response
      return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      });
    })
    .catch(() => {
      // If network fetch fails, fallback to cache
      return caches.match(event.request);
    })
);
});

