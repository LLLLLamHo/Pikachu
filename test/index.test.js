
const chai = require( 'chai' );
expect = chai.expect;
const Pikachu = require( '../lib/Pikachu' );

const openPage = require( './page/openPage.test.js' );

let browserTarget = null;

describe( 'Pikachu-test', function () { 

    before( '打开浏览器', ( done ) => {

        Pikachu.openBrowser( {headless:false})
            .then( async ( browser ) => {
                browserTarget = browser;
                await done();
            } );
        
    } );

    it( 'test-openBrowser', () => {
        expect(browserTarget).to.be.an('object');
    } );

    it( 'test-openPage', () => { 
        return openPage( browserTarget );
    })


})