import { useState, useRef, useEffect, useContext } from 'react'
import ContentEditable from 'react-contenteditable' // https://www.npmjs.com/package/react-contenteditable
import PropTypes from 'prop-types';
import { splitAtRange } from '../../lib/elements.js'
import EditorContext from '../../context/EditorContext.jsx';

function Editable({ elI, toNext, insertBeneath, isFocused = false }) {
  
  const { elements, dispatch } = useContext(EditorContext)
  
  const text = useRef(elements[elI].content)
  const tagIRef = useRef(elements[elI].tagI)
  const inputRef = useRef()
  
  useEffect(() => {
    console.log('element', elements[elI])
    if (isFocused) {
      inputRef.current.focus()
    }
  }, [])

  const onChange = (e) => {
    text.current = inputRef.current.innerHTML;
  }
  
  const split = ({ left , right, hasRight }) => {
    console.log('gonna split - current tagIRef', elements[elI].tagI)
    console.log('left', left)
    console.log('right', right)
    console.log('hasRight', hasRight)
    insertBeneath(elI, elements[elI].tagI, left.innerHTML, right.innerHTML, hasRight)
  }

  const onKeyDown = (e) => {
    let newTagI = null;
    // console.log('e.key', e.key, e.shiftKey)
    if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowUp') {
      e.preventDefault();
      if (elements[elI].tagCanGoUp()) {
        dispatch({ type: 'SET_TAG_I', elI, payload: elements[elI].tagI + 1 })
        // elements[elI].tagAdd(1)
      }
      // if (tagIRef.current < tagNames.length - 1) {
      //   newTagI = tagIRef.current + 1
      // }
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowDown') {
      e.preventDefault();
      if (elements[elI].tagCanGoDown()) {
        dispatch({ type: 'SET_TAG_I', elI, payload: elements[elI].tagI - 1 })
        // elements[elI].tagAdd(-1)
      }
      // if (tagIRef.current > 0) {
      //   newTagI = tagIRef.current - 1
      // }
    } else if (e.shiftKey && e.key === 'Enter') {
      // todo
      // allow normal Enter behaivor
      
      
    } else if (e.key === 'ArrowUp') {
      // todo
      // 
      
      
    } else if (e.key === 'ArrowDown') {
      // todo
      
      
      
    } else if (e.key === 'Enter') {
      const range = document.getSelection().getRangeAt(0)
      split(splitAtRange(range))
      e.preventDefault();
      
      
    } else if (e.key === 'Tab') {
      e.preventDefault();
      inputRef.current.innerHTML = '&#09;' + text.current
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
      className={`element -${elements[elI].tag()}`}
      innerRef={inputRef}
      html={text.current}
      disabled={false}
      onChange={onChange}
      tagName="p"
      onKeyDown={onKeyDown}
      onBlur={onBlur}
    />
  )
}

Editable.propTypes = {
  elI: PropTypes.number,
  toNext: PropTypes.func,
  insertBeneath: PropTypes.func,
  isFocused: PropTypes.bool,
}

export default Editable