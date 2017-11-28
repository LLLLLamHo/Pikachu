const chai = require( 'chai' );
expect = chai.expect;


function openPage( browser ) {
    return new Promise( async ( resolve, reject ) => {
        let page = await browser.getPageFromList( 'home' );
        await resolve( page );
    } )
        .then( ( page ) => {
            expect( page ).to.be.an( 'object' );
        } );
}

module.exports = openPage;