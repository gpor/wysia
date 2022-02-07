import { useState, useEffect, useRef } from 'react'



function Foo() {
  const [formData, setFormData] = useState({message:'', signoff:'bye'})
  const { message, signoff } = formData
  const count = useRef(0)
    
  useEffect(() => {
    console.log('loaded Foo()')
  }, [])
  useEffect(() => {
    count.current++;
    console.log(count.current)
  })
  useEffect(() => {
    console.log('message', message)
  }, [message])
    
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
    
  return (
    <div className="foo">
      <h1>Foo</h1>
      <p>The quick brown fox jumps over the lazy dog. I quickly packed my lunch box for the zoo with grapes, veal, and quince jam sandwiches</p>
            
      <h2>Message {message}</h2>
      <br />
      <input
        value={message}
        name="message"
        onChange={onChange}
      />
            
      <h2>Sign off {signoff}</h2>
      <br />
      <input
        value={signoff}
        name="signoff"
        onChange={onChange}
      />
    </div>
  )
}

export default Foo