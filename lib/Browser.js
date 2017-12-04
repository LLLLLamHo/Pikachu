const devices = require( 'puppeteer/DeviceDescriptors' );
const iPhone = devices['iPhone 6'];
const Page = require( './Page' );
const Error = require( './Error' );
class Browser {

    constructor( ...args ) {
        this.openOptions = args[0];
    }
    
    /**
     * @static 延迟执行
     * @param {number} delayTime 
     * @returns null
     * @memberof WorkBox
     */
    async delay( delayTime ) {
        return new Promise( ( resolve, reject ) => {
            setTimeout( () => {
                try {
                    resolve( 1 )
                } catch ( e ) {
                    reject( 0 )
                }
            }, delayTime )
        } )
    }

    /**
     * 打开新页面
     * @param {string request} pageName 
     * @param {object} [options={viewType,url}] 
     * @returns 
     * @memberof Browser
     */
    async openPage( pageName, options = {} ) {
        return new Promise( async ( resolve, rejuect ) => {

            if ( !pageName ) {

                await Error( 'Error: When using the Pikachu.newPage,param pageName is request and must be a string' );

            } else {

                let page = await this.newPage();
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
                let strongPage = Page( page );
                //赋值延迟函数
                strongPage.delay = this.delay;
                // extends page
                return strongPage;
            } )
    }

    /**
     * 创建pageList对象
     * @memberof WorkBox
     */
    createPageList() {
        return new Promise( ( resolve, reject ) => {
            this._pageList = this._pageList ? this._pageList : {};
            resolve();
        } )
    }

    /**
     * 获取列表中的page对象
     * @param {string} pageName 
     * @returns pageObj
     * @memberof Browser
     */
    async getPageFromList( pageName = '' ) {

        if ( pageName == '' ) {
            await Error( 'Error: When using the getPageFromList,param pageName is request and must be a string' );
        } else {
            return new Promise( ( resolve, reject ) => {
                let page = this._pageList[pageName] ? this._pageList[pageName] : null
                resolve( page );
            } )
                .then( ( page ) => {
                    return page;
                } )
        }
    }

    /**
     * 记录page对象
     * @param {any} pageName 
     * @param {any} pageObj 
     * @returns 
     * @memberof WorkBox
     */
    savePageToList( pageName, pageObj ) {
        return new Promise( ( resolve, reject ) => {
            if ( this._pageList ) {
                this._pageList[pageName] = pageObj;
                resolve();
            } else {
                this.createPageList()
                    .then( () => {
                        this._pageList[pageName] = pageObj;
                        resolve();
                    } );
            }
        } )
    }

    /**
     * 删除对象
     * @param {string} pageName 
     * @memberof WorkBox
     */
    removePageFromList( pageName ) {
        return new Promise( async ( resolve, reject ) => {
            if ( this._pageList[pageName] ) {
                delete this._pageList[pageName];
                resolve();
            } else {
                Error( `Error: curr page name ${pageName}. please transmit this pageName.` );
            }
        } )
    }

}


/**
 * 对Browser进行二次封装，增强能力
 * @param {object} browserObj 
 * @returns browserObj
 */
function extend_browser( browserObj, options ) {
    let browser = new Browser( options );
    browser.__proto__.__proto__ = browserObj;
    return browser;

}



module.exports = extend_browser;