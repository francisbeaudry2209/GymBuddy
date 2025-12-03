self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open("gymbuddy-cache").then((cache) =>
      cache.match(event.request).then((response) =>
        response ||
        fetch(event.request).then((fetched) => {
          cache.put(event.request, fetched.clone());
          return fetched;
        })
      )
    )
  );
});