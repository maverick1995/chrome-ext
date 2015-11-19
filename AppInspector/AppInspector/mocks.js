// <debug>
var msg ;
var cd ; 

//var allow  = 1 ; 
getid = function(url){
    len = url.length ; 
    start = url.indexOf('tab=') + 4 ; 
    var str =  url.substr(start, len-1) ; 

    x = Math.round(str) ; 
    return x ;
};



var validate = function(str){ 
    if(str[0]!==  '"'){
        str = '"' + str ; 
    }
    if(str[str.length-1]!== '"'){
        str = str + '"' ; 
    }
    var i =0 ;  
    while(str[i]===' '){ 
        i++ ; 
    }
    str = str.substring(i ,str.length ) ;  
    i = str.length -1 ; 
    while(str[i]===' '){
        i-- ; 
    }
    str = str.substring(0, i+1) ;  
    ////str = ''
    return str ; 
} 

//mock the APIs for debugging
var i =  0 ; 
if (!chrome.devtools) {
    chrome.devtools = {
        inspectedWindow : {
            //as a brilliant hack, let's just run the code on AppInspector itself!
            eval : function (contextFn, callback) {
                //var result = eval(contextFn);
                //var gg ; \
                msg  = {
                    sender : 'mocks.js' , 
                    content : contextFn
                }
                end = contextFn.indexOf(')(') ; 
                if(end!== -1){
                    cd =  contextFn.substring(1,end)  ; 
                    params  = contextFn.substring(end+ 2 ,contextFn.length-1 ) ; 
                    param = params.split(',') ; 
                    para = [] ; 
                    var k =0 ; 
                    for( var i in param ){
                        if(param[i] === ''){
                            param[i] = '' ;
                            continue ; 
                        }
                        
                        if( !isNaN(param[i])   ){
                            para[k] = parseInt(param[i]) ; 
                            k++ ; 
                            continue; 
                        }
                         
                        para[k] = validate(param[i]) ;
                        k++ ;         
                         
                    }
                    
                    
                }
                
                //cd = contextFn ; 
                msg.content = cd ; 
                /*if(listen){
                    chrome.runtime.onMessage.removeListener(listen) ; 
                }*/

                var listen = function(message , sender , response){
                    console.log('message received') ; 
                    if(message.sender==='inject.js'){
                        if(message.content==='request'){
                            console.log(message.content + '  gg') ; 
                            msg.content = cd ; 
                            msg.param =para ; 
                            response(msg) ; 
                        }
                        if(message.type==='ret'){
                            chrome.runtime.onMessage.removeListener(listen) ; 
                            //allow = 1 ; 
                            callback( message.content , false ) ;   
                        }
                    }                     
                } 
                chrome.runtime.onMessage.addListener(listen) ; 
                
                
                //var cd = 'ret ='  + contextFn + '  ; send_message  =  chrome.runtime.sendMessage({  sender : \'script\' , content : ret }} , function(reponse){console.log( ) ; }) ;test = test + send_message ; sc.type = \'text/javascript\' ; sc.innerHTML = test ; document.head.appendchild(sc) ; console.log(\'addes\') ; ' ; 
                
                //chrome.runtime.
                console.log(window.location.href) ; 
                id = getid(window.location.href) ; 
                //chrome.tabs.executeScript(581, {code : 'sc = document.createElement(\'script\') ; test =   ' + cd +    '  ;  sc.type = \'text/javascript\' ; sc.innerHTML =  \'ret = \' +  test + \'  ; console.log(ret) \' ; document.head.appendChild(sc) ; console.log('+contextFn+') ; ' } ) ; 
                //while(!allow) {} ; 
                chrome.tabs.executeScript(29 , { file : 'custom/inject.js' }) ; 

                //allow =  0 ; 
                //chrome.runtime.sendMessage(msg , function(response){console.log(response) ; }) ; 
                //str =  contextFn ;  
                chrome.runtime.sendMessage(msg , function(response){ console.log(response) ; }) ; 
                //callback(result, false);
            }
        }
    };
}

// </debug>