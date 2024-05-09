const faker = require('faker'); 

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
                name: faker.commerce.productName()
            }); 
        } 
    }

    create() { }

    find() { 
        return this.elements; 
    }

    findOne(id) { 
        return this.elements.find(item => item.id === id); 
    }

    update() { }
    delete() { }
}
module.exports = ElementsService;