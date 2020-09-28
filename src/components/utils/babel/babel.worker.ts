import { transform } from "@babel/standalone";

export async function WorkerTransform(code: string){
    return transform(code, {
      plugins: [],
      presets: ["react", ["typescript", { isTSX: true, allExtensions: true }]],
    }).code;
  }
