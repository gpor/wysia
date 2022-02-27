import splitAtRange from "../actions/splitAtRange"

const sel = () => {
  return document.getSelection()
}

const range = () => {
  return sel().getRangeAt(0)
}


const cursorMoveYAction = (d, i) => {
  const s = sel()
  if (
    (d === 1 && s.anchorOffset === s.anchorNode.textContent.length)
    || (d === -1 && s.anchorOffset === 0)
  ) {
    return {
      type: 'FOCUS_RELATIVE_ELEMENT',
      newElI: i + d,
    }
  }
}



const addElementBelowAction = (elementsTable, element) => {
  const { left , right, hasRight } = splitAtRange(range())
  const newEl = elementsTable.new({
    tagName: 'p',
    content: right.innerHTML,
    isFocused: true,
  })
  return {
    type: 'UPDATE_CONTENT_AND_ADD_ELEMENT_BELOW',
    elI: element.i,
    newEl,
    content: left.innerHTML,
  }
}






export { range, cursorMoveYAction, addElementBelowAction }
