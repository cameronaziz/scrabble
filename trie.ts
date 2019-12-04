import NodeItem from './node-item';
import weights from './weights';

interface Result {
  word: string
  points: number
}

class Trie {
  root: NodeItem;

  constructor() {
    this.root = new NodeItem();
  }

  getChild(nodeItem: NodeItem, letter: string): NodeItem {
    return nodeItem.children.find((node) => node.letter === letter);
  }

  addWord(unformattedWord: string): void {
    const word = unformattedWord.toLowerCase();
    let current = this.root;
    for (let i = 0; i < word.length; i += 1) {
      const letter = word[i];
      const child = this.getChild(current, letter);
      let newNode: NodeItem;
      if (!child) {
        newNode = new NodeItem(letter);
        current.children.push(newNode);
        current = newNode;
      } else {
        current = child;
      }
      if (i === word.length - 1) {
        current.isWord = true;
      }
    }
  }

  prepareResult(word: string): Result {
    let points = 0;
    let i = word.length;
    while (i >= 0) {
      const letter = word.charAt(i);
      const stats = weights.find((weight) => weight.letter.toLowerCase() === letter);
      points += stats ? stats.value : 0;
      i -= 1;
    }
    return {
      word,
      points,
    };
  }

  validWords(letters: string, node: NodeItem = this.root, word: string = '', results: Result[] = []): Result[] {
    if (node.isWord && word.length > 1) {
      results.push(this.prepareResult(word));
    }
    const seen = new Set();
    for (let char of letters) {
      if (!seen.has(char)) {
        seen.add(char);
        const child = this.getChild(node, char);
        if (child) {
          const remainingLetters = letters.replace(char, '');
          this.validWords(remainingLetters, child, `${word}${char}`, results);
        }
      }
    }
    results.sort((a: Result, b: Result) => b.points - a.points);
    return results;
  }
}

export default Trie;
