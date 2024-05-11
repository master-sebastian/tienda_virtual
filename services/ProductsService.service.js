const boom = require("@hapi/boom")
const ClientMongodb = require('./../libs/ClientMongodb');
const ObjectId = require('mongodb').ObjectId;        
class ProductsService {
    
    getOptionsLoop(){
        return [
            {$lookup: {from: "categorias", localField: "categoria_id", foreignField: "_id", as: "categoria" }},
            {$lookup: {from: "tallas", localField: "talla_id", foreignField: "_id", as: "talla" }},
            {$lookup: {from: "dirigido_a", localField: "dirigido_a_id", foreignField: "_id", as: "dirigido_a" }},
            {$lookup: {from: "informacion_whatsapp", localField: "conctato_whatsapp_id", foreignField: "_id", as: "contacto_whatsapp" }}
        ]
    }
    async find() {
        const { collection, client } = await ClientMongodb('productos');
        const response = await collection.aggregate([...this.getOptionsLoop()]).toArray();
        client.close();
        return response;
    }

    async findOne(id) {
        console.log(id)
        const { collection, client } = await ClientMongodb('productos');
        //findOne({_id: new ObjectId(id)})
        const response = await collection.aggregate([{ $match : { _id : new ObjectId(id) } }, ...this.getOptionsLoop()]).toArray();
        client.close();
        return response;
    }

    async create(data) {
        data.categoria_id = new ObjectId(data.categoria_id);
        data.talla_id = new ObjectId(data.talla_id);
        data.dirigido_a_id = new ObjectId(data.dirigido_a_id);
        data.conctato_whatsapp_id = new ObjectId(data.conctato_whatsapp_id);

        const { collection, client } = await ClientMongodb('productos');
        const response = await collection.insertOne(data);
        client.close();
        return response;
    }

    async update(id, data) {
        console.log(id)
        data.categoria_id = new ObjectId(data.categoria_id);
        data.talla_id = new ObjectId(data.talla_id);
        data.dirigido_a_id = new ObjectId(data.dirigido_a_id);
        data.conctato_whatsapp_id = new ObjectId(data.conctato_whatsapp_id);
        const { collection, client } = await ClientMongodb('productos');
        const response = await collection.updateOne({_id: new ObjectId(id)}, { $set: data});
        client.close();
        return response;
    }

    async delete(id) {
        console.log(id)
        const { collection, client } = await ClientMongodb('productos');
        const response = await collection.deleteOne({_id: new ObjectId(id)});
        client.close();
        return response;
    }
}
module.exports = ProductsService;