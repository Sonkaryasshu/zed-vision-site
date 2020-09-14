const worker = new window.Worker("/shaWorker.js");
const resolvers: ({ id?: number, hash?: string, res: (value: unknown) => void })[] = [];

worker.onmessage = (message) => {
    console.log("ON MESSAGE YEEAK");
    const data = message.data;
    if (data.id) {
        const res = resolvers.find((item) => item.id === data.id);
        if (res) res.res(data.hash);
        return;
    }
    else if (data.hash) {
        const res = resolvers.find((item) => item.hash === data.hash);
        if (res) res.res(data.data);
        return;
    }
    console.error("ERROR in shaHASH");
};
let counter = 1;

export const sha256 = (data: unknown) => {

    return new Promise<string>((res) => {
        const id = counter++;
        console.log("COUNTYE", id);
        resolvers.push({ id, res });

        worker.postMessage({ id, data: data });

    });

};


export const unHash = (hash: string) => {

    return new Promise((res) => {
        // const id = counter++;
        // console.log("COUNTYE", id);
        resolvers.push({ res, hash });

        worker.postMessage({ hash });

    });

};