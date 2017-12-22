# API

## **class Pikachu**

Pikachu核心class，提供开启浏览器和协助测试的工具函数  
Pikachu其实是对`puppeteer`的一层封装，其实`page`和`browser`对象都是继承与`puppeteer`的`page`和`browser`对象的，所以是可以直接使用puppeteer里面的api以及参数的，详细api请参考[puppeteerAPI](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)  

该API文档只针对Pikachu对puppeteer的增强API。

### **Pikachu.openBrowser(option)**

- option \<Object>
    - headless \<boolean> 是否不显示浏览器，默认为true
    - slowMo \<number> 用于放慢浏览器的操作，方便你看清楚
    - timeout \<number> 用于设置开启浏览器实例的超时时间，默认为（30000）30秒，设置为0则禁用超时
    - devtools \<boolean> 在浏览器器打开的时候是否显示控制台，默认为false，如果该属性设置为true，那么headless一定为false。
- returns \<Promise<Browser>>

只接受一个Object的参数，用来配置浏览器的开发必要参数

只说明常用的一些参数，详细参数可以看[puppeteerAPI](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)

```javascript
Pikachu.openBrowser( {
    headless: false,
    devtools: true
} )
    .then( async ( browser ) => {} );
```

### **Pikachu.startText(name,callback)**

- name \<string> 传入测试的名称
- callback \<function> 传入测试函数

Pikachu除了对`puppeteer`进行进行封装之外，还内置了`mocha`和`chai`两个库，用于对浏览器的操作进行测试和断言，其中`startText`相当于是`mocha`的`describe`。

开始测试

```javascript
Pikachu.startText( '测试', function () {

    before( '开启浏览器', ( done ) => {

        Pikachu.openBrowser( {
            headless: false,
            devtools: false
        } )
            .then( async ( browser ) => {} );
    } )

    it( '1 加 1 应该等于 2', function () {
        Pikachu.expect( 1 + 1 ).to.be.equal( 2 );
    } );

} );
```

### **Pikachu.expect(result,expect)**

- result \<any> 结果值
- expect \<any> 期望值

Pikachu提供一个expect函数，相当于是`chai`的expect。并且断言语句也是相同，最大限度减低了学习难度，保持和chai的一致性。

```javascript
Pikachu.startText( '测试', function () {

    it( '1 加 1 应该等于 2', function () {
        Pikachu.expect( 1 + 1 ).to.be.equal( 2 );
    } );

} );
```

## **class Browser**

当调用`Pikachu.openBrowser`后，会返回一个browser对象，改对象拥有对浏览器操作的API，当然你可以使用`puppeteer`的`browser`对象提供的方法，也可以使用二次封装的一些简便方法。
### **browser.delay(delayTime)**

- delayTime /<number> 毫秒数，延迟多少毫秒

同步延迟的功能函数，用于等待一定时间后继续后续的操作。

```javascript
await browser.delay(2000);
```

### **browser.openPage(pageName,options)**

- pageName \<string> 必须传入页面命名
- options \<object> 选传，为页面的配置参数
    - viewType \<string> | \<object> 页面参数，可参考[page.emulate](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pageemulateoptions)
    - url \<string> 当有传入的时候会自动帮你打开对应的页面

```javascript
Pikachu.openBrowser( {
    headless: false,
    devtools: false
} )
    .then( async ( browser ) => {
        let page = await browser.openPage( 'home',    {
                viewType: 'iPhone 6',
                url: 'http://m.zuzuche.com'
            });
        done();
    } );
```

对于`viewType`的参数需要详细说明，如果不是指定设备需要自定义窗口参数的话，以下给出详细参数配置：

- viewport \<Object>
    - width \<number> 页面宽度（px）
    - height \<number> 页面高度（px）
    - deviceScaleFactor \<number> dpr值，默认为1
    - isMobile \<boolean> 当前页面是否为一个移动设备 默认为`false`
    - hasTouch \<boolean> 当前页面是否支持触摸事件 默认为`false`
    - isLandscape \<boolean> 当前页面是否是横向模式 默认为`false`
- userAgent \<string>

另外可以传入一个指定设备的名称，内部其实定义了一些默认的设备类型的`viewType`，详情可以查看[DeviceDescriptors](https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js)。


### **browser.savePageToList(pageName,pageObj)**

- pageName \<string> 必须传入页面命名
- pageObj \<object> 页面对象

browser提供了一个对于创建了的page储存到内部的一个方法，用于记录所打开的page对象。

```javascript
browser.savePageToList('home',pageObj);
```

### **browser.getPageFromList(pageName)**

