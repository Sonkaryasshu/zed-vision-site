import { Sha256Worker } from "./sha256/sha256.worker";
import { Sha256 } from "./sha256/sha256.utils";

const sha256W = ((typeof window !== "undefined") && Sha256Worker) || Sha256;

let loadedModule: any;

export const { hash, unHash } = {
  hash: async (str: string | object) => {
    if (!loadedModule) {
      loadedModule = await sha256W();
    }
    return loadedModule.hash(str);
  },
  unHash: async (hash: string) => {
    if (!loadedModule) {
      loadedModule = await sha256W();
    }
    return loadedModule.unHash(hash);
  },
};
