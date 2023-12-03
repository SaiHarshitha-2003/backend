const {MongoClient} = require('mongodb');

const client=new MongoClient('mongodb://127.0.0.1:27017')

async function insert(d){

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('students');

    const result=await collection.find(d).toArray();
    if(result.length>0){
        return('student already exist');
    } else{
        const res=await collection.insertOne(d);
        return('new student created');
    }
}

async function read(d){

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('students');

    const result=await collection.find(d).toArray();
    if(result.length>0){
        return(result);
    } else{
        return('no student found');
    }
}

module.exports={
    insert,
    read
}