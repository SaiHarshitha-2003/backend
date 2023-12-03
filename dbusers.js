const {MongoClient} = require('mongodb');

const client=new MongoClient('mongodb://127.0.0.1:27017')

async function insert(d){

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('users');

    const result=await collection.find(d).toArray();
    if(result.length>0){
        return('user already exist');
    } else{
        const res=await collection.insertOne(d);
        return('new user created');
    }
}

async function read(d){

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('users');

    const result=await collection.find(d).toArray();
    if(result.length>0){
        return(result);
    } else{
        return('no user found');
    }
}

async function update(d){ // {'username':'madhu','newpassword':'1234'}

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('users');

    const result=await collection.find({'username':d.username}).toArray();
    console.log(result);
    if(result.length>0){
        const res=await collection.updateOne({'username':d.username},{$set:{'password':d.newpassword}});
        console.log(res);
        return('password updated');
    } else{
        return('no user found');
    }
}

async function remove(d){ // {'email':'madhu'}

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('users');

    const result=await collection.find(d).toArray();
    if(result.length>0){
        const res=await collection.deleteOne(d);
        console.log(res);
        return('user deleted');
    } else{
        return('no user found');
    }
}

module.exports={
    insert,
    read,
    update,
    remove
}