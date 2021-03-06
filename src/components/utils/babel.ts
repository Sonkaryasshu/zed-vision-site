import { unHash, hash } from "./sha";

const cache = {};

const worker = (typeof window !== "undefined")
  ? new Worker(URL.createObjectURL(
    new window.Blob(
      [`
importScripts('https://unpkg.com/@babel/standalone@7.11.6/babel.min.js');

self.onmessage=(message)=>{

try{
  const translatedMessage = Babel.transform(message.data.code, {
plugins: [],
presets: ["react", ["typescript", { isTSX: true, allExtensions: true }]],
}).code.replace("export const", "const").replace("import ", "//import");

    postMessage({hash: message.data.hash, translatedCode: translatedMessage})
} catch(e){
  postMessage({hash: message.data.hash, translatedCode: "error", error: e})
}

}
`],
      { type: "application/javascript" },
    ),
  ))
  : { onmessage: () => {}, postMessage: () => {} };

worker.onmessage = async (message: any) => {
  const codeHash = message.data.hash;
  if (typeof cache[codeHash] === "string") return;
  if (typeof cache[codeHash] === "object") {
    if (message.data.error) {
      const errorHash = await hash(message.data.error);
      cache[codeHash].reject(errorHash);
      cache[codeHash] = { error: errorHash };
      return;
    }
    const transformedCodeHash = await hash(message.data.translatedCode);
    cache[codeHash].resolve(transformedCodeHash);
    cache[codeHash] = transformedCodeHash;
  }
};

export const transform = async (codeHash: string) => {
  const code = await unHash(codeHash);

  if (typeof cache[codeHash] === "string") return cache[codeHash] as string;
  if (typeof cache[codeHash] === "undefined") {
    worker.postMessage({ hash: codeHash, code });
    const returnPromise = new Promise<string>((resolve, reject) => {
      cache[codeHash] = { resolve, reject, promise: returnPromise };
    });
    return returnPromise;
  }
  if (cache[codeHash] && cache[codeHash].error) {
    return Promise.reject(cache[codeHash].error);
  }
  return cache[codeHash].promise as Promise<string>;
};
