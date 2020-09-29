self.importScripts("https://cdn.jsdelivr.net/npm/@ampproject/worker-dom@0.27.3/dist/worker/worker.js");
import * as React from "react";
import ReactDOMServer from "react-dom/server";


export async function renderWorker (code: string, props: any){
 
    const componentFactory = new Function(
      "props",
      "React",
      `try{${code}; return Counter(props)}catch(e){console.log(e); return ()=>React.createElement("div", null, "Error in render")}`,
    );

    const Counter = (props: any) => componentFactory(props, React);

    return String(ReactDOMServer.renderToString( React.createElement(Counter, props))).toString();
  
};
