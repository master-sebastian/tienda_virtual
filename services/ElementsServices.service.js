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

    find() { 
        return this.elements; 
    }

    findOne(id) { 
        return this.elements.find(item => item.id === id); 
    }

    create(data){
        const newElement= {
            id:faker.datatype.uuid(), 
            ...data
        }
        this.elements.push(newElement);
        return newElement;
    }

    update(id, changes){
        const index = this.elements.findIndex(item=>item.id===id);
        if(index === -1){
            throw new Error('Element not found');
        }
        const element = this.elements[index];
        this.elements[index] = {...element,...changes};
        return this.elements[index];
    }

    delete(id){
        const index=this.elements.findIndex(item=>item.id===id);
        if(index===-1){
            throw new Error('Element not found');
        }
        this.elements.splice(index,1);return{id};
    }
}
module.exports = ElementsService;