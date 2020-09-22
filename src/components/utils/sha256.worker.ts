const hashTable = {};

import {Sha256} from "./sha256.utils";

export const Sha256Worker = async () => Sha256(hashTable);
//   async function sign(message: string) {
//     const msgBuffer = new TextEncoder().encode(message);
  
//     const key = await crypto.subtle.importKey(
//       "raw", // raw format of the key - should be Uint8Array
//       enc.encode("mysecretkey"),
//       {
//         // algorithm details
//         name: "HMAC",
//         hash: { name: "SHA-256" },
//       },
//       false, // export = false
//       ["sign", "verify"], // what the key can do'
//     );
  
//     const hashBuffer = await crypto.subtle.sign("SHA-256", key, msgBuffer);
  
//     const hashArray = Array.from(new Uint8Array(hashBuffer));
  
//     // convert bytes to hex string
//     const signHex = hashArray.map((b) => ("00" + b.toString(16)).slice(-2)).join(
//       "",
//     );
//     return signHex;
//   }
  