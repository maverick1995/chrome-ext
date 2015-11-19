 
var script = document.createElement('script');

script.src = chrome.extension.getURL('custom/resources/hub/inject.js') ; 
(document.body || document.head).appendChild(script);
sc= document.createElement('script') ; 
sc.type=  'text/javascript' ; 
sc.innerHTML = 'var flag = 1 ; ' ; 
document.head.appendChild(sc) ; 
window.addEventListener('message',  function(event){ 
	if(event.source!== window){
		return ; 
	}

	var message = event.data ; 
	if(typeof message!== 'object' || message === null || !message.source==='my-devtools-extension' ){
		return ; 
	}

	// sending message to the backgorund page. 



	//console.log(message) ; 
	if(!!message)
	chrome.runtime.sendMessage({greeting: message.topic ,sender : 'content-script.js'});

})
