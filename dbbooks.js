const {MongoClient} = require('mongodb');

const client=new MongoClient('mongodb://127.0.0.1:27017')

async function insert(d){

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('books');

    const result=await collection.find(d).toArray();
    if(result.length>0){
        return('book already exist');
    } else{
        const res=await collection.insertOne(d);
        return('new book created');
    }
}

async function read(d){

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('books');

    const result=await collection.find(d).toArray();
    if(result.length>0){
        return(result);
    } else{
        return('no book found');
    }
}
async function update(d){ 

    await client.connect();

    const db=client.db('kits');
    const collection=db.collection('books');

    const result=await collection.find({'title':d.title}).toArray();
    console.log(result);
    if(result.length>0){
        const res=await collection.updateOne({'title':d.title},{$set:{'author':d.newauthor}});
        console.log(res);
        return('author updated');
    } else{
        return('no book found');
    }
}

async function remove(d){ 
    try {
        await client.connect();

        const db = client.db('kits');
        const collection = db.collection('books');

        const result = await collection.find({ 'year': d.year }).toArray();
        
        if (result.length > 0) {
            let deletedBooksCount = 0;
            
            for (const book of result) {
                if (book.year < d.year) {
                    const res = await collection.deleteOne({ _id: book._id }); // Assuming you have an _id field
                    console.log(res);
                    deletedBooksCount++;
                }
            }

            if (deletedBooksCount > 0) {
                return 'book(s) deleted';
            } else {
                return 'no book found with a year less than ' + d.year;
            }
        } else {
            return 'no book found';
        }
    } catch (error) {
        console.error(error);
        return 'error occurred'; // Handle the error appropriately
    } finally {
        client.close(); // Close the MongoDB client connection when done
    }
}
module.exports={
    insert,
    read,
    update,
    remove
}