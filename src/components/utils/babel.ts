//@ts-ignore
import { TransformWorker } from "workerize-loader!./babel/babel.worker.js";

import { hash, unHash } from "./sha";
const transformW = typeof window === "object" && TransformWorker;

export const transform = async (codeHash: string) => {
  if (typeof window === "undefined") return;

  const code = await unHash(codeHash);

  try {
    const moduleW = transformW;
    if (!moduleW) {
      console.log("no module no transform");
      return;
    }
    const transFormedCode = await (await moduleW()).transform(code);
    console.log("TRANSFORMED: ", transFormedCode);
    const transformedCodeHash = await hash(transFormedCode);
    return transformedCodeHash;
  } catch (e) {
    console.log("Some babel error", e);
  }
};
