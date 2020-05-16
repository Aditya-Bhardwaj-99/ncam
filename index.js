const http=require("http");
const express = require('express');
const app = express();
const server=http.createServer(app);
const websokcet = require("ws");
const wss = new websokcet.Server({server:server,path:'/picam'});

app.get('/',function(req,res){
    res.end("on hai bhai")
})

wss.broadcast = function broadcast(msg) {
    console.log(msg);
    wss.clients.forEach(function each(client) {
        client.send(msg);
     });
 };

wss.on('connection',function(ws){
    ws.on('message',function(data){
        wss.broadcast(data);
    })
})

server.listen(process.env.PORT || 8001);