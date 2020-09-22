import { RendererWorker } from "./renderer/renderer.worker";
import { RendererModule} from "./renderer/renderer.utils";
import {hash, unHash} from "./sha";

const rendererW = ((typeof window !== undefined) && RendererWorker) || RendererModule;

let loadedModule: any;


export const render = async (transformedCodeHash: string, pastEventsHash: string) => {
    if (!loadedModule) {
      loadedModule = await rendererW();
    }
    console.log("RENDER it");
    const code = await unHash(transformedCodeHash);
    const pastEvents = await unHash(pastEventsHash);

    const renderedString = await loadedModule.render(code, pastEvents);
    const renderedStringHash = await hash(renderedString);
    return renderedStringHash;
};
