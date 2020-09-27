import * as React from "react";
import ReactDOMServer from "react-dom/server";

export const RendererModule = async () => ({
  render: async (code: string, props: any) => {
    const cf = new Function(
      "props",
      "React",
      `${code}; return Component(props)`,
    );

    const Component = (props: any) => cf(props, React);

    return ReactDOMServer.renderToString(
      <Component {...props} />,
    );
  },
});
