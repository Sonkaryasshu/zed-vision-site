

export const Sha256 = (hashTable = {}) => ({
    hash: async (strInput: string)=>{
        console.log("YYYYYAYYAYAYAYA");
        const hash = await sha256(strInput);

        const shorterHash = shortener(hash);
    
        hashTable[shorterHash] = strInput;
    
        return shorterHash;
        function shortener(hash: string) {
            for (let i = 4; i < 64; i++) {
              const shorterHash = hash.substr(0, i);
              if (hashTable[shorterHash] === undefined) {
                hashTable[shorterHash] = hash;
                return shorterHash;
              }
              if (hashTable[shorterHash] === hash) return shorterHash;
            }
            return hash;
          }
        
    },
    unHash: async(hash: string)=>hashTable[hash],

});


  async function sha256(message: string) {
    const msgBuffer = new TextEncoder().encode(message);
  
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  
    const hashArray = Array.from(new Uint8Array(hashBuffer));
  
    // convert bytes to hex string
    const hashHex = hashArray.map((b) => ("00" + b.toString(16)).slice(-2)).join(
      "",
    );
    return hashHex;
  }
