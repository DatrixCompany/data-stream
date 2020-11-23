import fs from 'fs';
import readline from 'readline';

export const readLines = (): number[] => {
  const calculationInput = [];

  const read = fs.createReadStream('./input.txt', {
    encoding: 'utf-8',
  });

  const lineStream = readline.createInterface({
    input: read,
    crlfDelay: Infinity,
  });

  lineStream.on('line', (line) => {
    calculationInput.push(Number(line));
  });

  return calculationInput;
};

export const writeLines = () => {
  const writeStream = fs.createWriteStream('output.txt');
  const write = (data: number, result: number) => writeStream.write(`${data}: result ${result} \n`);
  return write;
};
