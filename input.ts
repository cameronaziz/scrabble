import { createInterface } from 'readline';

const input = (question: string): Promise<string> => {
  const ask = createInterface({
      input: process.stdin,
      output: process.stdout,
  });

  return new Promise(resolve => ask.question(question, response => {
      ask.close();
      resolve(response);
  }))
}

export default input;
