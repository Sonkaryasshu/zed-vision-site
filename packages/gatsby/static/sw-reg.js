"use strict"

const registerSW = async () => {
  try {
    await navigator.serviceWorker.ready
    await navigator.serviceWorker.register("/sw.js", {
      updateViaCache: "imports",
      scope: "/",
    })
    console.log("Registration succeeded. Scope is " + reg.scope)
  } catch (error) {
    console.log("Registration failed with " + error)
  }
}

if ("serviceWorker" in navigator) {
  registerSW()
}
