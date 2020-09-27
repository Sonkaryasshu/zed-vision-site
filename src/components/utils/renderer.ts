import { RendererWorker } from "./renderer/renderer.worker";
import { RendererModule } from "./renderer/renderer.utils";
import { hash, unHash } from "./sha";

const rendererW = ((typeof window !== "undefined") && RendererWorker) ||
  RendererModule;

let loadedModule: any;

export const render = async (
  transformedCodeHash: string,
  defaultStateHash: string,
) => {
  if (!loadedModule) {
    loadedModule = await rendererW();
  }

  const code = await unHash(transformedCodeHash);
  const defaultState = await unHash(defaultStateHash);

  const renderedString = await loadedModule.render(code, defaultState);
  const renderedStringHash = await hash(renderedString);
  return renderedStringHash;
};
