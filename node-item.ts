class NodeItem {
  children: NodeItem[]
  readonly letter: string | null
  word: string | null

  constructor(letter?: string) {
    this.letter = letter || null;
    this.children = [];
  }
}

export default NodeItem;
