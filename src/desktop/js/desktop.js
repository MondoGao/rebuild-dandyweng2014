var tempTimer, pageTimer;
var maptip = document.getElementById('map-hover');
window.onload = function() {
    changeActive();
    addAngle();
    bindMapEvent();
    bindPortaitEvent();
};

// var portaitState = false;
function bindPortaitEvent() {
    var enterDirection = "";
    var portait = document.getElementById('portait');
    var offOut = portait.querySelector('.offset-outer');
    var offIn = portait.querySelector('.offset-inner');
    var front = offIn.querySelector('.sticker-front');
    var back = offIn.querySelector('.sticker-back');
    portait.onmousemove = function(e) {
        var relaTop = e.clientY - this.getBoundingClientRect().top;
        var relaLeft = e.clientX - this.getBoundingClientRect().left;
        switch (enterDirection) {
            case 'right':
                offOut.style.width = 50 + relaLeft/2 + 'px';
                back.classList.remove('up','right','left','down');
                back.classList.add('right');
                back.style.transform = 'translateX(-' + (100 - relaLeft) + 'px) scaleX(-1)';
                back.querySelector('.sticker-shadow').style.height = "100%";
                back.querySelector('.sticker-shadow').style.width = 55 - relaLeft/2 + 'px';
                // back.querySelector('.sticker-shadow').style.right = 30 - relaLeft/2 + 'px';
                break;
            case 'down':
                offOut.style.height = 50 + relaTop/2 + 'px';
                back.classList.remove('up','right','left','down');
                back.classList.add('down');
                back.style.transform = 'translateY(-' + (100 - relaTop) + 'px) scaleY(-1)';
                back.querySelector('.sticker-shadow').style.width = '100%';
                back.querySelector('.sticker-shadow').style.height = 55 - relaTop/2 + 'px';
                break;
            case 'left':
                offOut.style.width = (100 - relaLeft/2) + 'px';
                offOut.style.transform = 'translateX(' + relaLeft/2 + 'px)';
                offIn.style.transform = 'translateX(-' + relaLeft/2 + 'px)';
                back.classList.remove('up','right','left','down');
                back.classList.add('left');
                back.style.transform = 'translateX(' + relaLeft + 'px) scaleX(-1)';
                back.querySelector('.sticker-shadow').style.height = '100%';
                back.querySelector('.sticker-shadow').style.width = relaLeft/2 + 5 + 'px';
                break;
            case 'up':
                offOut.style.height = (100 - relaTop/2) + 'px';
                offOut.style.transform = 'translateY(' + relaTop/2 + 'px)';
                offIn.style.transform = 'translateY(-' + relaTop/2 + 'px)';
                back.classList.remove('up','right','left','down');
                back.classList.add('up');
                back.style.transform = 'translateY(' + relaTop + 'px) scaleY(-1)';
                back.querySelector('.sticker-shadow').style.width = '100%';
                back.querySelector('.sticker-shadow').style.height = 5 + relaTop/2 + 'px';
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
        offOut.style.transform = 'translateX(0) translateY(0)';
        offIn.style.transform = 'translateX(0) translateY(0)';
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
    // console.log(e);
}

function addAngle() {
    var sections = document.querySelectorAll('section');
    var angleTemplate = document.querySelector('#section-angle');
    if(!sections.forEach) {
        for(var sec of sections) {
            var clone = document.importNode(angleTemplate.content, true);
            if(sec.id != 'contact')
                sec.appendChild(clone);
            // Todo: 适配火狐
            // clone.href = '#' + sec.id;
        }
    } else {
        sections.forEach(function(element, index, array) {
            var clone = document.importNode(angleTemplate.content, true);
            if(index != 6)
                element.appendChild(clone);
        });
        // 无法在上面添加href
        document.querySelectorAll('.angle').forEach(function(element, index, array) {
            if(index != 6)
                element.href = '#' + sections[index + 1].id;
                element.onclick = function(e) {
                    e.preventDefault();
                    scrollPosition(sections[index + 1].id);
                };
        });
    }
}

document.body.onwheel = function(e) {
    clearInterval(tempTimer);
    clearTimeout(pageTimer);
    changeActive();

    var deltaY = e.deltaY*5;
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
            if(getScrollOffsets().y < document.getElementById('contact').offsetTop)
                pageTimer = setTimeout(function() {
                    scrollPosition(document.querySelector('section:not(.inactive)').id);
                }, 1000);
        }
        window.scrollBy(0, tempDeltaY);
        deltaY -= tempDeltaY;
        changeActive();
    }, 15);
};

document.querySelector('#enter-fullscreen').onclick = function() {
    launchFullScreen(document.body);
};
document.getElementById('btn-fullscreen').onclick = function() {
    launchFullScreen(document.body);
};

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
    var sY = getScrollOffsets().y;
    var sections = document.querySelectorAll('section');
    var active = 0;
    for(var i = 0; i < 7; i++) {
        if(sY > sections[i].offsetTop - getViewPortSize().y/2) {
            active = i;
        }
    }
    sections[active].classList.remove('inactive');
    for(var i = 0; i < 7; i++) {
        if(i != active) {
            sections[i].classList.add('inactive');
        }
    }
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

function scrollPosition(_obj) {//参数_obj可以是任何页面上存在的元素的id，或者是指定元素本身
    var targetY;
    if (!_obj) { //如果不指定锚点元素，就跳到页面顶端0，0位置
        targetY = 0;
    } else {
        if (typeof (_obj) == "string") {
            _obj = document.getElementById(_obj);
        } else {
            _obj = _obj;
        }
        targetY = _obj.getBoundingClientRect().top + getScrollOffsets().y;
    }

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
