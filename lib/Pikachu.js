
const Test = require( './Test' );
const Error = require( './Error' );
const devices = require( 'puppeteer/DeviceDescriptors' );
const chai = require( 'chai' );
const puppeteer = require( 'puppeteer' );
const Browser = require('./Browser');


class Pikachu {

    /**
     * @static 开启浏览器
     * @param {!Object=} options 
     * @returns {!Promise<!Browser>}
     * @memberof Pikachu
     */
    static openBrowser( options = {} ) {

        return new Promise( async ( resolve, reject ) => {

            let defaultOpt = {
                headless: false,
                devtools: true
            }

            let opt = Object.assign( defaultOpt, options );

            //实例浏览器对象
            let browserObj = await puppeteer.launch( opt );
            await resolve( Browser( browserObj,opt ) );
        } );
    }

    /**
    * @static 对mocha的describe进行封装
    * @param {string,object} title 
    * @param {function} fn 
    */
    static startText( ...args ) {
        Test.describe( args[0], args[1] );
    }

    /**
     * @static 断言封装
     * @param {any} param 
     * @returns expect
     * @memberof Pikachu
     */
    static expect( param ) {
        return chai.expect( param );
    }

}

module.exports = Pikachu;