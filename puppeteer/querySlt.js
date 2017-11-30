// const Browser = require( '../lib/Browser' );
// const getPageObj = require('../lib/Pikachu');

class querySelector {

    static async getPage(page) {
      this.page = page;
    }

    /**
     * @static
     * @param {String} selector
     * @return {Object}
     */
    static async query( selector ) {
      this.sltHandle = await this.page.$(selector);

      return await this.page.evaluate( (elem) => {
        return Promise.resolve({
          id: elem.id,
          className: elem.className
        });
      }, this.sltHandle)
        .then ( async elemObj => elemObj);
    }

    /**
     * @static
     * @return {Object}
     */
    static async html() {
      // if (this.sltHandle) {
        return await this.page.evaluate( (elem) => {
          return Promise.resolve(elem.innerHTML);
        }, this.sltHandle)
          .then ( async htmlStr => htmlStr);
      // } else {
      //   return;
      // }
    }

    /**
     * @static page.click() 封装
     * @param {String} param
     * @returns Promise
     * @memberof querySelector
     */
    static click( selector ) {
        return this.page.click( selector );
    }
}

module.exports = querySelector;
