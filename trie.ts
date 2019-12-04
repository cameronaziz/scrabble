import NodeItem from './node-item';
import settings from './settings';

interface Result {
  word: string
  points: number
}

class Trie {
  private root: NodeItem;

  constructor() {
    this.root = new NodeItem();
  }

  private getChild(nodeItem: NodeItem, letter: string): NodeItem {
    return nodeItem.children.find((node) => node.letter === letter);
  }

  private prepareResult(word: string): Result {
    let points = 0;
    word
      .split('')
      .forEach((letter) => {
        const stats = settings.find((setting) => setting.letter.toLowerCase() === letter);
        points += stats ? stats.value : 0;
      })
    return {
      word,
      points,
    };
  }

  addWord(unformattedWord: string): void {
    const word = unformattedWord.toLowerCase();
    let current = this.root;
    word
      .split('')
      .forEach((letter, i) => {
        const child = this.getChild(current, letter);
        if (!child) {
          const newNode = new NodeItem(letter);
          current.children.push(newNode);
          current = newNode;
        } else {
          current = child;
        }
        if (i === word.length - 1) {
          current.word = unformattedWord;
        }
      })
  }

  validWords(letters: string, node: NodeItem = this.root, results: Result[] = []): Result[] {
    // This may error in vscode until version 1.41 is released in December (or by installing `JavaScript and TypeScript Nightly`) to support Typescript 3.7.
    // npm start executes the local installed version of 3.7.3 and will not error.
    // It can be fixed with: `if (node.word && node.word.length > 1) {`.
    if (node.word?.length > 1) {
      results.push(this.prepareResult(node.word));
    }
    const seen = new Set();
    letters
      .toLowerCase()
      .split('')
      .map((letter) => {
        if (!seen.has(letter)) {
          seen.add(letter);
          const child = this.getChild(node, letter);
          if (child) {
            const remainingLetters = letters.replace(letter, '');
            this.validWords(remainingLetters, child, results);
          }
        }
      })
    results.sort((a: Result, b: Result) => b.points - a.points);
    return results;
  }
}

export default Trie;
