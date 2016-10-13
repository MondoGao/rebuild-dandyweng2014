var tempTimer, pageTimer;
var maptip = document.getElementById('map-hover');
var lbData = [];
var deltaY= 0;
var mapdata;
window.onload = function() {
    bindOtherEvent();
    changeActive();
    bindPortaitEvent();
    bindLightboxEvent();
    isFullScreen();
    addAngle();

    
    // test function
    getMapdata();
    bindMapEvent();
};

function isFullScreen () {
    if(getViewPortSize().y > 800 && getViewPortSize().x > 1440) {
        document.querySelector('#enter-fullscreen').style.opacity = 0;
        document.querySelector('#enter-fullscreen').style.pointerEvents = 'none';
    } else {
        document.querySelector('#enter-fullscreen').style.opacity = 1;
        document.querySelector('#enter-fullscreen').style.pointerEvents = 'auto';
    }
}

function getMapdata() {
    try {
    var xml = new XMLHttpRequest();
    xml.onreadystatechange = function() {
        if (xml.status==200) {
            mapdata = eval(xml.responseText);
            console.log(mapdata);
        }
    };
    xml.open('GET', 'http://www.magcin.cn/weng/mapData.json', true);
    xml.setRequestHeader('Access-Control-Allow-Origin','*');
    xml.send();
} catch (e) {return 0;}
}

function articleScroll(deltaX, _this) {
    var controller = document.getElementById('lectures').querySelectorAll('.controller');
    var marginLeftN = Number(window.getComputedStyle(_this)['margin-left'].split('px')[0]);
    // ff的delta比其他浏览器小，扩大
    if (getBrowserVersion() == 'firefox') {
        deltaX *= 12;
    }
    // console.log();
    if(deltaX > 0 && marginLeftN + deltaX > 0) {
        deltaX = -marginLeftN;
        controller[0].style.opacity = 0;
        controller[1].style.opacity = 1;
    } else if (deltaX < 0 && marginLeftN + deltaX < -_this.scrollWidth + getViewPortSize().x) {
        deltaX = -_this.scrollWidth + getViewPortSize().x - marginLeftN;
        controller[0].style.opacity = 1;
        controller[1].style.opacity = 0;
    } else {
        controller[0].style.opacity = 1;
        controller[1].style.opacity = 1;
    }
    _this.style.marginLeft = marginLeftN + deltaX + 'px';
}

function changeImg (dest, lbImg, lb, lbLoader) {
    if(Number(lbImg.dataset.index) + dest < 0) {
        dest = 13;
    } else if (Number(lbImg.dataset.index) + dest > lbData.length - 1) {
        dest = -13;
    }
    var img = new Image();
    img.onload = function() {
        var imgw = img.width;
        var imgh = img.height;
        var wDh = imgw/imgh;
        var maxw = document.body.clientWidth - 40;
        var maxh = document.body.clientHeight - 150;
        // console.log(wDh);
        if(wDh > maxw/maxh) {
            var finW = Math.min(imgw, maxw);
            lb.querySelector('.out-container').style.width = finW + 'px';
            lbImg.style.width = finW - 8 + 'px';
            lb.querySelector('.out-container').style.height = finW/wDh + 'px';
            lbImg.style.height = finW/wDh - 8 + 'px';
        } else {
            var finH = Math.min(imgh, maxh);
            lb.querySelector('.out-container').style.height = finH + 'px';
            lbImg.style.height = finH - 8 + 'px';
            lb.querySelector('.out-container').style.width =  finH * wDh + 'px';
            lbImg.style.width = finH * wDh - 8 + 'px';
        }
        lbImg.src = img.src;
        lbImg.dataset.index = Number(lbImg.dataset.index) + dest;
        lbLoader.classList.add('complete');
        lbImg.className = "complete";
    };
    img.src = 'src/desktop/img/lightbox/' + lbData[Number(lbImg.dataset.index) + dest];
}

