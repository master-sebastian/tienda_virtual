const faker = require('faker'); 
const boom = require("@hapi/boom")

class ElementsService {
    
    constructor() { 
        this.elements = []; 
        this.generate(); 
    }

    generate() { 
        const limit = 100; 
        for (let index = 0; index < limit; index++) { 
            this.elements.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
                isBlock: faker.datatype.boolean()
            }); 
        } 
    }

    async find() { 
        return this.elements; 
    }

    async findOne(id) {
        const element = this.elements.find(item => item.id === id);
        if(element === undefined){
            return null;
        }
        return element; 
    }

    async create(data){
        const newElement= {
            id:faker.datatype.uuid(), 
            ...data
        }
        this.elements.push(newElement);
        return newElement;
    }

    async update(id, changes){
        const index = this.elements.findIndex(item=>item.id===id);
        if(index === -1){
            throw boom.notFound('Element not found');
        }
        const element = this.elements[index];
        this.elements[index] = {...element,...changes};
        return this.elements[index];
    }

    async delete(id){
        const index=this.elements.findIndex(item=>item.id===id);
        if(index===-1){
            throw boom.notFound('Element not found');
        }
        this.elements.splice(index,1);return{id};
    }
}
module.exports = ElementsService;