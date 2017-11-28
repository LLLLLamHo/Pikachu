const chai = require( 'chai' );
expect = chai.expect;
const Pikachu = require( '../../lib/Pikachu' );


function openPage( browser ) {
    return new Promise( async ( resolve, reject ) => {
        let page = await browser.newPage( 'home' );
        await resolve( page );
    } )
        .then( ( page ) => {
            expect( page ).to.be.an( 'object' );
        } );
}

module.exports = openPage;