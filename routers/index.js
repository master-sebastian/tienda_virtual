const servicios1 = require('./servicios1.router');

module.exports = (app) => {
    app.use("/servicios1", servicios1)
}