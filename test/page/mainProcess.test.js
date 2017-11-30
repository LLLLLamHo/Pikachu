const chai = require( 'chai' ),
    expect = chai.expect;

// const _$ = require('../../lib/Page');
const _$ = require('../../lib/Page');

async function testMainProcess(page) {

  // await _$.getPage(page);
  console.log(_$(page));

  /**
   * selector classname group
   * @type {[type]}
   */

  // INDEX
  const SEARCHINPUT = '#J-os-search > form > ul > li.os-search-pick-up.J-search-place > input.J-pick-up-input';
  const COUNTRY = '#J-os-search-suggest > div.top-rental > div > ul > li:nth-child(2) > span';
  const CITY = '#J-os-search-suggest > div.top-rental > div > div.tabs-content-box.J-tabs-content-box.fl > div:nth-child(2) > div:nth-child(1) > ul > li:nth-child(1)';
  const PICKUPDADE = '#J-os-search > form > ul > li.os-search-pick-date.J-os-search-pick-date';
  const PICKUPDADEVALUE = 'body > div.pickmeup.pmu-view-days > div:nth-child(2) > div.pmu-days > div:nth-child(6)';
  const PICKUPTIME = '#J-os-search > form > ul > li.os-search-pick-time.J-os-search-pick-time';
  const PICKUPTIMEVALUE = 'body > div:nth-child(11) > dl > dd:nth-child(4)';
  const DROPOFFDADE = '#J-os-search > form > ul > li.os-search-return-date.J-os-search-return-date';
  const DROPOFFDADEVALUE = 'body > div.pickmeup.pmu-view-days > div:nth-child(2) > div.pmu-days > div:nth-child(12)';
  const DROPOFFTIME = '#J-os-search > form > ul > li.os-search-return-time.J-os-search-return-time';
  const DROPOFFTIMEVALUE = 'body > div:nth-child(12) > dl > dd:nth-child(17)';
  const SEARCHBTN = '#J-os-search > form > ul > li.os-search-btn.J-os-search-btn > input';

  // LIST
  const BOOKBTN = '#J-car-info > div > div:nth-child(3) > div.os-suply-box.J-os-suply-box > div.os-suply > ul > li > a';

  // BOOK
  const TITLESELECT = '#title';
  const FIRSTNAMEINPUT = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-driver-information > div > ul:nth-child(5) > li.valid > p:nth-child(2) > input[type="text"]';
  const LASTNAMEINPUT = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-driver-information > div > ul:nth-child(5) > li:nth-child(2) > p:nth-child(2) > input[type="text"]';
  const EMAILADRESSINPUT = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-driver-information > div > ul:nth-child(5) > li:nth-child(3) > p:nth-child(2) > input[type="text"]'


  return new Promise( async ( resolve, reject ) => {

      // await resolve(_$(page));

      // let Page = new _$(page);
      // resolve(1);

      // for home page
      await page.click(SEARCHINPUT);
      await page.waitFor(1000);
      await page.click(COUNTRY);
      await page.waitFor(2*1000);
      await page.click(CITY);
      await page.waitFor(2*1000);
      await page.click(PICKUPDADE);
      await page.waitFor(2*1000);
      await page.click(PICKUPDADEVALUE);
      await page.waitFor(2*1000);
      await page.click(DROPOFFDADEVALUE);
      await page.waitFor(2*1000);
      await page.click(PICKUPTIME);
      await page.waitFor(2*1000);
      await page.click(PICKUPTIMEVALUE);
      await page.waitFor(2*1000);
      await page.click(DROPOFFTIME);
      await page.waitFor(2*1000);
      await page.click(DROPOFFTIMEVALUE);
      await page.waitFor(2*1000);
      await page.click(SEARCHBTN);
      await page.waitForNavigation();

      // for car list page
      await page.waitFor(BOOKBTN);
      await page.waitFor(2*1000);
      await page.click(BOOKBTN);
      await page.waitForNavigation();

      await page.waitFor(5000);
  } )
    .then( ( data ) => {
        // console.log(data);
        expect( data ).to.not.be.null;
        // let { rentTopBox, POITopBox, rentContent, poiContent, rentContentClassName } = data;
        //
        // expect( POITopBox ).to.not.be.null;
        // expect( poiContent ).to.not.be.null;
        //
        // expect( rentTopBox ).to.be.null;
        //
        // expect(rentContentClassName).to.include('hidden');
        // expect( data.imgSrcList ).to.deep.include.members( data.bannerData );
    } );
}

module.exports = testMainProcess;
