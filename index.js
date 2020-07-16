const http=require("http");
const express = require('express');
const app = express();
const server=http.createServer(app);
const websokcet = require("ws");
const wss = new websokcet.Server({server:server,path:'/picam'});

app.get("/",function(req,res){
    res.end("workinnnnnnnnnnnng")
})

wss.broadcast = function broadcast(msg) {
    wss.clients.forEach(function each(client) {
        client.send(msg);
     });
};

wss.on('connection',(ws)=>{
    ws.on('message',(msg)=>{
        wss.broadcast(msg);
    })
})

server.listen(process.env.PORT)