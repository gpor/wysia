import { useState, useRef, useEffect, useContext } from 'react'
import ContentEditable from 'react-contenteditable' // https://www.npmjs.com/package/react-contenteditable
import PropTypes from 'prop-types';
import splitAtRange from '../../actions/splitAtRange.js'
import EditorContext from '../../context/EditorContext.jsx';

function Editable({ element, toNext, isFocused = false }) {
  
  const { elements, elementsTable, dispatch } = useContext(EditorContext)
  
  const inputRef = useRef()
  
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
      // todo
      // allow normal Enter behaivor
      
      
    } else if (e.key === 'ArrowUp') {
      // todo
      // 
      
      
    } else if (e.key === 'ArrowDown') {
      // todo
      
      
      
    } else if (e.key === 'Enter') {
      e.preventDefault();
      
      const range = document.getSelection().getRangeAt(0)
      const { left , right, hasRight } = splitAtRange(range)
      
      const newEl = elementsTable.new({
        tagName: 'p',
        content: right.innerHTML,
        isFocused: true,
      })
      dispatch({
        type: 'UPDATE_CONTENT_AND_ADD_ELEMENT_BELOW',
        elI: element.i,
        newEl,
        content: left.innerHTML,
      })
      
    } else if (e.key === 'Tab') {
      e.preventDefault();
      inputRef.current.innerHTML = '&#09;' + element.content /* todo - should insert */
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