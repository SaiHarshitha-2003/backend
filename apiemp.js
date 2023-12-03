const express=require('express');
const url=require('url')
const {insert,read,update,remove}=require('./dbemp');

var api=express();

api.get('/',function(){
    console.log('API Server Started');
});

api.get('/insert',async function(req,res){
    var urldata=url.parse(req.url,true);
    var name=urldata.query.name;
    var position=urldata.query.position;
    var salary=urldata.query.salary;
    var hireDate=urldata.query.hireDate;

    mquery={'name':name,'position':position,'salary':salary,'hireDate':hireDate};
    const result=await insert(mquery);
    res.send(result);
});

api.get('/read',async function(req,res){

    mquery=({});
    const result=await read(mquery);
    res.send(result);
});

api.get('/update',async function(req,res){
    var urldata=url.parse(req.url,true);
    var position=urldata.query.position;
    var newsalary=urldata.query.newsalary;

    mquery={'position':position,'newsalary':newsalary};
    const result=await update(mquery);
    res.send(result);
});

api.get('/remove',async function(req,res){
    var urldata=url.parse(req.url,true);
    var name=urldata.query.name;

    mquery={'name':name};
    const result=await remove(mquery);
    res.send(result);
});
api.listen(2004,function(){
    console.log('API Server Started')
});