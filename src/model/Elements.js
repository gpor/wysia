import { Row, Table } from "../lib/model";

const dummyElements = [
  {
    tagName: 'h2',
    content: 'Header',
  },
  {
    tagName: 'h3',
    content: 'One <b style="color:orange">two <i>thr four</i> five</b> six',
  },
  {
    tagName: 'p',
    content: 'The quick brown fox jumps over the lazy dog. I quickly packed my lunch  for the zoo with grapes, veal, and quince jam sandwiches.  The quick brown fox jumps over the lazy dog. I quickly packed my lunch box for the zoo with grapes, veal, and quince jam sandwiches.',
  },
  {
    tagName: 'p',
    content: 'The quick brown fox jumps over the lazy dog. I quickly packed my lunch  for the zoo with grapes, veal, and quince jam sandwiches.  The quick brown fox jumps over the lazy dog. I quickly packed my lunch box for the zoo with grapes, veal, and quince jam sandwiches.',
  },
]


class Elements extends Table {
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
    this.id = 0
    this.tagName = ''
    this.content = '' // was value
    this.isFocused = false
    this.fill(data) /* todo - must go in plop template */
    
  }
}


export default Elements