function resetImage(_a, lbOverlay, lb, lbImg,lbLoader) {
    lbOverlay.className = lb.className = "show";
    var img = new Image();
    img.onload = function() {
        var imgw = img.width;
        var imgh = img.height;
        var wDh = imgw/imgh;
        var maxw = document.body.clientWidth - 40;
        var maxh = document.body.clientHeight - 150;
        if(wDh > maxw/maxh) {
            var finW = Math.min(imgw, maxw);
            lb.querySelector('.out-container').style.width = finW + 'px';
            lb.querySelector('.out-container').style.height = finW/wDh + 'px';
            lbImg.style.width = finW - 8 + 'px';
            lbImg.style.height = finW/wDh - 8 + 'px';
        } else {
            var finH = Math.min(imgh, maxh);
            lb.querySelector('.out-container').style.height = finH + 'px';
            lbImg.style.height = finH - 8 + 'px';
            lb.querySelector('.out-container').style.width =  finH * wDh + 'px';
            lbImg.style.width = finH * wDh - 8 + 'px';
        }
        lbImg.src = img.src;
        lbImg.dataset.index = _a.querySelector('img').dataset.index;
        setTimeout(function() {
            lbLoader.classList.add('complete');
            lbImg.className = "complete";
        }, 1000);
    };
    img.src = 'src/desktop/img/lightbox/' + _a.querySelector('img').dataset.highres;
}
var lbtimer;
function bindLightboxEvent() {
    var lbOverlay = document.getElementById('lightbox-overlay');
    var lb = document.getElementById('lightbox');
    var lbImg = lb.querySelector('img');
    var lbLoader = lb.querySelector('.loader');
    var lbNav = lb.querySelector('.nav');
    var montage = document.getElementById('montage');
    var index = 0;
    for(var a of montage.getElementsByTagName('a')) {
        lbData.push(a.querySelector('img').dataset.highres);
        a.querySelector('img').dataset.index = index;
        a.onclick = function(e) {
            e.preventDefault();
            resetImage(this, lbOverlay, lb, lbImg, lbLoader);
        }
        index++;
    }
    lbNav.querySelector('.prev').onclick = function() {
        clearTimeout(lbtimer);
        lbLoader.classList.remove('complete');
        lbImg.className = "";
        lbtimer = setTimeout(function() {
            changeImg(-1, lbImg, lb, lbLoader);
        }, 700);
    };
    lbNav.querySelector('.next').onclick = function() {
        clearTimeout(lbtimer);
        lbLoader.classList.remove('complete');
        lbImg.className = "";
        lbtimer = setTimeout(function() {
            changeImg(1, lbImg, lb, lbLoader);
        }, 700);
    };
    lbOverlay.onclick = function() {
        lbOverlay.className = lb.className = "";
        lbLoader.classList.remove('complete');
        lbImg.className = "";
    };
}

