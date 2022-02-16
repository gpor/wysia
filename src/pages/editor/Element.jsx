import { useState, useRef, useEffect } from 'react'
import ContentEditable from 'react-contenteditable' // https://www.npmjs.com/package/react-contenteditable
import PropTypes from 'prop-types';
import { tagNames, splitAtRange } from '../../lib/elements.js'

function Editable({ elementI, value, tagName, toNext, insertBeneath, isFocused = false }) {
  const text = useRef(value)
  const [tagI, _setTagI] = useState(tagNames.findIndex(name => name === tagName) ?? 0)
  const tagIRef = useRef(tagI)
  const inputRef = useRef()
  const setTagI = (newTagI) => {
    tagIRef.current = newTagI
    _setTagI(newTagI)
  }
  
  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus()
    }
  }, [])

  const onChange = (e) => {
    text.current = inputRef.current.innerHTML;
  }
  
  const split = ({ left , right, hasRight }) => {
    console.log('gonna split - current tagIRef', tagIRef.current)
    insertBeneath(elementI, tagIRef.current, left.innerHTML, right.innerHTML, hasRight)
  }

  const onKeyDown = (e) => {
    let newTagI = null;
    // console.log('e.key', e.key, e.shiftKey)
    if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowUp') {
      if (tagIRef.current < tagNames.length - 1) {
        newTagI = tagIRef.current + 1
      }
    } else if ((e.metaKey || e.ctrlKey) && e.key === 'ArrowDown') {
      e.preventDefault();
      if (tagIRef.current > 0) {
        newTagI = tagIRef.current - 1
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
      const range = document.getSelection().getRangeAt(0)
      split(splitAtRange(range))
      e.preventDefault();
      
      
    } else if (e.key === 'Tab') {
      e.preventDefault();
      inputRef.current.innerHTML = '&#09;' + text.current
      onChange()
  
    }
    if (newTagI !== null) {
      setTagI(newTagI)
    }
    newTagI = null
  }
  
  const onBlur = (e) => {
    // setFocused(false)
  }
  
  const cycleTag = (e) => {
    /* todo - drop-down menu of elements */
    setTagI((tagIRef.current + 1) % tagNames.length);
  }
  
  return (
    <div className={`element -${tagNames[tagIRef.current]}`}>
      <div
        className="-gutter"
        onClick={cycleTag}
      >
        <p>{tagNames[tagIRef.current]}</p>
      </div>
      <ContentEditable
        className="-inp"
        innerRef={inputRef}
        html={text.current}
        disabled={false}
        onChange={onChange}
        tagName="p"
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      />
    </div>
  )
}

Editable.propTypes = {
  elementI: PropTypes.number,
  value: PropTypes.string,
  tagName: PropTypes.string,
  toNext: PropTypes.func,
  insertBeneath: PropTypes.func,
  isFocused: PropTypes.bool,
}

export default Editable