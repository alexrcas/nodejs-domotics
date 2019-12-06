const wemos = require('./wemos')
const fs = require('fs');

class Manager {

    constructor() {
        this.slaves = [];
        this.id = 0;
        //ID debe iniciarse al último ID del json
        //fs.appendFileSync('./slaves.json', '[]');
        //Solamente si NO existe. Comprobar primero.
        this.loadControllers();
    }


    addSlave = (address) => {
        this.slaves.push(new wemos(address, this.id));
        this.register(address);
    }


    slave = (id) => {
        return this.slaves.find(item => item.id == id);
    }

    getSlaves = () => {
        return this.slaves;
    }


    register = (address) => {
        //De forma asíncrona
        let jsonFile = fs.readFile('./slaves.json', (err, rawData) => {
        let data = JSON.parse(rawData);

        if (!(data.find(item => item.address == address))) {
            data.push({'address': address, 'id': this.id});
            this.id++;
        }
        
        fs.writeFile('./slaves.json', JSON.stringify(data), (err) => {})
        });
    }


    loadControllers = () => {
        //De forma síncrona
        let jsonFile = fs.readFileSync('./slaves.json');
        let controllers = JSON.parse(jsonFile);
        controllers.forEach(item => {
            this.slaves.push(new wemos(item.address, item.id));
        });
    }
}

module.exports = Manager;