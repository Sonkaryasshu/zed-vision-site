import { TransformWorker } from "./babel/babel.worker";

import { hash, unHash } from "./sha";
const transformW = typeof window === "object" && TransformWorker;

export const transform = async (codeHash: string) => {
  if (typeof window === "undefined") return;

  const code = await unHash(codeHash);

  try {
    if (!transformW) {
      console.log("no module no transform");
      return;
    }
    const transFormedCode = transformW().transform(code);
    console.log("TRANSFORMED: ", transFormedCode);
    const transformedCodeHash = await hash(transFormedCode);
    return transformedCodeHash;
  } catch (e) {
    console.log("Some babel error", e);
    
  }
};
