const chai = require( 'chai' );
expect = chai.expect;
const path = require( 'path' );
const fs = require( 'fs' );

function testCutPdf( browser ) {
    return new Promise( async ( resolve, reject ) => {

        let page = await browser.openPage( 'snapshot', { viewType: 'iPhone 6', url: 'http://m.zuzuche.com' } );
        let result = await page.cutPDF( {
            path: path.join( './test/snapshot_pdf.pdf' )
        } );
        result && fs.unlinkSync( path.join( process.cwd(), './test/snapshot_pdf.pdf' ) );
        await resolve( result );
    } )
        .then( ( result ) => {
            expect( result ).to.be.not.false;
        } );
}

module.exports = testCutPdf;