- pageName \<string> 必须传入页面命名
- returns \<object> 页面对象

browser提供了一个获取内部打开页面的指定page对象。

```javascript
let page = browser.getPageFromList('home');
```
### **browser.removePageFromList(pageName)**

- pageName \<string> 必须传入页面命名

browser提供了一个用于删除内部记录page对象的方法


```javascript
browser.removePageFromList('home');
```

## **Page**

page对象是通过调用`browser.openPage`之后返回的页面对象，是当前浏览器页面的唯一对象，内置了puppeteer本来的功能，也和`browser`一样会带有增强函数。用于简化一些puppeteer的操作和一些功能的封装。

### **page.delay(delayTime)**

和`browser.delay`的使用方式一致。

### **page.cutPDF(options)**

- options \<Object> 该对象有一下属性
    - path \<string> PDF生成的路径，如果是相对路径，则会在当前运行目录下加上相对了进行生成，如果是绝对路径，则直接使用绝对路径生成。
    - scale \<number> 网页渲染比例，默认为1。
    - displayHeaderFooter \<boolean> 是否显示页眉和页脚，默认为false。
    - printBackground \<boolean> 是否显示背景图片，默认为false。
    - landscape \<boolean> 生成的PDF方向，默认为纵向，如果为true则为横向。
    - pageRanges \<string> 生成的纸张的页数，例如（1-5, 8, 11-13），那么生成的是1-5页，8页，11-13页，其他页数会忽略。
    - format \<string> 默认为'Letter'，暂时不知道有什么用。
    - width \<string> 生成的PDF宽度，可以写入单位的值。例如（width: '350px'）。
    - height \<string> 生成的PDF高度，可以写入单位的值。例如（ height: '1500px'）。
    - margin \<Object> PDF的边距，默认为none。
        - top \<string> 上边距，可以写入单位
        - right \<string> 右边距，可以写入单位
        - bottom \<string> 下边距，可以写入单位
        - left \<string> 左边距，可以写入单位
- return \<Promise\<Buffer>> 返回PDF的Buffer。如果创建失败，那么会返回一个null。


将当前打开的页面进行快照，生成PDF到指定的文件目录。  
调用参数和puppeteer一致，[API](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions)。  

因为使用的时候，我们生成PDF会经常需要将背景图片也需要加载进来进行截图，所以封装后，默认`printBackground`属性为true。

需要注意的是，`page.snapshot`必须在无头模式下进行，无头模式就是在调用`Pikachu.openBrowser`的时候，将初始化参数`headless`设置为true，`devtools`设置为false。  

```javascript
let page = await browser.openPage( 'pdf', { viewType: 'iPhone 6', url: 'http://m.zuzuche.com' });
let buffer = await page.cutPDF( {
    path: path.join( './test/snapshot_pdf.pdf' ),
    displayHeaderFooter: true,
    printBackground: true
} );
```

### `page._$(selector)`
传入指定元素的id／类名／标签名等，fn返回page对象

### `page.query(selector)`
传入指定元素的id／类名／标签名等，fn返回元素对象，对象包含有元素的id，类名，属性集合，html字符串

### `page._$(selector)._click(timer)`
`_$` 传入指定元素的id／类名／标签名等，获取到元素引用后，经 `._click(timer)` 可模拟触发元素点击操作，
参数 `timer` 指定当点击后延迟多久到下一个操作，fn返回Promise对象，当元素成功被点击，
返回的Promise对象将会被resolve

### `page._$(selector).focus(timer)`
`_$` 传入指定元素的id／类名／标签名等，获取到元素引用后，经 `.focus(timer)` 可模拟触发元素聚焦操作，
参数 `timer` 指定当聚焦后延迟多久到下一个操作，fn返回Promise对象，当元素成功被聚焦，
返回的Promise对象将会被resolve

### `page._$(selector).input(text, delay, timer)`
`_$` 传入指定元素的id／类名／标签名等，获取到元素引用后，经 `.input(text, delay, timer)`
可模拟表单输入操作，参数 `text` 指定输入文本，参数 `delay` 指定每输入一个字符间隔延迟，参数 `timer` 指定当输入后延迟多久到下一个操作，fn返回Promise对象，当元素成功被输入，返回的Promise对象将会被resolve

### `page._$(selector).select(option, timer)`
`_$` 传入指定元素的id／类名／标签名等，获取到元素引用后，经 `.select(option, timer)` 可模拟触发元素选择操作，
参数 `option` 指定选项，参数 `timer` 指定当选择后延迟多久到下一个操作，fn返回Promise对象，当元素成功被选择，
返回的Promise对象将会被resolve
