
import { v4 as uuidv4 } from 'uuid'

const dummyElements = [
  {
    tagName: 'h2',
    value: 'Header',
  },
  {
    tagName: 'h3',
    value: 'one <b style="color:orange">two <i>thr four</i> five</b> six',
  },
  {
    tagName: 'p',
    value: '',
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
  return new Content({ elements: dummyElements, focusI })
}






export { initContent }