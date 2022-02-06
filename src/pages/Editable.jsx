
import {useState} from 'react'

function Editable({value}) {
  const [val, setVal] = useState(value)
  
  console.log('value', value, val)

  const onChange = (e) => {
    setVal(e.target.value)
  }

  return (
    <div className='editable'>
      <p>Editable</p>
      <div className="text-window">
        <div class="-gutter"></div>
        <div class="-text">
          <h4
            contenteditable="true"
            onChange={onChange}
          >{val}</h4>
        </div>
      </div>
    </div>
  )
}

export default Editable