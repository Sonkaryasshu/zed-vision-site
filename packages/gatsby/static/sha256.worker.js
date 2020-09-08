const cache = new WeakMap()

onmessage = async message => {
  if (!cache.has({ data: message.data })) {
    const hash = await sha256(String(message.data))
    cache.set({ data: message.data }, hash)
    postMessage({
      hash: hash,
      data: message.data,
    })
    // LocalStorage.setItem(hash, JSON.stringify(message))
  } else
    postMessage({
      hash: cache.get({ data: message.data }),
      data: message.data,
    })
}

async function sha256(message) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder("utf-8").encode(message)

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // convert bytes to hex string
  const hashHex = hashArray.map(b => ("00" + b.toString(16)).slice(-2)).join("")
  return hashHex
}
