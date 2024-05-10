const Joi = require('joi');
const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image=Joi.string().uri();

const createElementSchema = Joi.object({ name: name.required(), price: price.required() ,image:image.required()});
const updateElementSchema = Joi.object({ name: name.required(), price: price.required(), image:image.required() });
const updateElementSchemaName = Joi.object({ name: name.required() });
const getElementSchema = Joi.object({ id: id.required() });

module.exports = { createElementSchema, updateElementSchema, getElementSchema, updateElementSchemaName }