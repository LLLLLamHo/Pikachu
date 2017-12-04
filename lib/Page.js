const path = require( 'path' );
const fs = require( 'fs' );
const Pikachu = require( './Pikachu' );


class Page {
    /**
     * @param {object} options 
     * @returns Buffer/false
     * @memberof Page
     */
    async cutPDF( options ) {

        let defaultOpt = { printBackground: true };
        
        let newOpt = Object.assign( defaultOpt, options );

        return new Promise( async ( resolve, rejuect ) => {
            const PDF_PATH = options.path[0] == '/' ? options.path : path.join( process.cwd(), options.path );

            try {
                let pdf_buffer = await this.pdf( newOpt );
                await this.delay( 500 );
                let result = await fs.existsSync( PDF_PATH );
                if ( result ) {
                    resolve( 'create pdf success!' );
                } else {
                    rejuect( `create pdf err! no find the pdf file, the pdf path is ${PDF_PATH}` );
                }
            } catch ( err ) {
                rejuect( `error: puppeteer api page.pdf use error,the message: ${err}` );
            }
        } )
            .then( (pdf_buffer) => {
                return pdf_buffer;
            } )
            .catch( ( err ) => {
                console.log( err );
                return false;
            } )

    }

}


/**
 * 对page进行二次封装，增强能力
 * @param {object} pageObj 
 * @returns pageObj
 */
function extend_page( pageObj ) {
    let page = new Page();
    page.__proto__.__proto__ = pageObj;
    return page;

}



module.exports = extend_page;