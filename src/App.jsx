import { useRef, useState } from 'react'
import { Auth } from './components/Auth'
import { auth } from './config/firebase'


import Cookies from 'universal-cookie'
import { Chat } from './components/Chat'
const cookies = new Cookies()


function App() {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [room, setRoom] = useState('')

  const roomInputRef = useRef()

  const handleSignOut = () => {
    auth.signOut()
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }
  
  if(!isAuth) {
    return (
      <div className="App">
        <Auth setIsAuth={setIsAuth}/>
      </div>
    )
  }

  return (
    <div>
      {room ? <Chat room={room}/> : 
      <div className='room'>
          <label htmlFor="">Enter Room Name</label>
          <input type="text" ref={roomInputRef}/>
          <button onClick={() => setRoom(roomInputRef.current.value)}>
            Enter Chat
          </button>
      </div> 
      }
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default App
