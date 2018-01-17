const chai = require( 'chai' ),
    expect = chai.expect;

const _form = require('../../lib/form.data.js');

async function testMainProcess(page) {

  /**
   * selector classname group
   * @type {[type]}
   */

  const EXTINPUT = '#pickup';

  // INDEX
  const SEARCHINPUT = '#J-os-search > form > ul > li.os-search-pick-up.J-search-place > input.J-pick-up-input';
  const COUNTRY = '#J-search-suggest > div.top-rental > div > ul > li:nth-child(3) > span';
  const CITY = '#J-search-suggest > div.top-rental > div > div.tabs-content-box.J-tabs-content-box.fl > div:nth-child(3) > div:nth-child(1) > ul > li:nth-child(1)';
  const PICKUPDADE = '#J-os-search > form > ul > li.os-search-pick-date.J-os-search-pick-date';
  const PICKUPDADEVALUE = `body > div.pickmeup.pmu-view-days > div:nth-child(2) > div.pmu-days > div:not(.pmu-disabled):nth-child(${5 + parseInt(Math.random() * 25, 10)})`;
  const PICKUPTIME = '#J-os-search > form > ul > li.os-search-pick-time.J-os-search-pick-time';
  const PICKUPTIMEVALUE = `body > div:nth-child(22) > dl > dd:nth-child(${parseInt(Math.random() * 43 + 1, 10)})`;
  const DROPOFFDADE = '#J-os-search > form > ul > li.os-search-return-date.J-os-search-return-date';
  const DROPOFFDADEVALUE = `body > div.pickmeup.pmu-view-days > div:nth-child(2) > div.pmu-days > div:not(.pmu-disabled):nth-child(${5 + parseInt(Math.random() * 25, 10)})`;
  const DROPOFFTIME = '#J-os-search > form > ul > li.os-search-return-time.J-os-search-return-time';
  const DROPOFFTIMEVALUE = `body > div:nth-child(23) > dl > dd:nth-child(${parseInt(Math.random() * 43 + 1, 10)})`;
  const SEARCHBTN = '#J-os-search > form > ul > li.os-search-btn.J-os-search-btn > input';

  // LIST
  // choose [Pay at Pickup], only test Pickup
  const CHECKBOX = '#J-car-info-filter #postpaid:last-of-type';
  const BOOKBTN = '#J-car-info .os-suply-box.J-os-suply-box .os-suply ul > li a';

  // BOOK
  const TITLESELECT = '#title';
  const FIRSTNAMEINPUT = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-driver-information > div > ul:nth-child(5) > li.valid > p:nth-child(2) > input[type="text"]';
  const LASTNAMEINPUT = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-driver-information > div > ul:nth-child(5) > li:nth-child(2) > p:nth-child(2) > input[type="text"]';
  const EMAILADRESSINPUT = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-driver-information > div > ul:nth-child(5) > li:nth-child(3) > p:nth-child(2) > input[type="text"]';
  const PHONECODE = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-driver-information > div > ul:nth-child(5) > li:nth-child(4) > div > select';
  const PHONE = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-driver-information > div > ul:nth-child(5) > li:nth-child(4) > input';
  const RESERVENOW = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-reserve > div > div.r-common-button-slot > div:nth-child(1) > button';

  return new Promise( async ( resolve, reject ) => {

      // for home page
      await page._$(SEARCHINPUT)._click(1000);
      await page._$(COUNTRY)._click(2*1000);
      await page._$(CITY)._click(2*1000);
      await page._$(PICKUPDADE)._click(2*1000);
      await page._$(PICKUPDADEVALUE)._click(2*1000);
      await page._$(DROPOFFDADEVALUE)._click(2*1000);
      await page._$(SEARCHBTN)._click();

      await page.waitForNavigation();

      // for car list page
      await page.waitFor(CHECKBOX);
      await page._$(CHECKBOX)._click(2*1000);
      await page.waitFor(BOOKBTN);
      let jumpHref = await page.$eval(BOOKBTN, btn => btn.href);
      await page.goto(jumpHref);

      // for car book page
      await page.waitFor(3*1000);
      await page._$(TITLESELECT)._select(_form.title);
      await page._$(FIRSTNAMEINPUT).input(_form.firstname, 100);
      await page._$(LASTNAMEINPUT).input(_form.lastname, 100);
      await page._$(EMAILADRESSINPUT).input(_form.email, 100);
      await page._$(PHONECODE)._select(_form.phonecode, 100);
      await page._$(PHONE).input(_form.phone, 100);
      await page.waitFor(2*1000);
      await page._$(RESERVENOW)._click();

      await page.waitFor(5000);

      await resolve(1);
  } )
    .then( ( data ) => {
        console.log(data);
        expect( data ).to.not.be.null;
    } );
}

module.exports = testMainProcess;
