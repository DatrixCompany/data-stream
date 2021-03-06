import { startCalculation, getCalculation } from './requests-service';
import { readLines, writeLines } from './files-service';

const calculationInput = readLines();
const write = writeLines();
const pendingRequests = {};

const calcOne = async (numb: number): Promise<void> => {
  try {
    const data = await startCalculation(numb);
    delete pendingRequests[numb];
    if (data.request_id) {
      const { result } = await getCalculation(data.request_id);

      write(numb, result);
    }
  } catch (err) {
    console.log(err);
  }
};

const start = () => {
  if (calculationInput.length > 0) {
    if (Object.keys(pendingRequests).length < 5) {
      const numb = calculationInput.pop();
      pendingRequests[numb] = true;
      calcOne(numb);
    }
    setTimeout(() => start(), 500);
  }
};

setTimeout(start, 500);

start();
