
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
      const {startOffset, endOffset} = range
      const leftOfSel = text.current.substr(0, startOffset)
      // eslint-disable-next-line default-case
      switch (e.key) {
      case 'Tab':
        // toNext()
        e.preventDefault();
        inputRef.current.innerHTML = '&#09;' + text.current
        onChange()
        break
      case 'Enter':
        console.log(' ');
        console.log('Enter');
        console.log(' ');
        console.log('inputRef.current.selectionStart', startOffset, endOffset)
        console.log('leftOfSel', leftOfSel)
        // eslint-disable-next-line no-case-declarations
        const node = document.createElement('br');
        // node.classList.add('break')
        range.insertNode(node)
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
    /* todo - drop-down menu of elements */
    setTagI((tagI + 1) % tagNames.length);
  }
  
  const clickButton = () => {
    inputRef.current.innerText = ''
    inputRef.current.focus()
    onChange()
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
      {/* <h1
        onClick={clickButton}
      >Click</h1> */}
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