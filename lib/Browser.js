const puppeteer = require( 'puppeteer' );
const devices = require( 'puppeteer/DeviceDescriptors' );
const iPhone = devices['iPhone 6'];


class Browser {

    constructor(...args) { 
        this.openOptions = args[0];
    }

    /**
     * @static
     * @param {Object} option 
     * @memberof Launcher
     */
    async open( option ) {
        return await puppeteer.launch( this.option )
            .then( async browser => {
                this._b = browser;
                return browser;
            } );
    }

}

module.exports = Browser;