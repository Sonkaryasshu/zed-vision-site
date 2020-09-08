const registerSW = async () => {
  try {
    const worker = new Worker("sha256.worker.js", { type: "module" })
    worker.postMessage("Yooo")

    worker.onmessage = m => console.log(m)

    console.log("waiting to be ready")
    //  await navigator.serviceWorker.ready
    console.log("registering now")
    const reg = await navigator.serviceWorker.register("/sw.js", {
      updateViaCache: "imports",
      scope: "/",
    })

    console.log("Registration succeeded. Scope is " + reg.scope)
  } catch (error) {
    console.log("Registration failed with " + error)
  }
}

if ("serviceWorker" in navigator) {
  console.log("adding event listener for lad")
  window.addEventListener("load", () => registerSW())
}
