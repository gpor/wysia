
import {useState, useRef, useEffect} from 'react'
import ContentEditable from 'react-contenteditable' // https://www.npmjs.com/package/react-contenteditable

const tagNames = ['p', 'h3', 'h2']

function Editable({value, tagName, tabNext, isFocused = false}) {
  const text = useRef(value)
  // const [focused, setFocused] = useState(isFocused)
  const [tagI, setTagI] = useState(0)
  // const [tagI, setTagI] = useState(tagNames.findIndex(name => name === tagName) ?? 0)
  const ref = useRef()
  
  // console.log('value', value, text)
  
  // useEffect(() => {
    // console.log('useEffect')
    // console.log('useEffect tagI', tagI)
    // if (focused) {
      // console.log('focu')
      // setTimeout(() => {
      //   ref.current.focus()
      // }, 100)

      // ref.current.focus()
    // }
  // })

  const onChange = (e) => {
    text.current = e.target.value;
    console.log('text', text)
  }

  const onKeyDown = (e) => {
    // console.log(e.key)
    console.log('onKeyDown', tagI)
    let newTagI = null;
    if (e.metaKey || e.ctrlKey) {
      // eslint-disable-next-line default-case
      switch (e.key) {
        case 'ArrowUp':
          if (tagI < tagNames.length - 1) {
            console.log('inc')
            newTagI = tagI + 1
          }
          console.log('ArrowUp', tagI, newTagI)
          e.preventDefault();
          break;
          case 'ArrowDown':
            if (tagI > 0) {
            console.log('dec')
            newTagI = tagI - 1
          }
          console.log('ArrowDown', tagI, newTagI)
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
      console.log('setTagI(  ', newTagI, '  )')
      console.log(' ');
      setTagI(newTagI)
      // setTimeout(() => {
      //   ref.current.focus()
      // }, 100)

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
          innerRef={ref}
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

export default Editable