import { useState } from 'react'
import './App.css'
const App = ()=>{
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")

  const submitForm = ()=>{
    alert("Form is Submitted")
  }
  return(
    <>
      <div className='container'>
        <form action="" onSubmit={submitForm}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" autoComplete="off" value={email} 
              onChange={(e)=> setEmail(e.target.value)} required
            />
          </div>
          <div>
            <label htmlFor="pass">Password</label>
            <input type="text" name="pass" id="pass" autoComplete="off" value={pass}
              onChange={(e)=> setPass(e.target.value)} required
            />
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  )
}
export default App