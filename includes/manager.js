const wemos = require('./wemos')
const fs = require('fs');
const EventEmitter = require('events');

class Manager extends EventEmitter {

    constructor() {
        super();
        this.slaves = [];
        //ID debe iniciarse al último ID del json
        //fs.appendFileSync('./slaves.json', '[]');
        //Solamente si NO existe. Comprobar primero.
        this.loadControllers();
    }


    addSlave = (address, MAC) => {
        //Si no existe la MAC es un dispositivo nuevo
        if (!(this.slaves.find(item => item.MAC == MAC))) {
            this.slaves.push(new wemos(address, MAC));
            this.register(address, MAC);
        }
        else { //Si existe, puede que haya actualizado la IP. Sobrescribirla.

        }
    }


    slave = (MAC) => {
        return this.slaves.find(item => item.MAC == MAC);
    }

    getSlaves = () => {
        return this.slaves;
    }

    register = (address, MAC) => {
        //De forma asíncrona
        let jsonFile = fs.readFile('./slaves.json', (err, rawData) => {
        let data = JSON.parse(rawData);

        data.push({'address': address, 'MAC': MAC});
        
        fs.writeFile('./slaves.json', JSON.stringify(data), (err) => {})
        });
    }


    loadControllers = () => {
        //De forma síncrona
        let jsonFile = fs.readFileSync('./slaves.json');
        let controllers = JSON.parse(jsonFile);
        controllers.forEach(item => {
            this.slaves.push(new wemos(item.address, item.MAC));
        });
    }
}

module.exports = Manager;