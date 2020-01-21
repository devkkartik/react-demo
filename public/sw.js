if ("function" === typeof importScripts) {
  importScripts(
    "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
  );
  /* global workbox */
  if (workbox) {
    console.log("Workbox is loaded");

    workbox.core.skipWaiting();
    workbox.core.clientsClaim();

    /* injection point for manifest files.  */
    workbox.precaching.precacheAndRoute([
      {
        revision: "73678227e48cb907a41503f2232ad54f",
        url: "index.html"
      },
      {
        revision: "2da9e0b5c44e47da3520",
        url: "/static/css/main.chunk.css"
      },
      {
        revision: "5d1669cf14ece9958bfa",
        url: "/static/js/bundle.js"
      },
      {
        revision: "2da9e0b5c44e47da3520",
        url: "/static/js/1.chunk.js"
      },
      {
        revision: "2da9e0b5c44e47da3520",
        url: "/static/js/0.chunk.js"
      },
      {
        revision: "5d1669cf14ece9958bfa",
        url: "/static/js/main.chunk.js"
      },
      {
        revision: "0a942f53ff1d4a5f5724",
        url: "/static/js/main.7a2c426da5c9db7118cb.hot-update.js"
      }
      // ,
      // {
      //   revision: "0a942f53ff1d4a5f5724",
      //   url:
      //     "https://europe-west2-sandbox-253814.cloudfunctions.net/api/getCartItems"
      // }
    ]);

    /* custom cache rules*/
    workbox.routing.registerNavigationRoute(
      workbox.precaching.getCacheKeyForURL("/index.html"),
      {
        blacklist: [/^\/_/, /\/[^\/?]+\.[^\/]+$/]
      }
    );

    workbox.routing.registerRoute(
      new RegExp("\\.(?:ico|png|gif|jpg|jpeg)$"),
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

    workbox.routing.registerRoute(
      "https://europe-west2-sandbox-253814.cloudfunctions.net/api/getCartItems",
      new workbox.strategies.NetworkFirst({
        networkTimeoutSeconds: 3
      })
    );

    // self.addEventListener("fetch", event => {
    //   if (event.request.url.endsWith("/getCartItems")) {
    //     // Oops! This causes workbox-strategies.js to be imported inside a fetch handler,
    //     // outside of the initial, synchronous service worker execution.
    //     const cacheFirst = new workbox.strategies.NetworkFirst(); //CacheFirst();
    //     event.respondWith(cacheFirst.makeRequest({ request: event.request }));
    //   }
    // });
  } else {
    console.log("Workbox could not be loaded. No Offline support");
  }
}
