const http=require("http");
const express = require('express');
const app = express();
const rtsp = require('rtsp-ffmpeg');
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
        stream = new rtsp.FFMpeg({input:data.toString()});
        stream.on('data',function(data){wss.broadcast(data.toString('base64'))})
    })
})

server.listen(process.env.PORT || 8001);