importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-sw.js"
)

const { CacheFirst, StaleWhileRevalidate } = workbox.strategies
const { ExpirationPlugin } = workbox.expiration
const { registerRoute } = workbox.routing
// const { precacheAndRoute } = workbox.precaching
// The plugin will pass the files to cache here
// workbox.precaching.precacheAndRoute([])

registerRoute(
  ({ url }) => {
    return (
      url.length - url.lastIndexOf("/") > 16 &&
      (url.endsWidth(".js") || url.lastIndexOf(".js?"))
    )
  },
  new CacheFirst({
    cacheName: "hashed js files",
    plugins: [new ExpirationPlugin({ maxEntries: 100 })],
  })
)

registerRoute(
  ({ url }) =>
    url.origin === "https://fonts.googleapis.com" ||
    url.origin === "https://fonts.gstatic.com",
  new StaleWhileRevalidate({
    cacheName: "google-fonts",
    plugins: [new ExpirationPlugin({ maxEntries: 100 })],
  })
)

registerRoute(
  ({ request }) => request.destination === "image",
  new CacheFirst({
    cacheName: "images",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
)

registerRoute(
  ({ request }) =>
    request.destination === "script" || request.destination === "style",
  new StaleWhileRevalidate({
    cacheName: "static-resources",
  })
)
