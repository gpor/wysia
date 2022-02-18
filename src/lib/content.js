
import { v4 as uuidv4 } from 'uuid'

const dummyElements = [
  {
    tagName: 'h2',
    value: 'Header',
  },
  {
    tagName: 'h3',
    value: 'One <b style="color:orange">two <i>thr four</i> five</b> six',
  },
  {
    tagName: 'p',
    value: 'The quick brown fox jumps over the lazy dog. I quickly packed my lunch  for the zoo with grapes, veal, and quince jam sandwiches.  The quick brown fox jumps over the lazy dog. I quickly packed my lunch box for the zoo with grapes, veal, and quince jam sandwiches.',
  },
  {
    tagName: 'p',
    value: 'The quick brown fox jumps over the lazy dog. I quickly packed my lunch  for the zoo with grapes, veal, and quince jam sandwiches.  The quick brown fox jumps over the lazy dog. I quickly packed my lunch box for the zoo with grapes, veal, and quince jam sandwiches.',
  },
]

class Content {
  constructor({ elements, focusI = null, insertElement = null }) {
    this.elements = []
    elements.forEach((element, i) => {
      element.id = uuidv4()
      if (focusI && i === focusI) {
        element.isFocused = true
      } else {
        element.isFocused = false
      }
      this.elements.push(element)
      if (insertElement && insertElement.pos === i) {
        element.value = insertElement.htmlLeft
        insertElement.element.id = uuidv4()
        this.elements.push(insertElement.element)
      }
    })
  }
  insertElement(pos, htmlLeft, props) {
    const element = { ...props }
    
    /*
    todo - issue here, re-instantiating a new Content is good but
          every element gets a new uuidv4() generated
          can't be good
    */
    
    return new Content({
      elements: this.elements,
      insertElement: {
        pos,
        element,
        htmlLeft,
      },
    })
  }
}



const initContent = (focusI) => {
  /*
  todo query elements from a database?
  */
  return new Content({ elements: dummyElements, focusI })
}






export { initContent }