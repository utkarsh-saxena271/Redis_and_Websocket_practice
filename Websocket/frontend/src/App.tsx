import { useEffect, useState } from "react"

const App = () => {
  const [socket, setSocket] = useState<null | WebSocket >(null)
  const [sendMessage, setSendMessage] = useState("")
  const [latestMessage, setLatestMessages] = useState("")
  useEffect(()=>{
    const socket = new WebSocket('ws://localhost:3000');
    socket.onopen = () => {
      console.log('Connected')
      setSocket(socket)
    }
    socket.onmessage = (message) => {
      console.log('Recieved Message : ', message)
      setLatestMessages(message.data)
    }

    return ()=>{
      socket.close()
    }
  },[])

  if(!socket){
    return <div>
      connecting to socket server...
    </div>
  }

  return (
    <div>
      <div>
        {latestMessage}
      </div>

      <input type="text"
      onChange={(e)=>{
        setSendMessage(e.target.value)
      }}
      value={sendMessage}
      />
      <button onClick={()=>{
        socket.send(sendMessage)
        setSendMessage("")
      }}>send</button>
    </div>
  )
}

export default App