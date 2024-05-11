const boom = require("@hapi/boom")
const ClientMongodb = require('./../libs/ClientMongodb');
        
class AimedAtService {

    async find() {
        const { collection, client } = await ClientMongodb('dirigido_a');
        const response = await collection.find({}).toArray();
        client.close();
        return response;
    }

}
module.exports = AimedAtService;