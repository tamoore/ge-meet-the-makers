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
        addCSS(desktopCss);
        new Application.Application();
    }
});