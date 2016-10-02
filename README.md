# rebuild-dandyweng2014

# Change Log
纪录实习期的学习和该项目更新纪录

## Unreleased
### Prepared
- section 1，2在大屏下的大概展现

## 0.0.2 - 2016-10-02
### Added
- 引入font-awesome
- 增加section 1,2的页面结构和注释

### Ready
- [CSS视差背景实现]
- 寻找类似的真实翻页效果插件及教程，如[turn.js]
- 学习HTML5的Web组件化中的[Shadow DOM]
- 分析section 1,2的结构和动效大体实现方式
    - 头像翻页效果由两面四层叠加完成，分别是两张图片和两个渐变叠加，图片使用scale（-1）来实现水平/垂直翻转；需要大量使用translate来保证头像位置不变
    - 加载按钮由两层阴影加一个半圆完成
    - 列表展开效果可通过margin调整实现

## 0.0.1 - 2016-10-01
### Added
- 准备不同设备下的背景图片
- 使用desktop和mobile的template并注入
- 完成desktop下的一级DOM数

### Ready
- 学习HTML5的Web组件化中的[Template]

[Shadow DOM]: http://www.html5rocks.com/zh/tutorials/webcomponents/shadowdom/
[Template]: http://www.html5rocks.com/en/tutorials/webcomponents/template/
[CSS视差背景实现]: http://www.shejidaren.com/css-fixed-scroll-background.html
[turn.js]: http://www.turnjs.com/
