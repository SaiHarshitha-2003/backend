const {MongoClient} = require('mongodb');

const client=new MongoClient('mongodb://127.0.0.1:27017')

async function insert(d)
{
    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('orders');

    const result=await collection.find(d).toArray();
    if(result.length>0)
    {
        return('order already exist');
    } 
    else{
        const res=await collection.insertOne(d);
        return('new order created');
    }
}

async function read(d){

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('orders');

    const result=await collection.find(d).toArray();
    if(result.length>0){
        return(result);
    } else{
        return('no order found');
    }
}

async function update(d){ 

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('orders');

    const result=await collection.find({'ordernum':d.ordernum}).toArray();
    console.log(result);
    if(result.length>0){
        const res=await collection.updateOne({'ordernum':d.ordernum},{$set:{'status':d.newstatus}});
        console.log(res);
        return('status updated');
    } else{
        return('no record found');
    }
}

async function remove(d){ 

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('orders');

    const result=await collection.find(d).toArray();
    if(result.length>0){
        const res=await collection.deleteOne(d);
        console.log(res);
        return('order deleted');
    } else{
        return('no order found');
    }
}

module.exports={
    insert,
    read,
    update,
    remove
}