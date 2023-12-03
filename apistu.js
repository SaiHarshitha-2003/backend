const express=require('express');
const url=require('url')
const {insert,read}=require('./dbstu');

var api=express();

api.get('/',function(){
    console.log('API Server Started');
});

api.get('/insert',async function(req,res){
    var urldata=url.parse(req.url,true);
    var regdno=urldata.query.regdno;
    var branch=urldata.query.branch;
    var age=urldata.query.age;

    mquery={'regdno':regdno,'branch':branch,'age':age};
    const result=await insert(mquery);
    res.send(result);
});

api.get('/read',async function(req,res){
    var urldata=url.parse(req.url,true);
    var age=urldata.query.age;

    mquery={'age':age};
    const result=await read(mquery);
    res.send(result);
});

api.listen(2006,function(){
    console.log('API Server Started')
});