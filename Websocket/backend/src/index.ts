import express from 'express'
import WebSocket,{ WebSocketServer } from 'ws'


const app = express();
const httpserver = app.listen(3000)

const wss = new WebSocketServer({server:httpserver})

wss.on("connection", (socket)=>{
    socket.on("error", console.error)

    socket.on("message", function message(data, isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN){
                client.send(data,{binary : isBinary})
            }
        })
    })
    socket.send('Hello! Message From Server!!');
})
