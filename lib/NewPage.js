
const extend_page = require( '../utils/extend_page' );

class NewPage {

    /**
     * @static 打开页面
     * @param {obj} browser 
     * @returns pageObj
     * @memberof Page
     */
    static openPage( browser ) {
        return new Promise( async ( resolve, rejuect ) => {
            let page = await browser.newPage( browser );
            await resolve( page );
        } )
            .then( page => {
                // extends page
                return extend_page(page);
            } )
    }

}

module.exports = NewPage;