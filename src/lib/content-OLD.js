
import { v4 as uuidv4 } from 'uuid'


// defunct file
// delete if nothing here is needed anywhere
// maybe uuid?
// ??


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
}






export { initContent }