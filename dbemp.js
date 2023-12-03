const {MongoClient} = require('mongodb');

const client=new MongoClient('mongodb://127.0.0.1:27017')

async function insert(d){

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('employees');

    const result=await collection.find(d).toArray();
    if(result.length>0){
        return('employee already exist');
    } else{
        const res=await collection.insertOne(d);
        return('new employee created');
    }
}

async function read(d){

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('employees');

    const result=await collection.find(d).toArray();
    if(result.length>0){
        return(result);
    } else{
        return('no employee found');
    }
}
async function update(d){ 

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('employees');

    const result=await collection.find({'position':d.position}).toArray();
    console.log(result);
    if(result.length>0){
        const res=await collection.updateOne({'position':d.position},{$set:{'salary':d.newsalary}});
        console.log(res);
        return('salary updated');
    } else{
        return('no employee found');
    }
}

async function remove(d){ 

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('employees');

    const result=await collection.find(d).toArray();
    if(result.length>0){
        const res=await collection.deleteOne(d);
        console.log(res);
        return('employee deleted');
    } else{
        return('no employee found');
    }
}

module.exports={
    insert,
    read,
    update,
    remove
}