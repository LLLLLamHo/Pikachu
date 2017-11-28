

module.exports = class Text { 
/**
 * @static 对mocha的describe进行封装
 * @param {string,object} title 
 * @param {function} fn 
 */
static describe( title,fn ) { 
        
        describe(title,fn);
    }

}