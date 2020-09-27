import { TransformWorker } from "./babel/babel.worker";
import { TransformModule } from "./babel/babel.utils";
import { hash, unHash } from "./sha";
const transformW = ((typeof window !== "undefined") && TransformWorker) ||
  TransformModule;

let loadedModule: any;

export const transform = async (codeHash: string) => {
  if (!loadedModule) {
    loadedModule = await transformW();
  }
  const code = await unHash(codeHash);
  try {
    const transFormedCode = await loadedModule.transform(code);
    const transformedCodeHash = await hash(transFormedCode);
    return transformedCodeHash;
  } catch (e) {
    console.log("Some babel error", e);
  }
};
