const hashTable = {};

import { Sha256 } from "./sha256.utils";

export default async function Sha256Worker() {
  const shaStore = await Sha256(hashTable);
  return {
    hash: (e) => shaStore.hash(e),
    unHash: (e) => shaStore.unHash(e),
  };
}
