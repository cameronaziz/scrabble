class NodeItem {
  letter: string | null
  isWord: boolean
  children: NodeItem[]

  constructor(letter?: string) {
    this.letter = letter || null;
    this.isWord = false;
    this.children = []
  }
}

export default NodeItem;
