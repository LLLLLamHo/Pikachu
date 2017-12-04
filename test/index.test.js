
const chai = require( 'chai' );
expect = chai.expect;
const Pikachu = require( '../lib/Pikachu' );

const openPage = require( './page/openPage.test.js' );
const checkPageList = require( './page/checkPageList.test.js' );
const testCutPdf = require( './page/testCutPdf.test.js' );

let browserTarget = null;

describe( 'Pikachu-test', function () {

    before( 'openBrowser', ( done ) => {

        Pikachu.openBrowser( {
            headless: true,
            devtools: false
        } )
            .then( async ( browser ) => {
                browserTarget = browser;
                await done();
            } );

    } );

    //检查打开浏览器是否成功
    it( 'test-openBrowser', () => {
        expect( browserTarget ).to.be.an( 'object' );
    } );

    //测试打开页面
    it( 'test-openPage', () => {
        return openPage( browserTarget );
    } )

    //获取browser中的page列表中的home页面的page对象
    it( 'check-page-list', () => {
        return checkPageList( browserTarget );
    } )

    //测试截图功能
    it( 'test-pdf', () => {
        return testCutPdf( browserTarget );
    } )

} )