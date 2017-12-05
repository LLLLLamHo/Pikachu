const chai = require( 'chai' ),
    expect = chai.expect;

async function testMainProcess(page) {

  /**
   * selector classname group
   * @type {[type]}
   */

  const EXTINPUT = '#pickup';

  // INDEX
  const SEARCHINPUT = '#J-os-search > form > ul > li.os-search-pick-up.J-search-place > input.J-pick-up-input';
  const COUNTRY = '#J-os-search-suggest > div.top-rental > div > ul > li:nth-child(2) > span';
  const CITY = '#J-os-search-suggest > div.top-rental > div > div.tabs-content-box.J-tabs-content-box.fl > div:nth-child(2) > div:nth-child(1) > ul > li:nth-child(1)';
  const PICKUPDADE = '#J-os-search > form > ul > li.os-search-pick-date.J-os-search-pick-date';
  const PICKUPDADEVALUE = 'body > div.pickmeup.pmu-view-days > div:nth-child(1) > div.pmu-days > div:nth-child(27)';
  const PICKUPTIME = '#J-os-search > form > ul > li.os-search-pick-time.J-os-search-pick-time';
  const PICKUPTIMEVALUE = 'body > div:nth-child(10) > dl > dd:nth-child(5)';
  const DROPOFFDADE = '#J-os-search > form > ul > li.os-search-return-date.J-os-search-return-date';
  const DROPOFFDADEVALUE = 'body > div.pickmeup.pmu-view-days > div:nth-child(2) > div.pmu-days > div:nth-child(12)';
  const DROPOFFTIME = '#J-os-search > form > ul > li.os-search-return-time.J-os-search-return-time';
  const DROPOFFTIMEVALUE = 'body > div:nth-child(11) > dl > dd:nth-child(8)';
  const SEARCHBTN = '#J-os-search > form > ul > li.os-search-btn.J-os-search-btn > input';

  // LIST
  // choose [Pay at Pickup], only test Pickup
  const CHECKBOX = '#J-car-info-filter #postpaid:last-of-type';
  const BOOKBTN = '#J-car-info > div > div:nth-child(3) > div.os-suply-box.J-os-suply-box > div.os-suply > ul > li > a';

  // BOOK
  const TITLESELECT = '#title';
  const FIRSTNAMEINPUT = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-driver-information > div > ul:nth-child(5) > li.valid > p:nth-child(2) > input[type="text"]';
  const LASTNAMEINPUT = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-driver-information > div > ul:nth-child(5) > li:nth-child(2) > p:nth-child(2) > input[type="text"]';
  const EMAILADRESSINPUT = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-driver-information > div > ul:nth-child(5) > li:nth-child(3) > p:nth-child(2) > input[type="text"]';
  const PHONECODE = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-driver-information > div > ul:nth-child(5) > li:nth-child(4) > div > select';
  const PHONE = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-driver-information > div > ul:nth-child(5) > li:nth-child(4) > input';
  const RESERVENOW = 'body > div.os-main.J-os-main.container.clearfix > div.os-content.has-coupon.fl > div.J-reserve > div > button';

  return new Promise( async ( resolve, reject ) => {

      // await page.query(SEARCHINPUT);
      // await page.query(SEARCHINPUT).attr();
      console.log(await page.query(EXTINPUT));
      resolve(1);

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
      await page.waitFor(CHECKBOX);
      await page.click(CHECKBOX);
      await page.waitFor(2*1000);
      await page.waitFor(BOOKBTN);
      let jumpHref = await page.$eval(BOOKBTN, btn => btn.href);
      await page.goto(jumpHref);

      // for car book page
      await page.waitFor(3*1000);
      await page.select(TITLESELECT, 'Mr.');
      await page.type(FIRSTNAMEINPUT, 'test', { delay: 100 });
      await page.type(LASTNAMEINPUT, 'pengzhi', { delay: 100 });
      await page.type(EMAILADRESSINPUT, 'pengzhiyang@zuzuche.com', { delay: 100 });
      await page.select(PHONECODE, '852');
      await page.type(PHONE, '15521278180', { delay: 100 });
      await page.waitFor(2*1000);
      await page.click(RESERVENOW);

      await page.waitFor(5000);

      // await resolve(1);
  } )
    .then( ( data ) => {
        console.log(data);
        expect( data ).to.not.be.null;
    } );
}

module.exports = testMainProcess;
