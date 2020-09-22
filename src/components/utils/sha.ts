import {Sha256Worker} from "./sha256.worker";

const sha256W = typeof window === 'object' && Sha256Worker();

export const {hash, unHash} = sha256W || {hash: async()=>"", unHash: async()=> ""};