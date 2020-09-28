//@ts-ignore
import { Sha256Worker } from "workerize-loader!./sha256/sha256.worker";

const sha256W = typeof window !== "undefined" && Sha256Worker;

let loadedModule: any = null;

export const { hash, unHash } = {
  hash: async (str: string | object) => {
    if (!loadedModule) {
      loadedModule = await sha256W;
    }
    return (await sha256W).hash(str);
  },
  unHash: async (hash: string) => {
    if (!loadedModule) {
      loadedModule = await sha256W  ;
    }
    return (await sha256W).unHash(hash);
  },
};
