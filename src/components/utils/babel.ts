import * as WorkerBabelTransformer from "./babel/babel.worker";

const { WorkerTransform } =
  ((typeof window !== "undefined") &&
    (WorkerBabelTransformer as any)()) as typeof WorkerBabelTransformer;

import { hash, unHash } from "./sha";

export const transform = async (codeHash: string) => {
  const code = await unHash(codeHash);

  try {
    const transFormedCode = await WorkerTransform(code);
    console.log("TRANSFORMED: ", transFormedCode);
    const transformedCodeHash = await hash(transFormedCode);
    return transformedCodeHash;
  } catch (e) {
    console.log("Some babel error", e);
    return "Error in babel";
  }
};
