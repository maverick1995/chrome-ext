var onDataCallBack = function(topic, data1){
//console.log(topic) ; 
//console.log(data1) ; 
var str ;
if(JSON.stringify(data1 ,null , 2)){
	str = JSON.stringify(data1, null ,2) ; 
}
else{
	str = '-' ; 
}
var data = topic.split('.') ; 
var source = OpenAjax.hub._subscriptions.c ; 
var present = 1 ; 
while(prop = data.shift()){
	if(!source[prop]){
		present= 0 ; 
	}
	else{
		source   = source[prop].c ; 
	}
}
//console.log(topic + '  '+ present) ; 


var current = new Date() ; 
// sending message to the content-script 
window.postMessage({
	topic: topic , 
	data: str ,
	time: current , 
	present : present ,
	source: 'my-devtools-extension'
} , '*') ;

} ; 
if(window.OpenAjax){
OpenAjax.hub.subscribe('*.**' , onDataCallBack) ;
console.log('OpenaAjax subscribed') ;	
}
