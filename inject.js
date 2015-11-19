sc = document.createElement('script') ; 
chrome.runtime.onMessage.addListener(function(  message, sender , response  ){
	if(message.sender==='mocks.js' ){
		test = 'ret =' + message.content + '\n' ; 
		send_message  =  'chrome.runtime.sendMessage({  sender : \'script\' , content : ret }} , function(reponse){console.log( ) ; }) ;'
		test = test + send_message ; 
		sc.type = 'text/javascript' ; 
		sc.innerHTML = test ; 
		document.head.appendChild(sc) ; 
	}

	if(message.sender==='script'){
		value  = message.content ; 
		msg = {
			content : value , 
			sender = 'inject.js' ; 
		}
		chrome.runtime.sendMessage(msg)
	}
});
