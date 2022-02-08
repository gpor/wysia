
import {useState, useRef, useEffect} from 'react'
import ContentEditable from 'react-contenteditable' // https://www.npmjs.com/package/react-contenteditable
import PropTypes from 'prop-types';

const tagNames = ['p', 'h3', 'h2']

function Editable({value, tagName, toNext, insertBeneath, isFocused = false}) {
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
    // console.log('e.target.value', e.target.value)
    text.current = inputRef.current.innerHTML;
  }

  const onKeyDown = (e) => {
    let newTagI = null;
    if (e.metaKey || e.ctrlKey) {
      // eslint-disable-next-line default-case
      switch (e.key) {
      case 'ArrowUp':
        if (tagIRef.current < tagNames.length - 1) {
          newTagI = tagIRef.current + 1
        }
        e.preventDefault();
        break;
      case 'ArrowDown':
        if (tagIRef.current > 0) {
          newTagI = tagIRef.current - 1
        }
        e.preventDefault();
          
        break;
      }
    } else {
      const range = document.getSelection().getRangeAt(0)

      // eslint-disable-next-line default-case
      switch (e.key) {
      case 'Tab':
        // toNext()
        e.preventDefault();
        console.log('inputRef', inputRef.current.innerText, inputRef.current.innerHTML)
        console.log('inputRef.current.selectionStart', range.startOffset, range.endOffset)
        // inputRef.current.innerHTML += '&#09;'
        text.current += '&#09;'
        // inputRef.current.innerText = text.current + '\t'
        // onChange()
        break
      case 'Enter':
        insertBeneath()
        e.preventDefault();
            
        break
      }
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
    setTagI((tagI + 1) % tagNames.length);
  }

  return (
    <div className={`element -${tagNames[tagI]}`}>
      <div
        className="-gutter"
        onClick={cycleTag}
      >
        <p>{tagNames[tagI]}</p>
      </div>
      <div className="-input">
        <ContentEditable
          innerRef={inputRef}
          html={text.current}
          disabled={false}
          onChange={onChange}
          tagName="p"
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      </div>
    </div>
  )
}

Editable.propTypes = {
  value: PropTypes.string,
  tagName: PropTypes.string,
  toNext: PropTypes.func,
  insertBeneath: PropTypes.func,
  isFocused: PropTypes.bool,
}

export default Editable