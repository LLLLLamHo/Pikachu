
const path = require( 'path' );
const fs = require( 'fs' );
const Pikachu = require( './Pikachu' );


class Page {
    constructor() {
      this.proper;
    }
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

    _$( selector ) {
      this.sltObj = selector;
      return this;
    }

    /**
     * desc get elem id / class / htmlstr / attrs
     * @static
     * @param {String} selector
     * @return {Object}
     */
    async query( selector ) {
      if ( !selector ) return this;

      let sltHandle = await this.$(selector);

      return await this.evaluate( (elem) => {
        let id = elem.id ? elem.id : undefined,
          className = elem.className ? elem.className : undefined,
          innerHTML = elem.innerHTML ? elem.innerHTML : undefined,
          attributes = elem.attributes ? elem.attributes : undefined;

        return Promise.resolve({
          id,
          class: className,
          html: innerHTML,
          attrs: attributes
        });
      }, sltHandle)
        .then ( elemObj => elemObj );
    }

    /**
     * desc get element properties
     * @static
     * @return {Object}
     */
    async attrs(selector) {
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

    async _click(timer) {
        const selector = this.sltObj,
          sltElem = await this.$(selector);

        await sltElem.click(['middle']);
        timer && await this.waitFor(timer);
    }

    async focus(timer) {
      const selector = await this.sltObj,
        sltElem = await this.$(selector);

      await sltElem.focus();
      timer && await this.waitFor(timer);
    }

    async input(text, delay, timer) {
      const selector = await this.sltObj,
        sltElem = await this.$(selector);

      await sltElem.type(text, {delay});
      timer && await this.waitFor(timer);
    }

    async _select(option, timer) {
      const selector = await this.sltObj;

      await this.select(selector, option);
      timer && await this.waitFor(timer);
    }

    async attr(proper) { // 待更新
      const selector = await this.sltObj,
        sltElem = await this.$(selector);

      await this.$eval(selector, (elem) => {
        this.attr.call(this, elem)
      });

      // return
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
