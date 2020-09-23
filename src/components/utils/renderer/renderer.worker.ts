import WorkerThread from "@ampproject/worker-dom/dist/worker/worker.js";
import { RendererModule } from "./renderer.utils";

export const RendererWorker = async () => {
  console.log("RENDER WORKER");

  const window = WorkerThread.workerDOM;
  const document = WorkerThread.workerDOM.document;

  console.log("WE are the worker", window, document);
  return await RendererModule();
};
