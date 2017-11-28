
const Error = require( './Error' );

class AAA { 
    static aaa() { 
        console.log( 0 );
    }
}

class WorkBox extends AAA {

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

    /**
     * @static 创建pageList对象
     * @memberof WorkBox
     */
    static createPageList() { 
        return new Promise( ( resolve, reject ) => { 
            this._pageList = this._pageList ? this._pageList : {};
            resolve();
        })
    }

    /**
     * @static 记录page对象
     * @param {any} pageName 
     * @param {any} pageObj 
     * @returns 
     * @memberof WorkBox
     */
    static savePageToList( pageName, pageObj ) { 
        return new Promise( ( resolve, reject ) => { 
            if ( this._pageList ) {
                this._pageList[pageName] = pageObj;
                resolve();
            } else { 
                WorkBox.createPageList.call( this )
                    .then( () => {
                        this._pageList[pageName] = pageObj;
                        resolve();
                    });
            }
        })
    }

    /**
     * @static 删除对象
     * @param {string} pageName 
     * @memberof WorkBox
     */
    static removePageFromList( pageName ) { 
        return new Promise( async ( resolve, reject ) => { 
            if ( this._pageList[pageName] ) {
                delete this._pageList[pageName];
                resolve();
            } else { 
                Error(`Error: curr page name ${pageName}. please transmit this pageName.`);
            }
        })
    }

}

module.exports = WorkBox;