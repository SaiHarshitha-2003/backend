const express=require('express');
const url=require('url')
const {insert,read,update,remove}=require('./dbbooks');

var api=express();

api.get('/',function(req,res){
    console.log('API Server Started');
});

api.get('/insert',async function(req,res){
    var urldata=url.parse(req.url,true);
    var title=urldata.query.title;
    var author=urldata.query.author;
    var genre=urldata.query.genre;
    var year=urldata.query.year;

    mquery={'title':title,'author':author,'genre':genre,'year':year};
    const result=await insert(mquery);
    res.send(result);
});

api.get('/read',async function(req,res){
    var urldata=url.parse(req.url,true);
    var genre=urldata.query.genre;
    mquery={'genre':genre};
    const result=await read(mquery);
    res.send(result);
});

api.get('/update',async function(req,res){
    var urldata=url.parse(req.url,true);
    var title=urldata.query.title;
    var newauthor=urldata.query.newauthor;

    mquery={'title':title,'newauthor':newauthor};
    const result=await update(mquery);
    res.send(result);
});

api.get('/remove',async function(req,res){
    var urldata=url.parse(req.url,true);
    var year=urldata.query.year;

    mquery={'year':year};
    const result=await remove(mquery);
    res.send(result);
});
api.listen(2005,function(){
    console.log('API Server Started')
});