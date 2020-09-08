const cache = new WeakMap()

onmessage = async message => {
  if (!cache.has({ data: message.data })) {
    const hash = await sha256(String(message.data))
    const shorterHash = hash
    cache.set({ data: message.data }, shorterHash)
    postMessage({
      hash: shorterHash,
      data: message.data,
    })
    // LocalStorage.setItem(hash, JSON.stringify(message))
  } else
    postMessage({
      hash: cache.get({ data: message.data }),
      data: message.data,
    })
}

const hashTable = {}

function shortener(hash) {
  for (let i = 3; i < 60; i++) {
    const shorterHash = hash.substr(0, i)
    if (hashTable[shorterHash] === undefined) {
      hashTable[shorterHash] = hash
      return shorterHash
    }
    if (hashTable[shorterHash] === hash) return shorterHash
  }
  return hash
}

// const arr = new Array(100000000)

// const fill = async () => {
//   let prev = ""
//   for (let t = 0; t < 1000; t++) {
//     arr.push(getRandomInt(7))
//   }

//   arr
//     .filter(n => n > 0 && n < 10)
//     .forEach(async element => {
//       const hash = await sha256(String(prev + String(element)))
//       this.element = hash
//       prev = shortener(hash)
//       console.log(prev, element)
//     })

//   console.log("we f22elt out: ", prev)
// }

// function getRandomInt(max) {
//   return Math.floor(Math.random() * Math.floor(max))
// }

// setInterval(() => fill(), 1000)

async function sha256(message) {
  const msgBuffer = new TextEncoder("utf-8").encode(message)

  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)

  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // convert bytes to hex string
  const hashHex = hashArray.map(b => ("00" + b.toString(16)).slice(-2)).join("")
  return hashHex
}
