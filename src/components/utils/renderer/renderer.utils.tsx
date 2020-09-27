import * as React from "react";
import ReactDOMServer from "react-dom/server";
import pretty from "pretty";

export const RendererModule = async () => ({
  render: async (code: string, props: any) => {
    const cf = new Function(
      "props",
      "React",
      `${code}; return Component(props)`,
    );

    const Component = (props: any) => cf(props, React);

    return String(pretty(
      ReactDOMServer.renderToString(
        <Component {...props} />,
      ),
      { ocd: true },
    )).toString();
  },
});
