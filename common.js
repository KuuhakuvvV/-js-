/**
 * Created by Administrator on 2017-09-18.
 */


/**
 * 格式化日期
 * @param dt 日期对象
 * @returns {string} 返回值是格式化的字符串日期
 */
function getDates(dt) {
    var str = "";//存储时间的字符串
    //获取年
    var year = dt.getFullYear();
    //获取月
    var month = dt.getMonth() + 1;
    //获取日
    var day = dt.getDate();
    //获取小时
    var hour = dt.getHours();
    //获取分钟
    var min = dt.getMinutes();
    //获取秒
    var sec = dt.getSeconds();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    str = year + "年" + month + "月" + day + "日 " + hour + ":" + min + ":" + sec;
    return str;
}


/**
 * 根据id属性的值，返回对应的标签元素
 * @param id id属性的值，string类型
 * @returns {HTMLElement} 元素对象
 */
function my$(id) {
    return document.getElementById(id);
}
function my$2(ClassName) {
    return document.getElementsByClassName(ClassName);
}
//获取任意标签中的文本内容
function getInnerText(element) {
    if (typeof element.textContent=="undefined"){
        return element.innerText;
    } else {
        return element.textContent;
    }
}
//设置任意标签中的任意文本内容
/**
 *
 * @param element
 * @param text
 */
function setInnerText(element,text) {
    if (typeof element.textContent=="undefined"){
        element.innerText=text;
    } else{
        element.textContent=text;
    }
}

//获取任意一个父级元素的第一个子级元素
function getFirstElementChild(element) {
    if(element.firstElementChild){//true--->支持
        return element.firstElementChild;
    }else{
        var node=element.firstChild;//第一个节点
        while (node&&node.nodeType!=1){
            node=node.nextSibling;
        }
        return node;
    }
}
//获取任意一个父级元素的最后一个子级元素
function getLastElementChild(element) {
    if(element.lastElementChild){//true--->支持
        return element.lastElementChild;
    }else{
        var node=element.lastChild;//第一个节点
        while (node&&node.nodeType!=1){
            node=node.previousSibling;
        }
        return node;
    }
}

//为任意元素.绑定任意的事件, 任意的元素,事件的类型,事件处理函数
function addEventListener(element,type,fn) {
    //判断浏览器是否支持这个方法
    if(element.addEventListener){
        element.addEventListener(type,fn,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,fn);
    }else{
        element["on"+type]=fn;
    }
}

//为任意元素.解绑对应的事件, 任意的元素,事件的类型,事件处理函数
function removeEventListener(element,type,fnName) {
    //判断浏览器是否支持这个方法
    if(element.removeEventListener){
        element.removeEventListener(type,fnName,false);
    }else if(element.detachEvent){
        element.detachEvent("on"+type,fnName);
    }else{
        element["on"+type]=fnName;
    }
}
//动画效果
//设置任意的一个元素,移动到指定的目标位置
function USanimate(element, target) {
    clearInterval(element.timeId);
    //定时器的id值存储到对象的一个属性中
    element.timeId = setInterval(function () {
        //获取元素的当前的位置,数字类型
        var current = element.offsetLeft;
        //每次移动的距离
        var step = 3;
        step = current < target ? step : -step;
        //当前移动到位置
        current += step;
        if (Math.abs(current - target) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            //清理定时器
            clearInterval(element.timeId);
            //直接到达目标
            element.style.left = target + "px";
        }
    }, 1);
}


//获取任意一个元素的任意一个样式属性的值

//  function getStyle(element,attr) {
//    //判断浏览器是否支持这个方法
//    if(window.getComputedStyle){
//      return window.getComputedStyle(element,null)[attr];
//    }else{
//      return element.currentStyle[attr];
//    }
//  }
//

//获取任意一个元素的任意一个属性的当前的值---当前属性的位置值
function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0;
}

/**
 *
 * @param element   //元素
 * @param json      //对象--多个属性的多个目标值 //例如：var json={"width":200,"opacity":0.8,"zIndex"=1000}
 * @param fn        //回调函数
 */
function animate(element,json, fn) {
    clearInterval(element.timeId);//清理定时器
    //定时器,返回的是定时器的id
    element.timeId = setInterval(function () {
        var flag = true;//默认,假设,全部到达目标
        //遍历json对象中的每个属性还有属性对应的目标值
        for (var attr in json) {
            //判断这个属性attr中是不是opacity
            if (attr == "opacity") {
                //获取元素的当前的透明度,当前的透明度放大100倍
                var current = getStyle(element, attr) * 100;
                //目标的透明度放大100倍
                var target = json[attr] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;//移动后的值
                element.style[attr] = current / 100;
            } else if (attr == "zIndex") { //判断这个属性attr中是不是zIndex
                //层级改变就是直接改变这个属性的值
                element.style[attr] = json[attr];
            } else {//普通的属性

                //获取元素这个属性的当前的值
                var current = parseInt(getStyle(element, attr));
                //当前的属性对应的目标值
                var target = json[attr];
                //移动的步数
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;//移动后的值
                element.style[attr] = current + "px";
            }
            //是否到达目标
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            //清理定时器
            clearInterval(element.timeId);
            //所有的属性到达目标才能使用这个函数,前提是用户传入了这个函数
            if (fn) {
                fn();
            }
        }
        //测试代码
        console.log("目标:" + target + ",当前:" + current + ",每次的移动步数:" + step);
    }, 20);
}