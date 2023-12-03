const express=require('express');
const url=require('url')
const {insert,update,remove}=require('./dbinv');

var api=express();

api.get('/',function(){
    console.log('API Server Started');
});

api.get('/insert',async function(req,res){
    var urldata=url.parse(req.url,true);
    var num=urldata.query.num;
    var productname=urldata.query.productname;

    mquery={'num':num,'productname':productname};
    const result=await insert(mquery);
    res.send(result);
});

api.get('/update',async function(req,res){
    var urldata=url.parse(req.url,true);
    var num=urldata.query.num;
    var newproductname=urldata.query.newproductname;

    mquery={'num':num,'newproductname':newproductname};
    const result=await update(mquery);
    res.send(result);
});

api.get('/remove',async function(req,res){
    var urldata=url.parse(req.url,true);
    var num=urldata.query.num;

    mquery={'num':num};
    const result=await remove(mquery);
    res.send(result);
});
api.listen(2008,function(){
    console.log('API Server Started')
});