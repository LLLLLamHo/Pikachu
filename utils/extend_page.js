
class Page { 

    aaa() { 

    }

}


/**
 * 对page进行二次封装，增强能力
 * @param {object} pageObj 
 * @returns pageObj
 */
function extend_page( pageObj ) {

    let page = new Page();
    page.__proto__ = pageObj;
    return page;

}



module.exports = extend_page;