
const path = require( 'path' );
const fs = require( 'fs' );
const Pikachu = require( './Pikachu' );


class Page {
    /**
     * @param {object} options
     * @returns Buffer/null
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
                return null;
            } )
    }

    /**
     * @static
     * @param {String} selector
     * @return {Object}
     */
    async query( selector ) {
      if ( !selector ) return this;

      let sltHandle = await this.$(selector);

      return await this.evaluate( (elem) => {
        let className = elem.className,
          innerHTML = elem.innerHTML,
          attributes = elem.attributes;

        return Promise.resolve({className, innerHTML, attributes});
      }, sltHandle)
        .then ( elemObj => elemObj );

      // return await this.evaluate( elem => Promise.resolve(elem), sltHandle );
    }

    /**
     * desc page.html() 封装 (未完成)
     * @static
     * @return {Object}
     */
    async attr(selector) {
      if ( !selector ) return this;

      if ( typeof selector === "string" ) {
        let sltHandle = await this.$(selector);

        return await this.evaluate( (elem) => {
          let properties = elem.nodeName;

          return Promise.resolve({properties});
        }, sltHandle)
          .then ( async properties => properties);
      }
    }

    /**
     * desc page.click() 封装 (未完成)
     * @static
     * @param {String} param
     * @returns Promise
     * @memberof querySelector
     */
    // click( selector ) {
    //     return this.page.click( selector );
    // }

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
