var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var sha256 = require('sha256');
var app=express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var array=[];
var nuance;

app.post('/initpow',(req,res)=>{
    //nuance = req.body.nuance;
    request.post({url:'http://localhost:2000/pow',form :{ "data": {
        "nuance" : "",
        "body" : req.body.body
    },
    "hash":sha256(req.body.body+req.body.nuance)
    }},function(err,data,httpres){
        console.log(data.body);
        if(data.nuance==req.body.nuance){
        if(array.length==0){
            request.post({url:'http://localhost:2000/win',form :{'status':'win'}});
            array.push("number 2 won");
        }
        else request.post({url:'http://localhost:2000/win',form :{'status':'wrong nuance'}});
    }
    });

    app.post('/initpow',(req,res)=>{
        //nuance = req.body.nuance;
        request.post({url:'http://localhost:1000/pow',form :{ "data": {
            "nuance" : "",
            "body" : req.body.body
        },
        "hash":sha256(req.body.body+req.body.nuance)
        }},function(err,data,httpres){
            console.log(data.body);
            if(data.nuance==req.body.nuance){
            if(array.length==0){
                request.post({url:'http://localhost:1000/win',form :{'status':'win'}});
                array.push("number 1 won");
            }
            else request.post({url:'http://localhost:1000/win',form :{'status':'wrong nuance'}});
        }
        });
});

app.listen(3000,()=>{
    console.log('ITS Machine started');
});