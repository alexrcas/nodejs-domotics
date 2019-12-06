const wemos = require('./wemos')
const fs = require('fs');

class Manager {

    constructor() {
        this.slaves = [];
    }

    addSlave = (address) => {
        this.slaves.push(new wemos(address));
        this.register(address);
    }

    slave = (address) => {
        return this.slaves.find(item => item.address == address);
    }

    init = () => {
        fs.appendFileSync('slaves.json', 'hola', err => {

        });
    }

    register = (address) => {
        
    }

}

module.exports = Manager;