const http = require('http');

class Wemos {

    constructor(address, MAC) {
        this.address = address;
        this.MAC = MAC
    }


    MAC = MAC => this.MAC = MAC;


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