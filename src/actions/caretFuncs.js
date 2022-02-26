import splitAtRange from "../actions/splitAtRange"

function sel() {
  return document.getSelection()
}

function range() {
  return sel().getRangeAt(0)
}


function cursorMoveY() {
  const s = sel()
  console.log('sel.rangeCount', s.rangeCount)
}

function cursorUp() {
  cursorMoveY()
}

function cursorDown() {
  cursorMoveY()
}

function enterInsertBelowAction(elementsTable, element) {
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






export { range, cursorUp, cursorDown, enterInsertBelowAction }
