const wemos = require('./wemos')

class Manager {

    constructor() {
        this.slaves = [];
    }

    addSlave = (address) => {
        this.slaves.push(new wemos(address));
    }

    slave = (address) => {
        return this.slaves.find(item => item.address == address);
    }

    viewSlaves = () => {
        console.log(this.slaves)
    }

}

m = new Manager();
m.addSlave('192.168.0.3');
m.addSlave('192.168.0.105');

m.viewSlaves();


module.exports = Manager;