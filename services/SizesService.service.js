const boom = require("@hapi/boom")
const ClientMongodb = require('./../libs/ClientMongodb');
        
class SizesService {

    async find() {
        const { collection, client } = await ClientMongodb('tallas');
        const response = await collection.find({}).toArray();
        client.close();
        return response;
    }

}
module.exports = SizesService;