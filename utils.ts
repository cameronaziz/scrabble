import settings, { Setting } from './settings';

class Utils {

  static getWeightSum(currentSettings: Setting[]): number {
    return currentSettings.reduce((acc, curr) => acc + curr.weight, 0);
  }

  static shuffle<T>(array: T[]): T[] {
    let currentIndex = array.length;
    let temporaryValue: T;
    let randomIndex: number;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  static pickTiles(length: number): string[] {
    // Make a deep copy of settings.
    const currentSettings = [...settings.map((setting) => <Setting>Object.create(setting))]
    // Count up all the weights.
    let startingSumOfWeights = currentSettings.reduce((acc, curr) => acc + curr.weight, 0);
    const tiles: string[] = [];
    while (tiles.length < length) {
      // Pick a random number between 1 and the sum of weights.
      const pick = Math.round(Math.random() * (startingSumOfWeights + 1));
      let currentWeight = 0;
      // Iterate through the settings, add that setting's weight and check to see if it is equal to or passed it.
      for (var i = 0; i < settings.length; i += 1) {
        currentWeight += settings[i].weight;
        if (pick <= currentWeight) {
          const pickedTile = settings[i]
          // Reduce the weight of the picked tile and reduce the sum of weights.
          pickedTile.weight -= 1;
          startingSumOfWeights -= 1;
          // Add the picked tile's letter to the tiles and break out of the while loop
          tiles.push(pickedTile.letter);
          break;
        }
      }
    }
    return tiles;
  }

  static print(data: any): void {
    const content = JSON.stringify(data, null, 2);
    console.log(content);
  }
}

export default Utils;
