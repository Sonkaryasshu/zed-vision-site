//@ts-ignore
import { Sha256Worker } from "workerize-loader!./sha256/sha256.worker.js";

const sha256Worker = typeof window === "object" && Sha256Worker;

export const hash = async (str: string | object) => {
  const moduleW = sha256Worker;
  if (!moduleW) {
    console.log("no module no transform");
    return;
  }

  const store = await moduleW();

  return store.hash(str);
};

export const unHash = async (hash: string) => {
  const moduleW = sha256Worker;
  if (!moduleW) {
    console.log("no module no transform");
    return;
  }

  const store = await moduleW();

  return store.unHash(hash);
};
