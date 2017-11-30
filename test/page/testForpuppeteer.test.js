const _$ = require('../../../puppeteer/querySlt');

const openBrowser = require( '../../../tool/openBrowser/openBrowser.js' );

let pageObj = null,
    browserObj = null;

async function testForpuppeteer() {

  await openBrowser( {
      url: 'https://www.zuzuche.com'
  } )
      .then( ( data ) => {
          if ( data ) {
              pageObj = data.pageObj;
              browserObj = data.browserObj;
          } else {
              console.log( '浏览器无法启动！！！'.red );
              console.log( '请重试'.red );
          }
      } );

  await _$.getPage(pageObj);

  const rentCarBox = await _$.query('.rentCar-box');

  console.log(rentCarBox.className);
}

// module.exports = testForpuppeteer;

testForpuppeteer();
