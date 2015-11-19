
window.onload = function(){
  chrome.runtime.sendMessage({content : 'loaded'  , sender :  'panel.js'}  , function(response){
    
  } ) ; 
}

getid = function(url){
    len = url.length ; 
    start = url.indexOf('tab=') + 4 ; 
    var str =  url.substr(start, len-1) ; 

    x = Math.round(str) ; 
    return x ;
};

chrome.runtime.onMessage.addListener(function(message ,sender ,response){
  id =  getid(window.location.href) ; 
  if(message.sender===  'background.js'  && message.id === id ){
    console.log(message) ; 
    do_something(message.content.greeting) ;
  }
     
}); 

function do_something(msg) {
    //document.body.textContent += '\n' + msg; // Stupid example, PoC

    (function() {

      var table = document.querySelector('.table');
      var row   = table.insertRow(1) ; 
      var cell1 = row.insertCell(0) ; 
      var cell2 = row.insertCell(1) ;
      var cell3 = row.insertCell(2) ;
      var cell4 = row.insertCell(3) ;  
      var cell5 = row.insertCell(4) ; 
      cell2.innerHTML = 'publish' ; 
      cell3.innerHTML = msg.topic ;
      var currentdate = new Date(); 
      var datetime =  currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds();
      cell1.innerHTML = datetime ;  
      if(msg.present){
        cell4.innerHTML = 'Subsribed' ; 
      }
      else{
        cell4.innerHTML = '-' ; 
      }
      //cell4.innerHTML = msg.present ; 
      //console.log('hello wwww') ; 
      cell5.innerHTML = msg.data ; 

})();
}
document.documentElement.onclick = function() {
    // No need to check for the existence of `respond`, because
    // the panel can only be clicked when it's visible...
    chrome.runtime.sendMessage(  {content : 'closed'  ,sender  : 'panel.js'} , function(response){} )

    respond('Another stupid example!');
};