import * as React from "react";
import ReactDOMServer from "react-dom/server";
// import pretty from "pretty";

export const RendererModule = async () => ({
  render: async (code: string, props: any) => {
    const componentFactory = new Function(
      "props",
      "React",
      `try{${code}; return Counter(props)}catch(e){console.log(e); return ()=>React.createElement("div", null, "Error in render")}`,
    );

    const Counter = (props: any) => componentFactory(props, React);

    return String(
      ReactDOMServer.renderToString(
        <Counter {...props} />,
      ),
    ).toString();
  },
});
