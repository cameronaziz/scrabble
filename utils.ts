import weights from './weights';

class Utils {
  static pickTiles(length: number): string {
    const sumOfWeights = weights.reduce((acc, curr) => acc + curr.weight, 0)
    const letters: string[] = [];
    while (letters.length < length) {
      const pick = Math.round(Math.random() * (sumOfWeights + 1));
      let weightSum = 0
      for (var i = 0; i < weights.length; i += 1) {
        weightSum += weights[i].weight;
        weightSum = +weightSum.toFixed(2);
        if (pick <= weightSum) {
          letters.push(weights[i].letter);
          break;
        }
      }
    }
    return letters.join('').toLowerCase();
  }

  static print(data: any): void {
    const content = JSON.stringify(data, null, 2);
    console.log(content);
  }
}

export default Utils;
