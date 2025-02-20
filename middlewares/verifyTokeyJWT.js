const jwt = require("jsonwebtoken");

function verifyTokeyJWT(req, res, next){
    const bearerHeader = req.headers["authorization"];

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;

        jwt.verify(req.token, process.env.SECRET_KEY_JWT, (error, authData) => {
            if(error){
                res.sendStatus(403);
            }else{
                next();
            }
        })
    }else{
        res.sendStatus(403);
    }

}

module.exports = { verifyTokeyJWT }