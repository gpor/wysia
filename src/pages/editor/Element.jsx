
import {useState, useRef, useEffect} from 'react'
import ContentEditable from 'react-contenteditable' // https://www.npmjs.com/package/react-contenteditable

const tagNames = ['p', 'h3', 'h2']

function Editable({value, tagName, tabNext, isFocused = false}) {
  const text = useRef(value)
  const [focused, setFocused] = useState(isFocused)
  const [tagI, setTagI] = useState(tagNames.findIndex(name => name === tagName) ?? 0)
  const ref = useRef()
  
  console.log('value', value, text)
  
  useEffect(() => {
    // console.log('useEffect')
    if (focused) {
      console.log('focu')
      setTimeout(() => {
        ref.current.focus()
      }, 100)

      // ref.current.focus()
    }
  })

  const onChange = (e) => {
    text.current = e.target.value;
    console.log('text', text)
  }

  const onKeyDown = (e) => {
    // console.log(e.key)
    let newTagI = null;
    if (e.metaKey || e.ctrlKey) {
      // eslint-disable-next-line default-case
      switch (e.key) {
        case 'ArrowUp':
          if (tagI < tagNames.length - 1) {
            newTagI = tagI + 1
          }
          console.log('ArrowUp', ref)
          break;
        case 'ArrowDown':
          if (tagI > 0) {
            newTagI = tagI - 1
          }
          console.log('ArrowDown', ref)
          break;
      }
    } else {
      // eslint-disable-next-line default-case
      switch (e.key) {
        case 'Tab':
          tabNext()
          break
      }
    }
    if (newTagI !== null) {
      console.log('newTagI', newTagI)
      setTagI(newTagI)
      // setTimeout(() => {
      //   ref.current.focus()
      // }, 100)

    }
  }
  
  const onBlur = (e) => {
    setFocused(false)
  }

  return (
    <div className='element'>
      <div className="-gutter"></div>
      <div className="-input">
        <ContentEditable
          innerRef={ref}
          html={text.current}
          disabled={false}
          onChange={onChange}
          tagName={tagNames[tagI]}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
      </div>
    </div>
  )
}

export default Editable