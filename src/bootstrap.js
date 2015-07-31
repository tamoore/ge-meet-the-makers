//import  { Application }  from './lib/index';
//import  { MobileApplication } from './lib-mobile/index';

function addCSS(url) {
    var head = document.querySelector('head');
    var link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', url);
    head.appendChild(link);
}

var mobileCss ='css/main-mobile.css';
var desktopCss= 'css/main.css';

$(function(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        var MobileApplication = require('./lib-mobile/index');
        addCSS(mobileCss);
        new MobileApplication.MobileApplication();
    }else{
        var Application = require('./lib/index');
        var browser = require('detect-browser');
        if(browser.name == "ie"){
            if(parseInt(browser.version) < 10){
                window.location.href = "http://labs.theguardian.com/innovation-never-sleeps/not-supported.html";
            }
        }

        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
            if(browser.version.charAt(2) == "7"){
                document.querySelector('body').className ="safari";
            }

        }
        addCSS(desktopCss);
        new Application.Application();
    }
});