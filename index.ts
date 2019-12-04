import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import Utils from './utils';
import NodeItem from './node-item';
import Trie from './trie';

const start = Date.now()
const dictionary = new Trie();
const tiles = Utils.pickTiles(10);

// React the words.txt file, line by line.
const readInterface = createInterface({
  input: createReadStream('./words.txt'),
});

readInterface.on('line', (line) => {
  // Optional to only load words that start with a tile you have.
  if (tiles.toLowerCase().split('').includes(line[0])) {
    dictionary.addWord(line);
  }
});

// After the dictionary build is complete, check against tiles.
readInterface.on('close', () => {
  const words = dictionary.validWords(tiles)
  const stop = Date.now()
  console.log(words.length > 0 ? 'Words Found:' : 'No Words Found')
  console.log(words.length > 0 && words);
  console.log(`Tiles: ${tiles.toUpperCase().split('')}`)
  console.log(`Time: ${stop - start}ms`)
})

