
const Error = require( './Error' );

class WorkBox {

    /**
     * @static 延迟执行
     * @param {number} delayTime 
     * @returns null
     * @memberof WorkBox
     */
    static delay( delayTime ) {
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

    

}

module.exports = WorkBox;