// var portaitState = false;
function bindPortaitEvent() {
    var enterDirection = "";
    var portait = document.getElementById('portait');
    var offOut = portait.querySelector('.offset-outer');
    var offIn = portait.querySelector('.offset-inner');
    var front = offIn.querySelector('.sticker-front');
    var back = offIn.querySelector('.sticker-back');

    function portaitAnimate(hW,relaLeft,relaTop) {
        offOut.style[hW] = 50 + (hW == 'width'?relaLeft:relaTop)/2 + 'px';
        back.classList.remove('up','right','left','down');
        back.classList.add(enterDirection);
        back.style.transform = 'translate'+ (hW == 'width'?'X':'Y') +'(-' + (100 - (hW == 'width'?relaLeft:relaTop)) + 'px) scale'+ (hW == 'width'?'X':'Y') +'(-1)';
        back.querySelector('.sticker-shadow').style[hW = 'width' ? 'height' : 'width'] = "100%";
        back.querySelector('.sticker-shadow').style[hW] = 55 - (hW == 'width'?relaLeft:relaTop)/2 + 'px';
    }
    function portaitAnimate2(hW,relaLeft,relaTop) {
        offOut.style[hW] = (100 - (hW == 'width'?relaLeft:relaTop)/2) + 'px';
        offOut.style.transform = 'translate'+ (hW == 'width'?'X':'Y') +'(' + (hW == 'width'?relaLeft:relaTop)/2 + 'px)';
        offIn.style.transform = 'translate'+ (hW == 'width'?'X':'Y') +'(-' + (hW == 'width'?relaLeft:relaTop)/2 + 'px)';
        back.classList.remove('up','right','left','down');
        back.classList.add(enterDirection);
        back.style.transform = 'translate'+ (hW == 'width'?'X':'Y') +'(' + (hW == 'width'?relaLeft:relaTop) + 'px) scale'+ (hW == 'width'?'X':'Y') +'(-1)';
        back.querySelector('.sticker-shadow').style[hW = 'width' ? 'height' : 'width'] = '100%';
        back.querySelector('.sticker-shadow').style[hW] = (hW == 'width'?relaLeft:relaTop)/2 + 5 + 'px';
    }

    portait.onmousemove = function(e) {
        var relaTop = e.clientY - this.getBoundingClientRect().top;
        var relaLeft = e.clientX - this.getBoundingClientRect().left;
        switch (enterDirection) {
            case 'right':
                portaitAnimate('width', relaLeft, relaTop);
                break;
            case 'down':
                portaitAnimate('height', relaLeft, relaTop);
                break;
            case 'left':
                portaitAnimate2('width', relaLeft, relaTop);
                break;
            case 'up':
                portaitAnimate2('height', relaLeft, relaTop);
                break;
            default:
            console.log("default");
            break;
        }
    };
    portait.onmouseenter = function(e) {
        offOut.style.transition = offIn.style.transition = back.style.transition = 'none';
        var relaTop = e.clientY - this.getBoundingClientRect().top;
        var relaLeft = e.clientX - this.getBoundingClientRect().left;
        enterDirection = getEnterDirection(relaTop, relaLeft, this);
        // portaitState = true;
    };
    portait.onmouseleave = function(e) {
        offOut.style.transition = offIn.style.transition = 'all .4s linear';
        back.style.transition = 'transform .4s linear';
        // portaitState = false;
        offOut.style.height = offOut.style.width = '100px';
        offOut.style.transform = offIn.style.transform = 'translateX(0) translateY(0)';
        //  'translateX(0) translateY(0)';
        switch(enterDirection) {
            case 'right':
            case 'left':
            back.style.transform = 'translateX(0) translateY(0) scaleX(-1)';
            break;
            case 'up':
            case 'down':
            back.style.transform = 'translateX(0) translateY(0) scaleY(-1)';
            break;
            default:
            break;
        }
    };
}

function getEnterDirection(relaT, relaL, ele) {
    var y = relaT - ele.getBoundingClientRect().height/2;
    var x = -relaL + ele.getBoundingClientRect().width/2;
    // 从x右轴开始，逆时针方向为证取角度
    var angle = Math.atan2(y, x) *180/Math.PI + 180;
    // 通过round将划分线放在对角线上
    var direction = Math.round(angle / 90);
    // 方便使用，从“direction”进入
    switch(direction) {
        case 1:
        return 'up';
        case 2:
        return 'left';
        case 3:
        return 'down';
        default:
        return 'right';
    }
}

function bindMapEvent() {
    bindGEvent(document.querySelectorAll('g')[0], 'data-code');
    bindGEvent(document.querySelectorAll('g')[1], 'data-index');
    document.querySelectorAll('path').forEach(function(ele,index,array) {
        ele.onmousemove = function(e) {

        };
    });
}

function bindGEvent(g, data) {
    g.onmousemove = function(e) {
        changeMaptipPos(e, data);
    };
    g.onmouseout = function(e) {
        maptip.style.opacity = 0;
    };
    g.onmouseover = function(e) {
        maptip.style.opacity = 1;
    };
}

function changeMaptipPos(e, data) {
    maptip.innerHTML = e.srcElement.getAttribute(data);
    maptip.style.top = e.clientY + 'px';
    maptip.style.left = e.clientX + 'px';
    if(data == 'data-index' && mapdata) {
        maptip.innerHTML = mapdata.items[maptip.innerHTML].name;
    }
    // console.log(e);
}

