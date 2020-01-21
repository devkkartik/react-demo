if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
  );

  /* Global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    /* Injection point for manifest files */
    workbox.precaching.precacheAndRoute([]);

    /* Custom cache rules */
    workbox.routing.registerNavigationRoute(
      workbox.precaching.getCacheKeyForURL("/index.html"),
      {
        blacklist: [/^\/_/, /\/[^\/]+\.[^\/]+$/]
      }
    );

    /* Create API cache */
    workbox.routing.registerRoute(
      "https://europe-west2-sandbox-253814.cloudfunctions.net/api/getCartItems",
      new workbox.strategies.StaleWhileRevalidate({
        networkTimeoutSeconds: 3
      })
    );

    /* Create image cache */
    workbox.routing.registerRoute(
      new RegExp("\\.(?:png|gif|jpg|jpeg)$"),
      new workbox.strategies.CacheFirst({
        cacheName: "images",
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 60,
            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
          })
        ]
      })
    );
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
