import * as React from "react";
import { Props, getComponent } from "./zoli";

// export function MyComponent() {
//   // Parent variants
//   const list = {
//     hidden: { opacity: 0, x: -100 },
//     visible: { opacity: 1, x: 0 },
//   };
//   // Child variants
//   const item = {
//     hidden: { opacity: 0, scale: 0.5 },
//     visible: { opacity: 1, scale: 1 },
//   };
//   return (
//     <Frame
//       variants={list}
//       initial="hidden"
//       animate="visible"
//     >
//       <Frame variants={item} />
//       <Frame variants={item} />
//       <Frame variants={item} />
//     </Frame>
//   );
// }
export const Wrapper: React.FC<
  {
    code: string;
    message?: string;
    renderHash?: string;
    innerHTML: string;
    defaultProps: Props;
  }
> = (
  {
    code,
    innerHTML,
    renderHash,
    message,
    defaultProps,
  },
) => {
  if (!code || !renderHash) {
    return <div>Loading</div>;
  }

  const Component = getComponent(code, defaultProps);

  return <div>
    {Component && <Component
      {...defaultProps}
    />}
    <pre>{message}</pre>
  </div>;
};
