//@ts-ignore
import Sha256Worker from "workerize-loader!./sha256/sha256.worker";

const sha256Worker = typeof window === "object" && Sha256Worker();

export const hash = async (str: string | object) => sha256Worker.hash(str);

export const unHash = async (hash: string) => sha256Worker.unHash(hash);
