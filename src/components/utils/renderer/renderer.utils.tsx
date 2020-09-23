import React from "react";
import ReactDOMServer from "react-dom/server";

export const RendererModule = async () => ({
  render: async (code: string, pastEvents: any[]) => {
    console.log(React, ReactDOMServer);

    const cc = new Function(
      "props",
      "React",
      `return (${code})(props)`,
    );
    const Component = (props: any) => cc(props, React);

    return ReactDOMServer.renderToString(
      React.createElement(Component, { pastEvents }),
    );
  },
});
