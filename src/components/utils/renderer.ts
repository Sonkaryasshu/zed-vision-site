import { RendererWorker } from "./renderer/renderer.worker";
import { RendererModule } from "./renderer/renderer.utils";
import { hash, unHash } from "./sha";

const rendererW = ((typeof window !== "undefined") && RendererWorker) ||
  RendererModule;

let loadedModule: any;

export const render = async (
  transformedCodeHash: string,
  defaultPropsHash: string,
) => {
  if (!loadedModule) {
    loadedModule = await rendererW();
  }

  try {
    const code = await unHash(transformedCodeHash);
    const defaultProps = await unHash(defaultPropsHash);

    const renderedString = await loadedModule.render(code, defaultProps);
    const renderedStringHash = await hash(renderedString);

    return renderedStringHash;
  } catch (e) {
    console.log("Error in render", e);
    return "error in rendering";
  }
};
