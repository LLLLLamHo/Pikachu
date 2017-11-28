'use strict';

const Pikachu = require( '../lib/Pikachu' );

Pikachu.startText( '测试', function () {

    before( '开启浏览器', ( done ) => {

        Pikachu.openBrowser( {
            headless: false,
            devtools: false
        } )
            .then( async ( browser ) => {
                let page = await Pikachu.newPage( 'home', { viewType: 'iPhone 6',url: 'http://m.zuzuche.com'});
                done();
            } );
    } )

    it( '1 加 1 应该等于 2', function () {
        Pikachu.expect( 1 + 1 ).to.be.equal( 2 );
    } );
    it( '1 加 1 应该等于 2', function () {
        Pikachu.expect( 1 + 1 ).to.be.equal( 2 );
    } );
    it( '1 加 1 应该等于 2', function () {
        Pikachu.expect( 1 + 1 ).to.be.equal( 2 );
    } );
    it( '1 加 1 应该等于 2', function () {
        Pikachu.expect( 1 + 1 ).to.be.equal( 2 );
    } );
    it( '1 加 1 应该等于 2', function () {
        Pikachu.expect( 1 + 1 ).to.be.equal( 2 );
    } );
    it( '1 加 1 应该等于 2', function () {
        Pikachu.expect( 1 + 1 ).to.be.equal( 2 );
    } );
    it( '1 加 1 应该等于 2', function () {
        Pikachu.expect( 1 + 1 ).to.be.equal( 2 );
    } );
    it( '1 加 1 应该等于 2', function () {
        Pikachu.expect( 1 + 1 ).to.be.equal( 2 );
    } );
    it( '1 加 1 应该等于 2', function () {
        Pikachu.expect( 1 + 1 ).to.be.equal( 2 );
    } );
    it( '1 加 1 应该等于 2', function () {
        Pikachu.expect( 1 + 1 ).to.be.equal( 2 );
    } );
} );

