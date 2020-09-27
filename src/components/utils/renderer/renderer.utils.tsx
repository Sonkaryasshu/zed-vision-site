import * as React from "react";
import ReactDOMServer from "react-dom/server";

export const RendererModule = async () => ({
  render: async (code: string, defaultState: any[]) => {
    // console.log(React, ReactDOMServer);

    const cc = new Function(
      "props",
      "React",
      `${code}; return Component(props)`,
    );
    const Component = (props: any) => cc(props, React);

    return ReactDOMServer.renderToString(
      React.createElement(Component, { defaultState }),
    );
  },
});
