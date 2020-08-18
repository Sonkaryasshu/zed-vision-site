const load = async () => {
    if (!localStorage.getItem("uuid")) {
      const { v4 } = await import("https://jspm.dev/uuid");
      localStorage.setItem("uuid", v4());
    }
  
    const uuid = localStorage.getItem("uuid");
    console.log("uud", uuid);
  
  
    const reload = async() =>{  
      const url = isLocalhost()? "/":`https://raw.githubusercontent.com/zed-vision/mostly-deno/master/`;
      const filename = await fetch(`${url}.sha256/zed.js`)
      
      const clientID = await filename.text();
  
      if (!localStorage.getItem(clientID)) {
          const resp = await fetch(`${url}.sha256/${clientID}.js`);
          const response = await resp.text();
          localStorage.setItem("zed-app", response);
      }
    }
  
    if (!localStorage.getItem("zed-app")) {
      await reload();
    }
    else {
      reload();
    }
  
    const App = localStorage.getItem("zed-app");
  
    window.URL = window.URL || window.webkitURL;
  
    // "Server response", used in all examples
  
    var blob;
    try {
      blob = new Blob([App], { type: "application/javascript" });
    } catch (e) { // Backwards-compatibility
      window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder ||
        window.MozBlobBuilder;
      blob = new BlobBuilder();
      blob.append(App);
      blob = blob.getBlob();
    }
    var worker = new Worker(URL.createObjectURL(blob), { type: "module" });
  
    const root = document.getElementById("root");
  
    worker.postMessage({ uuid });
  
    // Test, used in all examples:
    worker.onmessage = function (e) {
      root.innerHTML = e.data.html;
    };
  };
  
  load();
  
  function isLocalhost(params) {
    if (
      location.hostname === "localhost" || location.hostname === "127.0.0.1" ||
      location.hostname === "0.0.0.0"
    ) {
      return true;
    }
    return false;
  }
  