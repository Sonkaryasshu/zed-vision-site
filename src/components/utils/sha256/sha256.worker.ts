const hashTable = {};

import { Sha256 } from "./sha256.utils";

export const Sha256Worker =  () => async () => await Sha256(hashTable);
