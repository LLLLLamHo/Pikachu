#API
---

## Page.js
---
Page.js 使用说明

* 引入
由 `require( '../lib/Pikachu' )` 的 `openBrowser` fn，得到的Promise对象，经 `.then(browser)`，
其中参数 `browser` ，得到了浏览器对象，调用该对象的 `openPage` fn，可得到打开新页面的页面对象，把得到
的页面对象作为测试用例入口fn参数，传给每一个测试用例fn作用域中。

* 使用
每个测试用例使用 `page.fn()` 的方式

* `page._$(selector)`
传入指定元素的id／类名／标签名等，fn返回page对象

* `page.query(selector)`
传入指定元素的id／类名／标签名等，fn返回元素对象，对象包含有元素的id，类名，属性集合，html字符串

* `page._$(selector).click(timer)`
`_$` 传入指定元素的id／类名／标签名等，获取到元素引用后，经 `.click(timer)` 可模拟触发元素点击操作，
参数 `timer` 指定当点击后延迟多久到下一个操作，fn返回Promise对象，当元素成功被点击，
返回的Promise对象将会被resolve

* `page._$(selector).focus(timer)`
`_$` 传入指定元素的id／类名／标签名等，获取到元素引用后，经 `.focus(timer)` 可模拟触发元素聚焦操作，
参数 `timer` 指定当聚焦后延迟多久到下一个操作，fn返回Promise对象，当元素成功被聚焦，
返回的Promise对象将会被resolve

* `page._$(selector).input(text, delay, timer)`
`_$` 传入指定元素的id／类名／标签名等，获取到元素引用后，经 `.input(text, delay, timer)`
可模拟表单输入操作，参数 `text` 指定输入文本，参数 `delay` 指定每输入一个字符间隔延迟，参数 `timer` 指定当输入后延迟多久到下一个操作，fn返回Promise对象，当元素成功被输入，返回的Promise对象将会被resolve

* `page._$(selector).select(option, timer)`
`_$` 传入指定元素的id／类名／标签名等，获取到元素引用后，经 `.select(option, timer)` 可模拟触发元素选择操作，
参数 `option` 指定选项，参数 `timer` 指定当选择后延迟多久到下一个操作，fn返回Promise对象，当元素成功被选择，
返回的Promise对象将会被resolve
