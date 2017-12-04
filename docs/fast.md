# 快速开始

使用的环境需要注意
node环境必须大于7.1.x版本，建议使用8.9.1版本（使用8.9.1版本进行开发）。

### 安装

```JavaScript
npm install pikachu --save-dev
```

### 使用

命令行输入`pukachu`,默认会找当前运行目录下的`pikachu.config.js`文件。

```JavaScript
pikachu
```

也可以指定你要运行拿一份配置文件。  
注意：指定配置文件是相对于当前运行目录的路径

```JavaScript
pikachu --config ../pikachu.config.js
```

### 配置文件

如何编写配置文件。  

文件：pikachu.config.js，简单的打开一个浏览器的功能和测试断言的功能。

```JavaScript

const Pikachu = require( '../lib/Pikachu' );

Pikachu.startText( '测试', function () {

    before( '开启浏览器', ( done ) => {

        Pikachu.openBrowser( {
            headless: true,
            devtools: false
        } )
            .then( async ( browser ) => {
                let page = await browser.openPage('home', 
                    {
                        viewType: 'iPhone 6',
                        url: 'http://m.zuzuche.com'
                    });
                done();
            } );
    } )

    it( '1 加 1 应该等于 2', function () {
        Pikachu.expect( 1 + 1 ).to.be.equal( 2 );
    } );
    
} );

```

值得留意的是，当打开浏览器后，后续的对浏览器和页面的操作来至于`browser`和`page`这个两个对象，详细使用可以查看[API](https://github.com/LLLLLamHo/Pikachu/blob/master/docs/api.md)

