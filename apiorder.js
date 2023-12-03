const express=require('express');
const url=require('url')
const {insert,read,update,remove}=require('./dborder');

var api=express();

api.get('/',function(){
    console.log('API Server Started');
});

api.get('/insert',async function(req,res){
    var urldata=url.parse(req.url,true);
    var ordernum=urldata.query.ordernum;
    var products=urldata.query.products;
    var totalamt=urldata.query.totalamt;
    var custname=urldata.query.custname;
    var status=urldata.query.status

    mquery={'ordernum':ordernum,'products':products,'totalamt':totalamt,'custname':custname,'status':status};
    const result=await insert(mquery);
    res.send(result);
});

api.get('/read',async function(req,res){
    var urldata=url.parse(req.url,true);
    var totalamt=urldata.query.totalamt;
    
    mquery={'totalamt':totalamt};

    const result=await read(mquery);
    res.send(result);
});

api.get('/update',async function(req,res){
    var urldata=url.parse(req.url,true);
    var ordernum=urldata.query.ordernum;
    var newstatus=urldata.query.newstatus;

    mquery={'ordernum':ordernum,'newstatus':newstatus};
    const result=await update(mquery);
    res.send(result);
});

api.get('/remove',async function(req,res){
    var urldata=url.parse(req.url,true);
    var ordernum=urldata.query.ordernum;

    mquery={'ordernum':ordernum};
    const result=await remove(mquery);
    res.send(result);
});
api.listen(2007,function(){
    console.log('API Server Started')
});