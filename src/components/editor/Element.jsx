import { useState, useRef, useEffect, useContext } from 'react'
import ContentEditable from 'react-contenteditable' // https://www.npmjs.com/package/react-contenteditable
import PropTypes from 'prop-types';
import splitAtRange from '../../actions/splitAtRange.js'
import EditorContext from '../../context/EditorContext.jsx';
import { cursorMoveYAction, addElementBelowAction } from '../../actions/caretFuncs.js';
import Selection from '../../lib/Selection'

function Editable({ element, toNext, isFocused = false }) {
  
  const { elements, elementsTable, caretX, dispatch } = useContext(EditorContext)
  
  const inputRef = useRef()
  element.inputRef = inputRef
  
  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus()
    }
  }, [])

  const onChange = (e) => {
    dispatch({ type: 'UPDATE_CONTENT', elI: element.i, content: inputRef.current.innerHTML })
  }
  

  const onKeyDown = (e) => {
    let newTagI = null;
    // console.log('e.key', e.key, e.shiftKey)
    if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowUp') {
      e.preventDefault();
      if (element.tagCanGoUp()) {
        dispatch({ type: 'SET_TAG_I', elI: element.i, payload: element.tagI + 1 })
      }
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowDown') {
      e.preventDefault();
      if (element.tagCanGoDown()) {
        dispatch({ type: 'SET_TAG_I', elI: element.i, payload: element.tagI - 1 })
      }
    } else if (e.shiftKey && e.key === 'Enter') {
      // allow normal Enter behaivor
    } else if (e.key === 'ArrowUp') {
      // console.log('caretX', caretX)
      const sel = new Selection()
      if (sel.rect) {
        console.log('left', sel.x() - element.inputRef.current.offsetLeft)
      }
      if (element.i > 0) {
        const moveToAction = cursorMoveYAction(-1, element.i, element.inputRef.current, sel)
        if (moveToAction) {
          e.preventDefault();
          dispatch(moveToAction)
        }
      }
    } else if (e.key === 'ArrowDown') {
      // console.log('caretX', caretX)
      const sel = new Selection()
      if (sel.rect) {
        console.log('left', sel.x() - element.inputRef.current.offsetLeft)
      }
      if (element.i < elements.length - 1) {
        const moveToAction = cursorMoveYAction(1, element.i, element.inputRef.current, sel)
        if (moveToAction) {
          e.preventDefault();
          dispatch(moveToAction)
        }
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(addElementBelowAction(elementsTable, element))
      
    } else if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '&#009');
      onChange()
    }
    if (newTagI !== null) {
      // setTagI(newTagI)
    }
    newTagI = null
  }
  
  const onBlur = (e) => {
    // setFocused(false)
  }
  
  const cycleTag = (e) => {
    /* todo - drop-down menu of elements */
    // setTagI((tagIRef.current + 1) % tagNames.length);
  }
  
  return (
    <ContentEditable
      className={`element -${element.tag()}`}
      innerRef={inputRef}
      html={element.content}
      disabled={false}
      onChange={onChange}
      tagName="p"
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  )
}

Editable.propTypes = {
  element: PropTypes.object,
  toNext: PropTypes.func,
  isFocused: PropTypes.bool,
}

export default Editable