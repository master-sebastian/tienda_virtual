const boom = require("@hapi/boom")
const ClientMongodb = require('./../libs/ClientMongodb');
        
class AuthService {

    async verify({user, password}) {
        const { collection, client } = await ClientMongodb('usuarios');
        const response = await collection.find({gmail: user, contraseña: password}).toArray();
        client.close();
        return response.length > 0;
    }
}
module.exports = AuthService;