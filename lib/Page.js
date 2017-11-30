
class Page {

    constructor() {

    }

    // static async getPage(page) {
    //   this.page = page;
    // }

    /**
     * @static
     * @param {String} selector
     * @return {Object}
     */
    async query( selector ) {
      console.log(this);
      let sltHandle = await this.$(selector);

      return await this.evaluate( (elem) => {
        return Promise.resolve({
          id: elem.id,
          className: elem.className
        });
      }, sltHandle)
        .then ( async elemObj => elemObj);
    }

    /**
     * desc page.html() 封装 (未完成)
     * @static
     * @return {Object}
     */
    async html() {
      if ( typeof this === Object ) {
        return await this.page.evaluate( (elem) => {
          return Promise.resolve(elem.innerHTML);
        }, this.sltHandle)
          .then ( async htmlStr => htmlStr);
      } else {
        return;
      }
    }

    /**
     * desc page.click() 封装 (未完成)
     * @static
     * @param {String} param
     * @returns Promise
     * @memberof querySelector
     */
    click( selector ) {
        return this.page.click( selector );
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
