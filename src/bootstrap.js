import  { Application }  from './lib/index';
import  { MobileApplication } from './lib-mobile/index';

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
$(()=>{
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        addCSS(mobileCss);
        new MobileApplication();
    }else{
        addCSS(desktopCss);
        new Application();
    }
});