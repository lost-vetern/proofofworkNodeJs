var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var sha256 =require('sha256');
var app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//request to rsa2
app.post('/pow',(req,res)=>{
    for(i=1; i<=100;i++){
        if(req.body.hash==sha256(req.body.data.body+i))
        res.json({nuance:i});        
    }
});

app.post('/win',(req,res)=>{
    console.log(req.body.status);
});

app.listen(2000,()=>{
    console.log('node 2 started');
});