function addAngle() {
    var sections = document.querySelectorAll('section');
    var angleTemplate = document.querySelector('#section-angle');
    // if(!sections.forEach) {
        // for(var sec of sections) {
        //     var clone = document.importNode(angleTemplate.content, true);
        //     if(sec.id != 'contact')
        //         sec.appendChild(clone);
        //     // Todo: 适配火狐
        //     // clone.href = '#' + sec.id;
        // }
    // } else {
    angle = angleTemplate.content.querySelector('.angle');
    sections.forEach(function(element, index, array) {
        if(index < 6) {
            angle.dataset.next = '#' + sections[index + 1].id;
            // debugger;
            // importNode及cloneNode都不会复制节点用js动态绑定的事件。
            var clone = document.importNode(angleTemplate.content, true);
            element.appendChild(clone);
            var allAngle = document.querySelectorAll('.angle');
            allAngle[allAngle.length - 1].addEventListener("click", scrollPosition);
        }
    });
        // 无法在上面添加href

        // document.querySelectorAll('.angle').forEach(function(element, index, array) {
        //     if(index != 6)
        //         element.href = '#' + sections[index + 1].id;
        //         element.onclick = function(e) {
        //             e.preventDefault();
        //             scrollPosition(sections[index + 1].id);
        //         };
        // });
    // }
}


function launchFullScreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

// 启动全屏!

//onscroll经常不触发，暂时没找到原因，改成函数。
function changeActive() {
    // var sY = getScrollOffsets().y;
    var activeSecs = [];
    var sections = document.querySelectorAll('section');
    for(var i = 0; i < 7; i++) {
        // if(sY > sections[i].offsetTop - getViewPortSize().y/2 - 100) {
        if(Math.abs(sections[i].getBoundingClientRect().top) < getViewPortSize().y/2 + 100) {
            sections[i].classList.remove('inactive');
        } else {
            sections[i].classList.add('inactive');
        }
        // else if (sY > sections[i].offsetTop - getViewPortSize().y/2 + 100){}
    }
    // sections[active].classList.remove('inactive');
    // for(var i = 0; i < 7; i++) {
    //     if(i != active) {
    //         sections[i].classList.add('inactive');
    //     } else {
    //         sections[i].classList.remove('inactive');
    //     }
    // }
    // for(var sec of activeSecs) {
    //     sec.classList.remove('inactive');
    // }
}

function bindOtherEvent() {
    document.body.onwheel = function(e) {
        clearInterval(tempTimer);
        clearTimeout(pageTimer);
        changeActive();

        deltaY += e.deltaY*5;
        // ff的delta比其他浏览器小，扩大
        if (getBrowserVersion() == 'firefox') {
            deltaY *= 12;
        }
        tempTimer = setInterval(function () {
            var tempDeltaY =  deltaY / 10;
            if (Math.abs(tempDeltaY) < 0.5) {
                clearInterval(tempTimer);
                clearTimeout(pageTimer);
                //页面滚动超过contact后不再纠正位置
                if(getScrollOffsets().y < document.getElementById('contact').offsetTop && getViewPortSize().y > 800 && document.querySelectorAll('section:not(.inactive)').length < 2)
                    pageTimer = setTimeout(function() {
                        this.dataset = {};
                        this.dataset.next = '#' + document.querySelector('section:not(.inactive)').id;
                        scrollPosition({preventDefault: function(){}});
                    }, 1000);
            } else if(Math.abs(tempDeltaY) > 400) {
                tempDeltaY = 400;
            }
            window.scrollBy(0, tempDeltaY);
            deltaY -= tempDeltaY;
            changeActive();
        }, 15);
    };
    window.onresize = function () {
        isFullScreen();
    };
    document.querySelector('article.video-available').onclick = function() {
        var p = document.getElementById('player').getElementsByTagName('p')[0];
        var iframe = document.createElement('iframe');
        iframe.src = 'http://player.youku.com/embed/' + document.querySelector('[data-youku]').dataset.youku;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('quality', 'high');
        iframe.setAttribute('style','width:100%;height:100%;opacity:0;transition:opacity 1s;');
        iframe.onload = function() {
            console.log('video is ready');
            setTimeout(function() {
                p.style.opacity = 0;
                p.style.pointerEvents = 'none';
                iframe.style.opacity = 1;
            },700);
        };
        document.getElementById('player').insertBefore(iframe, p);
        document.getElementById('player').className = "";
    };
    document.getElementById('trypophobia').onclick = function() {
        document.getElementById('map').querySelectorAll('g')[1].style.opacity = 0;
        document.getElementById('map').querySelectorAll('g')[1].style.pointerEvents = 'none';
        this.style.opacity = 0;
        this.style.pointerEvents = 'none';
    };
    document.getElementById('lectures-inner').onwheel = function (e) {
        e.stopPropagation();
        // var controller = document.getElementById('lectures').querySelectorAll('.controller');
        articleScroll(-e.deltaY*5, this);

    };
    var controller = document.getElementById('lectures').querySelectorAll('.controller');
    controller[0].onclick = function() {
        articleScroll(300, document.getElementById('lectures-inner'));
    };
    controller[1].onclick = function() {
        articleScroll(-300, document.getElementById('lectures-inner'));
    };
    document.querySelector('#enter-fullscreen').onclick = function() {
        this.style.opacity = 0;
        this.style.pointerEvents = 'none';
        launchFullScreen(document.body);
    };
    document.getElementById('btn-fullscreen').onclick = function() {
        launchFullScreen(document.body);
    };
}

