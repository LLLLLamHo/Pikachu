
const Browser = require( './Browser' );
const NewPage = require( './NewPage' );
const Test = require( './Test' );
const WorkBox = require( '../lib/WorkBox' );
const Error = require( './Error' );
const devices = require( 'puppeteer/DeviceDescriptors' );
const chai = require( 'chai' );



class Pikachu extends WorkBox {

    /**
     * @static 开启浏览器
     * @param {!Object=} options 
     * @returns {!Promise<!Browser>}
     * @memberof Pikachu
     */
    static openBrowser( options = {} ) {

        return new Promise( async ( resolve, reject ) => {

            let defauleOpt = {
                headless: false,
                devtools: true
            }

            let opt = Object.assign( defauleOpt, options );

            //实例浏览器对象
            let __b = new Browser( opt );
            //保存在pikachu内部
            //开启浏览器 
            this._browser = await __b.open();
            //储存Browser实例对象
            this.__b = __b;
            await resolve( this._browser );
        } );
    }

    /**
     * @static 打开一个新页面
     * @param {string,request} pageName 
     * @param {{
     *    viewType  string|object
     *    url       string
     * }} [options={}] 
     * @returns page
     * @memberof Pikachu
     */
    static async newPage( pageName, options = {} ) {

        return new Promise( async ( resolve, reject ) => {


            if ( !pageName ) {

                await Error( 'Error: When using the Pikachu.newPage,param pageName is request and must be a string' );

            } else {

                let page = await NewPage.openPage( this._browser );

                // 当传入viewType的时候,设置emulate
                if ( options.viewType ) {
                    if ( typeof options.viewType == 'string' ) {
                        await page.emulate( devices[options.viewType] );
                    }
                    if ( typeof options.viewType == 'object' ) {
                        await page.emulate( options.viewType );
                    }
                }

                // 当传入了url,对当前page进行跳转
                if ( options.url ) {
                    await page.goto( options.url );
                }

                // 创建page列表记录页面对象
                this.savePageToList( pageName, page );
                await resolve( page );
            }

        } )
            .then( page => {
                return page;
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