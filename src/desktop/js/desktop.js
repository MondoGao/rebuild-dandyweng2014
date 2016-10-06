var tempTimer, pageTimer;
changeActive();
addAngle();

var maptip = document.getElementById('map-hover');
document.querySelectorAll('g')[0].onmousemove = function(e) {
    changeMaptipPos(e, 'data-code');
};
document.querySelectorAll('g')[1].onmousemove = function(e) {
    changeMaptipPos(e, 'data-index');
};
document.querySelectorAll('g')[0].onmouseout = function(e) {
    maptip.style.opacity = 0;
};
document.querySelectorAll('g')[1].onmouseout = function(e) {
    maptip.style.opacity = 0;
};
document.querySelectorAll('g')[0].onmouseover = function(e) {
    maptip.style.opacity = 1;
};
document.querySelectorAll('g')[1].onmouseover = function(e) {
    maptip.style.opacity = 1;
};
function changeMaptipPos(e, data) {
    maptip.innerHTML = e.srcElement.getAttribute(data);
    maptip.style.top = e.clientY + 'px';
    maptip.style.left = e.clientX + 'px';
    console.log(e);
}
document.querySelectorAll('path').forEach(function(ele,index,array) {
    ele.onmousemove = function(e) {

    };
});

function addAngle() {
    var sections = document.querySelectorAll('section');
    var angleTemplate = document.querySelector('#section-angle');
    document.querySelectorAll("section").forEach(function(element, index, array) {
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

document.body.onwheel = function(e) {
    clearInterval(tempTimer);
    changeActive();

    var deltaY = e.deltaY*10;
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
