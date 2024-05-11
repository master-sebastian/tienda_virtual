const boom = require("@hapi/boom")
const ClientMongodb = require('./../libs/ClientMongodb');
        
class CategoriesService {

    async find() {
        const { collection, client } = await ClientMongodb('categorias');
        const response = await collection.find({}).toArray();
        client.close();
        return response;
    }

}
module.exports = CategoriesService;