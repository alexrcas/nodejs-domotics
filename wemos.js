const http = require('http');

class Wemos {

    constructor(address) {
        this.address = address;
    }

    powerOn = () => {
    }

    powerOff = () => {
    }
    
    toggle = () => {
        return new Promise((res, rej) => {

            http.get(`http://${this.address}/Toggle`, (resp) => {
                let data = '';
                resp.on('data', chunk => {
                    data += chunk;
                });
                resp.on('end', () => {
                    res(data);
                });
            });

        })
    }


    status = () => {

    }
}

module.exports = Wemos;