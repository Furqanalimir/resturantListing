import { parentPort } from 'node:worker_threads';
// import {parentPort} from 'worker_threads';


let finalVal = 0;
for (let i = 0; i < 50000; i++) {
    finalVal++;
}

parentPort.postMessage(finalVal)