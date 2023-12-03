const {MongoClient} = require('mongodb');

const client=new MongoClient('mongodb://127.0.0.1:27017')

async function insert(d){

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('inventory');

    const result=await collection.find(d).toArray();
    if(result.length>0){
        return('inventory already exist');
    } else{
        const res=await collection.insertOne(d);
        return('new inventory created');
    }
}

async function update(d){ 

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('inventory');

    const result=await collection.find({'num':d.num}).toArray();
    console.log(result);
    if(result.length>0){
        const res=await collection.updateOne({'num':d.num},{$set:{'productname':d.newproductname}});
        console.log(res);
        return('product name updated');
    } else{
        return('no inventory found');
    }
}

async function remove(d){ 

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('inventory');

    const result=await collection.find(d).toArray();
    if(result.length>0){
        const res=await collection.deleteOne(d);
        console.log(res);
        return('inventory deleted');
    } else{
        return('no inventory found');
    }
}

module.exports={
    insert,
    update,
    remove
}