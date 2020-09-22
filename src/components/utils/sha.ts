import {Sha256Worker} from "./sha256.worker";
import {Sha256} from "./sha256.utils";

const sha256W = (typeof window === 'object' && Sha256Worker) || Sha256;

export const {hash, unHash} = {
    hash: async (str: string) => {
        // if (sha256W){

            const loadedModule = await sha256W();
            return loadedModule.hash(str);
        // }else {
// 
        // }
    },
    unHash: async( hash: string) => {
        const loadedModule = await sha256W();
        return loadedModule.unHash(hash);
    }
};