import { unHash, hash } from "./sha";

const cache = {};

const worker = (typeof window !== "undefined")
  ? new Worker(URL.createObjectURL(
    new window.Blob(
      [`
importScripts('https://unpkg.com/@babel/standalone@7.11.6/babel.min.js');

self.onmessage=(message)=>{
  const translatedMessage = Babel.transform(message.data.code, {
plugins: [],
presets: ["react", ["typescript", { isTSX: true, allExtensions: true }]],
}).code.replace("export const", "const").replace("import ", "//import");
    postMessage({hash: message.data.hash, translatedCode: translatedMessage})
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
  return cache[codeHash].promise as Promise<string>;
};
