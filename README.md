# mux-ui

> A Vue.js  component

## Build Setup

``` bash
# install
npm install @niyang-es/mux-ui

```
# api
## Actionsheet组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|items|string[]/object[]|[]|组件展示的数据项|items为对象数组时，每一项必须含name，即：{name:string,[prop:value]}
|value|boolean|false|控制组件是否显示||
|cancel|boolean/object|false|控制是否显示取消按钮或者自定义取消按钮|自定义取消按钮{text:string}|
 |zIndex|number|2020|阴影层的层级|
 |closeOnMaskClick|boolean|true|点击阴影层是否隐藏组件|
 

##  按钮Button组件
 
 | 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|block|boolean|false|表现块元素|
|disabled|boolean|false|按钮disabled状态|
|plain|boolean|空心按钮|
|size|string|按钮尺寸,定义了small/normal/large三种尺寸|
|color|string|按钮颜色,定义了default/primary/danger/error四种颜色|

## 头像Avatar组件
 | 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|src|string|''|头像地址|需要完整的url地址|
|alt|string|avatar|图片的占位符|
|size|string/number|30|头像尺寸|
|flat|boolean|false|扁平化|
|fit|string|all|图片适配宽高|

## Cell组件
 | 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|arrow|boolean| false|是否有箭头|
|direction|string|row|定义cell的方向,row行/column列
|align|string|start|弹性布局的item-align的属性|
|justify|string|start|弹性布局content-justify的属性|

## Card组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|header|string|卡片头部|
|content|string|卡片内容|
|footer|string|卡片底部|

## Alert组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|title|string|提示|   
|value|boolean|false|   
|zIndex|number|2020|   
|transition|string|mux-bounce|   
|message|string|''|   
|btnText|string|确定|

## Confirm组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|title|string|提示|
|value|boolean|false|
|zIndex|number|2020|
|transition|string|mux-bounce|
|message|string|''|
|cancelBtnText|string|取消|
|confirmBtnText|string|确定|

## Prompt组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|title|string|提示|
|type|string|text|input的type属性|
|rules|array|[]|数组项function(v){return boolean||string}|
|value|boolean|false|
|zIndex|number|2020|
|transition|string|mux-bounce|
|cancelBtnText|string|取消|
|confirmBtnText|string|确定|

## Field组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|type|string|text|input类型，含H5输入类型email, number, password, search, tel, text, url|
|id|string|''|
|attrs|object|
|required|boolean|false|
|label|string|''|
|disabled|boolean|false|
|name|string|XFeild|
|value|string|''|
|placeholder|string|请输入|
|clearable|boolean|true|
|readonly|boolean|false|
|labelClass|string/array|[]|
|align|string|left|文字对齐方式left, center, right|
|plain|boolean|false|
|rounded|boolean|false|
|invalid|boolean|false|
|message|string|''|

## RadioGroup组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|block|boolean|false|
|value|string|
|reverse|boolean|false|反向|

## Radio组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|label|string|''|
|id|string|''|
|name|string|'XRadio'|
|checked|boolean|false|
|disabled|boolean|false|
|value|string|
|radioValue|string|''|

## Checkbox组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|value|array|[]|
|name|string|
|id|string|''|
|checked|boolean|false|
|disabled|boolean|false|
|partial|boolean|false|
|label|string|''|
|checkboxValue|string|''|


## Switch组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|onValue|string/boolean/number|true|
|offValue|string/boolean/number|false|
|disabled|boolean|false|
|readonly|boolean|false|
|value|string/boolean/number|true|


## Header组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|fixed|boolean|false|
|back|object/boolean]|true|
|title|string|''|
|more|boolean/bject|false|

## Sticky组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|top|number/string|0|
|left|number/string|auto|
|right|number/string|auto|
|bottom|number/string|auto|


## Tab组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|hideSlider|boolean|false|
|sliderSize|number|70|
|site|string|bottom|silder的位置top, bottom|
|fillCell|boolean|false|
|maxCell|number|6|


## TabItem组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|actived|boolean|false|


## Fold组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|title|string|''|
|value|boolean|false|

## Tree组件
| 属性 | 类型 | 默认值|描述|备注|
|:---------:|:---------:|:---------:|:---------:|:---------:|
|value|array|[]|
|items|array|[]|
|itemText|string|name|
|itemValue|string|id|
|itemChildren|string|children|
|checked|boolean|false|
|lazy|boolean|false|
|loadChildren|function|(id) => { }|
|useCheckbox|boolean|false|
|open|boolean|false|

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
