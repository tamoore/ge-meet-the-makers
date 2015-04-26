import $ from 'jquery';

class Application {
	constructor(){
		console.log('ready');
	}
}

$(function(){
	new Application(); 
});