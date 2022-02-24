import { Row, Table } from "../lib/model";
import { v4 as uuidv4 } from 'uuid'

const dummyElements = [
  {
    id: 1,
    tagName: 'h2',
    content: 'Header',
  },
  {
    id: 2,
    tagName: 'h3',
    content: 'One <b style="color:orange">two <i>thr four</i> five</b> six',
  },
  {
    id: 3,
    tagName: 'p',
    content: 'The quick brown fox jumps over the lazy dog. I quickly packed my lunch  for the zoo with grapes, veal, and quince jam sandwiches.  The quick brown fox jumps over the lazy dog. I quickly packed my lunch box for the zoo with grapes, veal, and quince jam sandwiches.',
  },
  {
    id: 4,
    tagName: 'p',
    content: 'The quick brown fox jumps over the lazy dog. I quickly packed my lunch  for the zoo with grapes, veal, and quince jam sandwiches.  The quick brown fox jumps over the lazy dog. I quickly packed my lunch box for the zoo with grapes, veal, and quince jam sandwiches.',
  },
]

const tagNames = ['p', 'h3', 'h2']

class ElementsTable extends Table {
  _new(data) {
    return new Element(data);
  }
  dummyElements() {
    const elements = []
    dummyElements.forEach(data => {
      elements.push(this.new(data))
    })
    return elements
  }
}

class Element extends Row {
  constructor(data) {
    super(data)
    this.id = data.id || uuidv4()
    this.tagName = '' // set once, don't access after instantiation. use tag()
    this.content = '' // was value
    this.isFocused = false
    this.fill(data)
    this.tagI = tagNames.findIndex(name => name === this.tagName) ?? 0
  }
  tag() {
    return tagNames[this.tagI]
  }
  tagCanGoUp() {
    return this.tagI < tagNames.length - 1
  }
  tagCanGoDown() {
    return this.tagI > 0
  }
}


export default ElementsTable