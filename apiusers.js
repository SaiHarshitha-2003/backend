const express=require('express');
const url=require('url')
const {insert,read,update,remove}=require('./dbusers');

var api=express();

api.get('/',function(){
    console.log('API Server Started');
});

api.get('/insert',async function(req,res){
    var urldata=url.parse(req.url,true);
    var username=urldata.query.username;
    var password=urldata.query.password;
    var email=urldata.query.email;

    mquery={'username':username,'password':password,'email':email};
    const result=await insert(mquery);
    res.send(result);
});

api.get('/read',async function(req,res){
    var urldata=url.parse(req.url,true);
    var email=urldata.query.email;

    mquery={'email':email};
    const result=await read(mquery);
    res.send(result);
});

api.get('/update',async function(req,res){
    var urldata=url.parse(req.url,true);
    var username=urldata.query.username;
    var newpassword=urldata.query.newpassword;

    mquery={'username':username,'newpassword':newpassword};
    const result=await update(mquery);
    res.send(result);
});

api.get('/remove',async function(req,res){
    var urldata=url.parse(req.url,true);
    var email=urldata.query.email;

    mquery={'email':email};
    const result=await remove(mquery);
    res.send(result);
});
api.listen(2003,function(){
    console.log('API Server Started')
});