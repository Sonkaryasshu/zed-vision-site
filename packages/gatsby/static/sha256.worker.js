const cache = new WeakMap()

const hashTable = {}

onconnect = function (e) {
  var port = e.ports[0]

  // if (!cache.has({ data: message.data })) {

  const onMessage = async message => {
    const msg = message.data

    if (msg.id) {
      const data =
        typeof msg.data === "string"
          ? msg.data
          : typeof msg.data === "object"
          ? JSON.stringify(msg.data)
          : String(msg.data)
      const hash = await sha256(data)

      const shorterHash = shortener(hash)

      hashTable[shorterHash] = msg.data

      port.postMessage({
        hash: shorterHash,
        id: msg.id,
      })
    } else if (msg.hash) {
      port.postMessage({
        data: hashTable[msg.hash],
        hash: msg.hash,
      })
    }
  }

  port.addEventListener("message", onMessage)

  port.start() // Required when using addEventListener. Otherwise called implicitly by onmessage setter.
}

function shortener(hash) {
  for (let i = 1; i < 64; i++) {
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

async function sign(message) {
  const msgBuffer = new TextEncoder("utf-8").encode(message)

  const key = await crypto.subtle.importKey(
    "raw", // raw format of the key - should be Uint8Array
    enc.encode("mysecretkey"),
    {
      // algorithm details
      name: "HMAC",
      hash: { name: "SHA-256" },
    },
    false, // export = false
    ["sign", "verify"] // what the key can do'
  )

  const hashBuffer = await crypto.subtle.sign("SHA-256", key, msgBuffer)

  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // convert bytes to hex string
  const signHex = hashArray.map(b => ("00" + b.toString(16)).slice(-2)).join("")
  return signHex
}
