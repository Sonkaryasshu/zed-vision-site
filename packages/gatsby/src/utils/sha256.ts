const hashHelpers = {
    counter: 1,
    worker: null as unknown as Worker,
    resolvers: [] as ({ id?: number, hash?: string, res: (value: unknown) => void })[]
};

if (typeof window !== "undefined") {
    hashHelpers.worker = new Worker("/shaWorker.js");

    hashHelpers.worker.onmessage = (message) => {
        console.log("ON MESSAGE YEEAK");
        const data = message.data;
        if (data.id) {
            const res = hashHelpers.resolvers.find((item) => item.id === data.id);
            if (res) res.res(data.hash);
            return;
        }
        else if (data.hash) {
            const res = hashHelpers.resolvers.find((item) => item.hash === data.hash);
            if (res) res.res(data.data);
            return;
        }
        console.error("ERROR in shaHASH");
    };
}

export const sha256 = (data: unknown) => {

    return new Promise<string>((res) => {
        const id = hashHelpers.counter++;
        console.log("COUNTYE", id);
        hashHelpers.resolvers.push({ id, res });

        hashHelpers.worker.postMessage({ id, data: data });

    });

};

export const unHash = (hash: string) => {

    return new Promise((res) => {
        // const id = counter++;
        // console.log("COUNTYE", id);
        hashHelpers.resolvers.push({ res, hash });

        hashHelpers.worker.postMessage({ hash });
    });

};