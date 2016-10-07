# rebuild-dandyweng2014

## Change Log
纪录实习期的学习和该项目更新纪录

### Unreleased
#### Prepare
- 原生js实现getJSON方法
- body高度和滚动问题

### [1.0.0] - 2016-10-08
#### Added
- 图片lightbox效果
- 摄像部分缩略图和大图全部离线

#### Ready
- 爆肝

### [0.1.3] - 2016-10-07
#### Added
- 头像翻页效果

#### Fixed
- 一些小修正

### [0.1.2] - 2016-10-06
#### Added
- 页面加载效果
- 自动纠正页面位置
- 下一页箭头平滑滚动
- 地图悬浮提示效果

#### Ready
- 分析地图数据的获取方法（http://api.dandyweng.com/map-data.php?lang=zh&show-years=true&jsoncallback=?）

### [0.1.1] - 2016-10-06
#### Added
- 去除页面原滚动条，使用原生js完成页面平滑滚动
- 探测页面滚动大小播放进入退出动画js及css

#### Ready
- 复习animation，transition
- 学习getBoundingClientRect方法
- 学习wheel/mousewheel事件
- 学习触发浏览器全屏

#### Deprecated
- 全屏后无法滚动页面

### [0.1.0] - 2016-10-06
#### Added
- 增加全部可以用css完成的动画效果
- 增加关于桌面的响应式

#### Ready
- 元素scrollTop/scrollLeft属性控制滚动（在overflow: hidden下也依然有效）
- 学习scroll(), scrollTo()等方法
- 学习实现平滑滚动的方法

### [0.0.6] - 2016-10-06
#### Added
- 增加section 1,2,3,4的css过渡和大屏响应式

### [0.0.5] - 2016-10-05
#### Added
- 增加全部页面初步展现

#### Ready
- SVG的viewbox和viewport

### [0.0.4] - 2016-10-04
#### Added
- 增加全部页面结构
- 完成section 3,4,5和6的部分展现
- 增加少许的hover效果
- 离线更多的图片

#### Deprecated
- 目前图片格式较混乱，后期修改

### [0.0.3] - 2016-10-02
#### Added
- 增加section 1，2在大屏下的大概展现

#### Deprecated
- 时间轴与原网站定为方式差别较大，后期看情况修改

### [0.0.2] - 2016-10-02
#### Added
- 引入font-awesome
- 增加section 1,2的页面结构和注释

#### Ready
- 寻找类似的真实翻页效果插件及教程，如[turn.js]
- 分析section 1,2的结构和动效大体实现方式
    - 头像翻页效果由两面四层叠加完成，分别是两张图片和两个渐变叠加，图片使用scale（-1）来实现水平/垂直翻转；需要大量使用translate来保证头像位置不变
    - 加载按钮由两层阴影加一个半圆完成
    - 列表展开效果可通过margin调整实现

### 0.0.1 - 2016-10-01
#### Added
- 准备不同设备下的背景图片
- 使用desktop和mobile的template并注入
- 完成desktop下的一级DOM树

#### Ready
- 学习HTML5的Web组件化中的[Template]
- 学习HTML5的Web组件化中的[Shadow DOM]
- [CSS视差背景实现]

[0.0.2]: https://github.com/bestgaohua/rebuild-dandyweng2014/releases/tag/v0.0.2
[0.0.3]: https://github.com/bestgaohua/rebuild-dandyweng2014/releases/tag/v0.0.3
[0.0.4]: https://github.com/bestgaohua/rebuild-dandyweng2014/releases/tag/v0.0.4
[0.0.5]: https://github.com/bestgaohua/rebuild-dandyweng2014/releases/tag/v0.0.5
[0.0.6]: https://github.com/bestgaohua/rebuild-dandyweng2014/releases/tag/v0.0.6
[0.1.0]: https://github.com/bestgaohua/rebuild-dandyweng2014/releases/tag/v0.1.0
[0.1.1]: https://github.com/bestgaohua/rebuild-dandyweng2014/releases/tag/v0.1.1
[0.1.2]: https://github.com/bestgaohua/rebuild-dandyweng2014/releases/tag/v0.1.2
[0.1.3]: https://github.com/bestgaohua/rebuild-dandyweng2014/releases/tag/v0.1.3
[1.0.0]: https://github.com/bestgaohua/rebuild-dandyweng2014/releases/tag/v1.0.0

[Shadow DOM]: http://www.html5rocks.com/zh/tutorials/webcomponents/shadowdom/
[Template]: http://www.html5rocks.com/en/tutorials/webcomponents/template/
[CSS视差背景实现]: http://www.shejidaren.com/css-fixed-scroll-background.html
[turn.js]: http://www.turnjs.com/
