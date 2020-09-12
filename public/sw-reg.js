const registerSW = async () => {
  try {
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
