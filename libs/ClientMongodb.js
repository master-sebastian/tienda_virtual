const { MongoClient } = require('mongodb');
const url = process.env.URI_DB_MONGODB_ATLAS;
module.exports = async (doc)=>{
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(process.env.NAME_DB_MONGODB_ATLAS);
    const collection = db.collection(doc);
    return { collection, client };
}