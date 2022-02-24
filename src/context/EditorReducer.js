
function newElements(prevEls, insertI, newEl, func = null) {
  const els = []
  prevEls.forEach((el, i)=>{
    console.log('i', i)
    if (func && insertI === i) {
      els.push(func(el, i));
    } else {
      els.push(el);
    }
    if (insertI === i) {
      console.log('insertI', newEl.content)
      els.push(newEl)
    }
  })
  console.log(' ')
  console.log(' ')
  return els
}

const githubReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ELEMENTS':
      return {
        ...state,
        elements: action.payload,
      }
    case 'SET_TAG_I':
      state.elements[action.elI].tagI = action.payload
      return {
        ...state,
      }
    case 'UPDATE_CONTENT':
      state.elements[action.elI].content = action.content
      return {
        ...state,
      }
    case 'ADD_ELEMENT_BELOW':
      return {
        ...state,
        elements: newElements(
          state.elements,
          action.elI,
          action.newEl
        ),
      }
    case 'UPDATE_CONTENT_AND_ADD_ELEMENT_BELOW':
      return {
        ...state,
        elements: newElements(
          state.elements,
          action.elI,
          action.newEl,
          (el, i) => {
            console.log('from ___', el.content)
            el.content = action.content
            console.log('to ____', el.content)
            return el
          }
        ),
      }
    default:
      console.error('no action type', action.type)
      return state
  }
}

export default githubReducer
