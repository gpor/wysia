
import {useState, useRef, useEffect} from 'react'
import ContentEditable from 'react-contenteditable' // https://www.npmjs.com/package/react-contenteditable
import PropTypes from 'prop-types';

const tagNames = ['p', 'h3', 'h2']

function Editable({value, tagName, tabNext, isFocused = false}) {
  const text = useRef(value)
  const [tagI, _setTagI] = useState(tagNames.findIndex(name => name === tagName) ?? 0)
  const tagIRef = useRef(tagI)
  const inputRef = useRef()
  const setTagI = (newTagI) => {
    tagIRef.current = newTagI
    _setTagI(newTagI)
  }
  
  useEffect(() => {
    console.log('useEffect []')
    if (isFocused) {
      inputRef.current.focus()
    }
  }, [])

  const onChange = (e) => {
    text.current = e.target.value;
  }

  const onKeyDown = (e) => {
    let newTagI = null;
    if (e.metaKey || e.ctrlKey) {
      // eslint-disable-next-line default-case
      switch (e.key) {
      case 'ArrowUp':
        if (tagIRef.current < tagNames.length - 1) {
          console.log('inc')
          newTagI = tagIRef.current + 1
        }
        e.preventDefault();
        break;
      case 'ArrowDown':
        if (tagIRef.current > 0) {
          console.log('dec')
          newTagI = tagIRef.current - 1
        }
        e.preventDefault();
          
        break;
      }
    } else {
      // eslint-disable-next-line default-case
      switch (e.key) {
      case 'Tab':
        tabNext()
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
  tabNext: PropTypes.func,
  isFocused: PropTypes.bool,
}

export default Editable