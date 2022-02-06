
import {useState, useRef, useEffect} from 'react'
import ContentEditable from 'react-contenteditable' // https://www.npmjs.com/package/react-contenteditable

const tagNames = ['p', 'h3', 'h2']

function Editable({value, tagName, tabNext}) {
  const text = useRef(value)
  const [tagI, setTagI] = useState(tagNames.findIndex(name => name === tagName) ?? 0)
  const ref = useRef()
  
  console.log('value', value, text)
  
  useEffect(() => {
    // console.log('useEffect')
  })

  const onChange = (e) => {
    text.current = e.target.value;
    console.log('text', text)
  }

  const onKeyDown = (e) => {
    // console.log(e.key)
    let newTagI = null;
    if (e.metaKey) {
      // eslint-disable-next-line default-case
      switch (e.key) {
        case 'ArrowUp':
          newTagI = (tagI + 1) % tagNames.length
          console.log('ArrowUp', ref)
          break;
        case 'ArrowDown':
          newTagI = (tagI + tagNames.length - 1) % tagNames.length
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
      setTimeout(() => {
        ref.current.focus()
      }, 100)

    }
  }
  
  const onBlur = (e) => {
    // console.log('onBlur')
  }

  return (
    <div className='element'>
      <p>Editable</p>
      <div className="text-window">
        <div className="-gutter"></div>
        <div className="-text">
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
    </div>
  )
}

export default Editable