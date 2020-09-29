import * as RendererWorker from "./renderer/renderer.worker";

import { hash, unHash } from "./sha";

const { renderWorker } = ((typeof window !== "undefined") &&
  (RendererWorker as any)()) as typeof RendererWorker;

export const render = async (
  transformedCodeHash: string,
  defaultPropsHash: string,
) => {
  try {
    console.log(transformedCodeHash, defaultPropsHash);
    const code = await unHash(transformedCodeHash);
    const defaultProps = await unHash(defaultPropsHash);

    const renderedString = await renderWorker(code, defaultProps);
    const renderedStringHash = await hash(renderedString);

    return renderedStringHash;
  } catch (e) {
    return "error in rendering";
  }
};
