const CACHE_NAME = "plantcheck-v1";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./apple-touch-icon.png",
  "./logo-placeholder.png.png",
  "./excavator.jpg",
  "./dumper.jpg",
  "./roller.jpg",
  "./telehandler.jpg",
  "./adt.jpg",
  "./shovel-loader.jpg",
  "./mobile-crane.jpg",
  "./petrol-cut-off-saw.jpg",
  "./generator.jpg",
  "./cat-genny.jpg",
  "./mewp.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("Caching app assets");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});