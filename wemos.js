const http = require('http');

class Wemos {

    constructor(address, id) {
        this.address = address;
        this.id = id
    }


    id = id => this.id = id;


    powerOn = () => {

        return new Promise((res, rej) => {
            http.get(`http://${this.address}/Relay=ON`, (resp) => {
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


    powerOff = () => {
        return new Promise((res, rej) => {

            http.get(`http://${this.address}/Relay=OFF`, (resp) => {
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
        console.log('preguntando...')
        return new Promise((res, rej) => {

            http.get(`http://${this.address}/Status`, (resp) => {
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
}

module.exports = Wemos;