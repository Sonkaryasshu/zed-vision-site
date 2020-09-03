importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js"
)

const { CacheFirst, StaleWhileRevalidate } = workbox.strategies
const { ExpirationPlugin } = workbox.expiration
const { registerRoute } = workbox.routing
const { precacheAndRoute } = workbox.precaching
// The plugin will pass the files to cache here
workbox.precaching.precacheAndRoute([
  {
    "url": "webpack-runtime-5421247ffbb7117344cc.js",
    "revision": "a4a50adfab66fa52c32beed39305b1bd"
  },
  {
    "url": "framework-e99f29961a9a2bb87806.js",
    "revision": "8768dad65873c85eb7afdddd2fcc9269"
  },
  {
    "url": "app-30df504f3775e36def23.js",
    "revision": "c2aba3747b2d65c4a62bca1deb4ec4f3"
  },
  {
    "url": "index.html",
    "revision": "8b87cf9ca7b2ab769d6ce24c0a73b2be"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "3478e7141291def517eae654aec73670"
  },
  {
    "url": "styles.233c9062b20f3955a773.css",
    "revision": "b5abf53d4e57815312512f8103bf0499"
  },
  {
    "url": "styles-2d82ac8e3afc0c213061.js",
    "revision": "69b448910449c176093e31b420120873"
  },
  {
    "url": "09744744-1d74a476168a54f2e35c.js",
    "revision": "4495c6d18a3edb425c9a346c4d0222e4"
  },
  {
    "url": "commons-0584b9a824f5061ba17d.js",
    "revision": "0ff8b632054e26080d95c620d5b68d0f"
  },
  {
    "url": "022d3153bf09c36cd784dcdb36ffbd187f9c96d7-7b4653bbef1ea41283cf.js",
    "revision": "b7ad297d6d679d25410881bf5881f54b"
  },
  {
    "url": "component---src-pages-index-tsx-c0cdb13c29f8a8ad274b.js",
    "revision": "ceb1d7b501384ee353c7c2614d5bfc4d"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "142fdd5fab2a92c54020a62bdb8d0b03"
  },
  {
    "url": "page-data/sq/d/1809740707.json",
    "revision": "19298ee0085fdaa61f01f4c7700379aa"
  },
  {
    "url": "page-data/sq/d/2841359383.json",
    "revision": "e8d382ecdab48bf580261fbad8ef7f16"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "9dc5231634199a1bcf8b743a2e1bd549"
  },
  {
    "url": "polyfill-978084d0f22dc1e80173.js",
    "revision": "11b7a9a3ba67b5e63ccb2091e1bb3674"
  },
  {
    "url": "component---src-pages-404-tsx-e18825b5a3f12ea84772.js",
    "revision": "fa110ee82f4dbef201df874f3e8a9890"
  },
  {
    "url": "page-data/404.html/page-data.json",
    "revision": "8c50ee418116a716b0894feba1de3618"
  },
  {
    "url": "component---src-pages-offline-plugin-app-shell-fallback-tsx-4f7be29b4c709ebee006.js",
    "revision": "c1100be0d6beab039e6b10979afa1755"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "f69c50bd4f12f29e823ec359189b8057"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "f8a18ddf8edfe47267ccf7f37ad8c568"
  }
])

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
