
import {useState, useRef, useEffect} from 'react'
import ContentEditable from 'react-contenteditable' // https://www.npmjs.com/package/react-contenteditable
import PropTypes from 'prop-types';

const tagNames = ['p', 'h3', 'h2']
const nodeTypes = ['no_nodeType','ELEMENT_NODE','ATTRIBUTE_NODE','TEXT_NODE','CDATA_SECTION_NODE','PROCESSING_INSTRUCTION_NODE','COMMENT_NODE','DOCUMENT_NODE','DOCUMENT_TYPE_NODE','DOCUMENT_FRAGMENT_NODE']


const splitElsRecur = (el, stack) => {
  if (stack.length > 10 || el.tagName === 'P') {
    return stack;
  }
  const parent = el.parentElement;
  stack.push(parent);
  return splitElsRecur(parent, stack);
}
const splitEls = (el) => {
  console.log('splitEls()', el.tagName)
  return splitElsRecur(el, [el])
}

const splitHtmlRecur = (el, left, right) => {
  if (el.tagName === 'P') {
    return {left, right}
  }
  const parent = el.parentElement
  // left.push(parent.tagName)
  // right.push(parent.tagName)
  let rightOfInner = false;
  const prepend = [];
  const append = [];
  parent.childNodes.forEach(node => {
    if (rightOfInner) {
      append.push(node)
    } else {
      if (node.isEqualNode(el)) {
        rightOfInner = true;
      } else {
        prepend.push(node)
      }
    }
  })
  return splitHtmlRecur(parent, {
    prepend,
    tempPrepend: prepend.map(n => n.textContent),
    node: parent.cloneNode(),
    inner: left,
  }, {
    node: parent.cloneNode(),
    inner: right,
    append,
    tempAppend: append.map(n => n.textContent),
  })
}
const splitHtml = (el) => {
  return splitHtmlRecur(
    el,
    {node: el, inner: null},
    {node: el, inner: null}
  )
}


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
        
        
          // eslint-disable-next-line no-case-declarations
          let {left, right} = splitHtml(node)
          console.log('left', left)
          console.log('right', right)
        
          // eslint-disable-next-line no-case-declarations
          let wrappers2 = splitEls(node)
          console.log('wrappers2', wrappers2)
          console.log(' ')
          wrappers2.forEach(wrapper => {
            console.log(wrapper.tagName)
            // console.log(wrapper)
            wrapper.childNodes.forEach(node => {
              const type = nodeTypes[node.nodeType]
              switch (type) {
                case 'TEXT_NODE':
                  console.log('__'+node.textContent);
                  break;
                case 'ELEMENT_NODE':
                  console.log('__'+node.tagName);
                  break;
                default:
                  console.log('--', type)
                  break;
              }
              // console.log('node', node, nodeTypes[node.nodeType])
            })
            console.log(' ')
          })

        
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