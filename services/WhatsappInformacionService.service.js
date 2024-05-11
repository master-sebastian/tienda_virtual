const boom = require("@hapi/boom")
const ClientMongodb = require('./../libs/ClientMongodb');
        
class WhatsappInformacionService {

    async find() {
        const { collection, client } = await ClientMongodb('informacion_whatsapp');
        const response = await collection.find({}).toArray();
        client.close();
        return response;
    }

}
module.exports = WhatsappInformacionService;