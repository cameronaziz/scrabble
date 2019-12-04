import { createReadStream } from 'fs';
import { createInterface } from 'readline';
import Utils from './utils';
import Trie from './trie';
import input from './input';

// Build an empty dictionary.
const dictionary = new Trie();
let loadingDictionary = false;
// Pick 8 tiles.
let tiles = Utils.pickTiles(8);

// React the words.txt file, line by line.
const readInterface = createInterface({
  input: createReadStream('./words.txt'),
});

loadingDictionary = true;
readInterface.on('line', (line) => {
  dictionary.addWord(line);
});

readInterface.on('close', () => {
  loadingDictionary = false
});

const find = (guess: string) => {
  const words = dictionary.validWords(tiles.join(''));
  const correctGuess = words.find((word) => word.word === guess.toLowerCase())
  console.log(words.length > 0 ? 'Words Found:' : 'No Words Found with those tiles!');
  console.log(words.length > 0 && words);
  console.log()
  console.log(`Tiles: ${tiles}`);
  console.log(`${words.length} total words found.`)
  if(correctGuess) {
    console.log(`Your guess of "${guess}" is a word worth ${correctGuess.points}!`)
    if(words[0]?.points > correctGuess.points) {
      console.log(`The highest scoring word was actually "${words[0]?.word}" with ${words[0]?.points} points.`)
    } else {
      console.log('You found a highest scoring word!');
    }
  } else {
    console.log(`Your guess of "${guess}" is not a word!`)
  }
  console.log();
  input('Would you like to play again? (Y/N)')
    .then((choice) => {
      if (choice.toLowerCase() === 'n') {
        process.exit();
      }
      run();
    });
}

const openMenu = (badSelection?: boolean) => {
  console.clear();
  console.log('                    MENU');
  console.log();
  console.log('1: Go Back');
  console.log('2: Shuffle Letters');
  console.log('3: New Letters');
  console.log('4: Quit');
  console.log();
  if (badSelection) {
    console.log('Invalid selction, please select again.')
  }
  input('$: ').then((response) => {
    switch(response) {
      case('4'): {
        console.clear();
        process.exit();
      }
      case('3'): {
        tiles = Utils.pickTiles(8);
      }
      case('2'): {
        tiles = Utils.shuffle(tiles);
      }
      case('1'): {
        run();
        break;
      }
      default: {
        openMenu(true);
      }
    }
  });
}

const run = () => {
  console.clear();
  console.log('                                        Enter $ for menu');
  console.log();
  console.log('What letters would you like to guess? (case insensitive)');
  console.log()
  console.log(`                 ${tiles.join(' ')}`);
  console.log();
  console.log();
  input(`Guess:  `)
    .then((guess) => {
      if (guess === '$') {
        openMenu();
      } else {
        // After the dictionary build is complete, check against tiles.
        if (loadingDictionary === false) {
          find(guess);
        } else {
          readInterface.on('close', () => {
            find(guess);
          });
        }
      }
    });
};

run();

