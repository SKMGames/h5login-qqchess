"use strict";


(function () {
    var canvas = document.querySelector("#GameCanvas");
    var gl = canvas.getContext("webgl");
    console.log("gl", gl);

    if (typeof VConsole !== 'undefined') {
        window.vConsole = new VConsole();
    }
    let splash = document.getElementById('splash');
    let progressBar = splash.querySelector('.progress-bar span');

    let curProgress = 0;

    splash.style.display = 'block';
    progressBar.style.width = '0%';

    let timerID = -1

    let progressFunc = function () {

        if (curProgress >= 1 || progressBar.style.width == "100%") {
            return;
        }
        let offset = Math.random() * (0.2)
        let totalPercent = curProgress + offset
        curProgress = Math.min(totalPercent, 0.95)
        progressBar.style.width = (curProgress) * 100 + "%"
        timerID = setTimeout(function () {
            progressFunc()
        }, offset * 5000);
    }

    progressFunc();
    splash.style.display = 'block';

}());

function loadScript(url, callback) {
    let d = document,
        s = document.createElement('script');

    if (window.location.protocol !== 'file:') {
        s.crossOrigin = 'anonymous';
    }

    s.async = true;
    s.src= url;
    function loadHandler() {
        s.parentNode.removeChild(s);
        s.removeEventListener('load', loadHandler, false);
        s.removeEventListener('error', errorHandler, false);
        console.log( "加载脚本成功：" + url );
        callback(true, url);
    }
    function errorHandler() {
        s.parentNode.removeChild(s);
        s.removeEventListener('load', loadHandler, false);
        s.removeEventListener('error', errorHandler, false);
        console.log( "加载脚本失败：" + url );
        callback(false, url);
    }
    s.addEventListener('load', loadHandler, false);
    s.addEventListener('error', errorHandler, false);
    d.body.appendChild(s);
}


function loadScripts(srcList, totalComplete) {
    let successList = [];
    let onComplete = function (success, src) {
        if (success) {
            successList.push(src);
            if (successList.length == srcList.length) {
                totalComplete && totalComplete();
            }
        }
        else {
            setTimeout(loadScript, 1000, src, onComplete);
        }
    }

    for (let i = 0; i < srcList.length; i++) {
        loadScript(srcList[i], onComplete);
    }
}


window.StarupQQChess = function( srcList,projectSrc )
{
    var canvas = document.querySelector("#GameCanvas");
    var gl = canvas.getContext("webgl");
    console.log("gl", gl);

    srcList = srcList.map(function (x) {
        return x + ".js";
    });
    loadScripts(srcList, function () {
        window.boot(projectSrc+".js");
    })
}