function getBrowserVersion () {
    // 网络资源，运用正则和三元运算符，后期研究
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? Sys.ie = s[1] :
    (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
    (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
    (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
    (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
    (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

    if (Sys.ie) return 'ie';
    if (Sys.firefox) return 'firefox';
    if (Sys.chrome) return 'chrome';
    if (Sys.opera) return 'opera';
    if (Sys.safari) return 'safari';
}

function getScrollOffsets(_w) {//获取页面的滚动位置
    _w = _w || window;
    //for all and IE9+
    if (_w.pageXOffset != null) return {
        x: _w.pageXOffset,
        y: _w.pageYOffset
    };
    //for IE678
    var _d = _w.document;
    if (document.compatMode == "CSS1Compat") return {
        x: _d.documentElement.scrollLeft,
        y: _d.documentElement.scrollTop
    };
    //for other mode
    return {
        x: _d.body.scrollLeft,
        y: _d.body.scrpllTop
    };
}

function getViewPortSize(_w) {//获取页面的窗口大小
    _w = _w || window;
    //for all and IE9+
    if (_w.innerWidth != null) return {
        x: _w.innerWidth,
        y: _w.innerHeight
    };
    //for IE678
    var _d = _w.document;
    if (document.compatMode == "CSS1Compat") return { //for IE678
        x: _d.documentElement.clientWidth,
        y: _d.documentElement.clientHeight
    };
    //for other mode
    return {
        x: _d.body.clientWidth,
        y: _d.body.clientHeight
    };
}

function scrollPosition(e) {//参数_obj可以是任何页面上存在的元素的id，或者是指定元素本身

    e.preventDefault();
    var targetY = document.querySelector(this.dataset.next).getBoundingClientRect().top + getScrollOffsets().y;
    // if (!_obj) { //如果不指定锚点元素，就跳到页面顶端0，0位置
    //     targetY = 0;
    // } else {
    //     if (typeof (_obj) == "string") {
    //         _obj = document.getElementById(_obj);
    //     } else {
    //         _obj = _obj;
    //     }
    //     targetY = _obj.getBoundingClientRect().top + getScrollOffsets().y;
    // }

    //如果目标元素的位置在最后一屏，那就指定目标位置为页面底部
    //如果目标元素的位置为负数，就指定目标位置为页面顶部
    var maxTargetY=document.body.scrollHeight-getViewPortSize().y;
    if(targetY>=maxTargetY) targetY=maxTargetY;
    if(targetY<0) targetY=0;
    clearInterval(tempTimer);

    tempTimer = setInterval(function () {

        changeActive();
        var currentY = getScrollOffsets().y;
        //跳转位置的缓冲公式
        var tempTargetY = currentY - (currentY - targetY) / 10;
        //由于缓冲公式会生成小数，而scrollTo函数会省略小数点后面的数字，所以要对跳转的坐标做一些微调
        if (Math.abs(tempTargetY - currentY) < 1) {
            tempTargetY - currentY > 0 ? tempTargetY++ : tempTargetY--;
        }
        //页面跳转
        window.scrollTo(0, tempTargetY);
        //到达指定位置后清除一下Interval
        if ( Math.abs(getScrollOffsets().y - targetY) <= 2 ) {
            clearInterval(tempTimer);
            window.scrollTo(0, targetY);
            //console.log("done");
        }
    }, 15);
}
