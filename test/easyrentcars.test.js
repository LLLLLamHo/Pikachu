
const chai = require( 'chai' ),
    expect = chai.expect;

const colors = require( 'colors' ),
  describe = require( 'mocha' ).describe;

//打开浏览器
const Pikachu = require( '../lib/Pikachu' );
// puppeteer二次封装测试用例
// const testForpuppeteer = require( './testCase/testForpuppeteer.test.js' );
const mainProcessTest = require( './page/mainProcess.test.js' );

let browserTarget = null,
  pageTarget = null;

describe( '主流程测试', function () {
    before( '打开浏览器', ( done ) => {
        Pikachu.openBrowser({
          devtools: false
        })
            .then( async ( browser ) => {
                if ( browser ) {
                  browserTarget = browser;
                  pageTarget = await browserTarget.openPage('home', {
                      url: 'https://www.easyrentcars.com'
                  } );
                  await Promise.resolve(pageTarget);
                  await pageTarget.setViewport({
                      width: 1440,
                      height: 900
                  });
                  await done();
                } else {
                    console.log( '浏览器无法启动！！！'.red );
                    console.log( '请重试'.red );
                }
            } );
    } );

    it( '检测浏览器对象是否正确'.yellow, () => {
        expect( browserTarget ).to.be.an( 'object' );
    } );

    it( '检测页面对象是否正确'.yellow, () => {
        expect( pageTarget ).to.be.an( 'object' );
    } );

    it( '测试主流程，包括搜索／下单'.yellow, () => {
      return mainProcessTest ( pageTarget );
    });
} );
