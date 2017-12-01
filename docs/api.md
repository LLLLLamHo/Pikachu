# API

## class Pikachu

Pikachu核心class，提供开启浏览器和协助测试的工具函数  
Pikachu其实是对`puppeteer`的一层封装，其实`page`和`browser`对象都是继承与`puppeteer`的`page`和`browser`对象的，所以是可以直接使用puppeteer里面的api以及参数的，详细api请参考[puppeteerAPI](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)  
  
该API文档只针对Pikachu对puppeteer的增强API。

#### Pikachu.openBrowser

只接受一个Object的参数，用来配置浏览器的开发必要参数

只说明常用的一些参数，详细参数可以看[puppeteerAPI](https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md)

- option \<Object>
    - headless \<boolean> 是否不显示浏览器，默认为true
    - slowMo \<number> 用于放慢浏览器的操作，方便你看清楚
    - timeout \<number> 用于设置开启浏览器实例的超时时间，默认为（30000）30秒，设置为0则禁用超时
    - devtools \<boolean> 在浏览器器打开的时候是否显示控制台，默认为false，如果该属性设置为true，那么headless一定为false。
- returns \<Promise<Browser>>

```javascript
Pikachu.openBrowser( {
    headless: false,
    devtools: true
} )
    .then( async ( browser ) => {} );
```

#### Pikachu.startText

Pikachu除了对`puppeteer`进行进行封装之外，还内置了`mocha`和`chai`两个库，用于对浏览器的操作进行测试和断言，其中`startText`相当于是`mocha`的`describe`。

- name \<string> 传入测试的名称
- callback \<function> 传入测试函数

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

#### Pikachu.expect

Pikachu提供一个expect函数，相当于是`chai`的expect。并且断言语句也是相同，最大限度减低了学习难度，保持和chai的一致性。

```javascript
Pikachu.startText( '测试', function () {

    it( '1 加 1 应该等于 2', function () {
        Pikachu.expect( 1 + 1 ).to.be.equal( 2 );
    } );

} );
```

## class Browser

当调用`Pikachu.openBrowser`后，会返回一个browser对象，改对象拥有对浏览器操作的API，当然你可以使用`puppeteer`的`browser`对象提供的方法，也可以使用二次封装的一些简便方法。

#### Pikachu.openPage

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
        let page = awaibrowser.openPage( 'home',    {
                viewType: 'iPhone 6',
                url: 'http://m.zuzuche.com'
            });
        done();
    } );
```







