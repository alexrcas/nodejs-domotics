const Gpio = require('onoff').Gpio;

class Controller {

    constructor () {
        this.led = new Gpio(4, 'out');
    }

    powerOn = ( ) => {
        console.log('on');
        this.led.writeSync(1);
        return this.led.readSync();
    }

    powerOff = () => {
        console.log('off');
        this.led.writeSync(0);
        return this.led.readSync();
    }

    toggle = () => {
        console.log('toggle');
        if (this.led.readSync() == 1)
            return this.powerOff();
        else
            return this.powerOn();
    }

    status = () => {
        console.log('status');
        return this.led.readSync();
    }

}

module.exports = Controller;