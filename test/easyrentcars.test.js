const Pikachu = require( '../lib/Pikachu' );

// puppeteer二次封装测试用例
const mainProcessTest = require( './page/mainProcess.test.js' );

const opts = {
  headless: false, // 启用浏览器界面
  devtools: false // 禁用控制台
}

let _pages = {},
  _browsers = {};

Pikachu.startText( '主流程测试', function () {
    before( '打开浏览器', ( done ) => {
        Pikachu.openBrowser(opts)
            .then( async ( browser ) => {
                if ( browser ) {
                  _browsers = browser;

                  _pages = await _browsers.openPage('home', {
                      // url: 'https://www.zuzuche.com'
                      url: 'https://www.easyrentcars.com/'
                  } );

                  await Promise.resolve(_pages);

                  _pages.setViewport({
                      width: 1440,
                      height: 900
                  });

                  done();
                } else {
                    console.log( '浏览器无法启动！！！'.red );
                    console.log( '请重试'.red );
                }
            } );
    } );

    it( '检测浏览器对象是否正确'.yellow, () => {
        Pikachu.expect( _browsers ).to.be.an( 'object' );
    } );

    it( '检测页面对象是否正确'.yellow, () => {
        Pikachu.expect( _pages ).to.be.an( 'object' );
    } );

    it( '测试主流程，包括搜索／下单'.yellow, () => {
        return mainProcessTest ( _pages );
    });
} );
