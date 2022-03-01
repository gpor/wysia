import splitAtRange from "../actions/splitAtRange"
import Selection from '../lib/Selection'



const cursorMoveYAction = (d, i) => {
  // if (
  //   (d === 1 && sel.s.anchorOffset === sel.s.anchorNode.textContent.length)
  //   || (d === -1 && sel.s.anchorOffset === 0)
  // ) {
  // }
  return {
    type: 'FOCUS_RELATIVE_ELEMENT',
    newElI: i + d,
  }
}



const addElementBelowAction = (elementsTable, element) => {
  const sel = new Selection()
  const { left , right, hasRight } = splitAtRange(sel.r)
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






export { cursorMoveYAction, addElementBelowAction }
