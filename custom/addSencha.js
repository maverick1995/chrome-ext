
getid = function(url){
    len = url.length ; 
    start = url.indexOf('tab=') + 4 ; 
    var str =  url.substr(start, len-1) ; 

    x = Math.round(str) ; 
    return x ;
};


// click ahndler for senchas panel 
click = function(){
    if (WebInspector.inspectorView._currentPanel === 'Sencha')
    return ; 

    console.log('Hello World') ; 
    if(WebInspector.inspectorView._currentPanel!=='OpenAjax') {
        WebInspector.inspectorView._currentPanel.detach();
    }
    else{
        document.getElementById('pre').style.visibility = 'hidden' ; 
        but  = document.getElementById('OpenAjax')  ; 
        but.className = 'toolbar-item toggleable elements' ; 
    }
    
    WebInspector.inspectorView._currentPanel = 'Sencha' ; 
    /*view = document.getElementById('main-panels') ; 
    len= view.children.length ; 
    var num ; 
    for(i=0;  i < len ; i++){
        tag = view.children[i].tagName ; 
       if(tag==='IFRAME'  &&  view.children[i].src.indexOf('index.html')!=-1 ){
           num = i ; 
           break ; 
       }
    }

    if(!(num>=0) ){
        main = document.getElementById('main-panels') ; 
        //main.children[0].children[1].innerHTML = '' ;
        frame = document.createElement('iframe') ; 
        frame.src = 'AppInspector/AppInspector/index.html' ; 
        frame.id= 'index' ; 
        frame.scrolling= 'yes' ; 
        frame.style.height  = '100%'  ; 
        frame.style.width= '100%' ; 
        frame.style.visibility = 'visible' ; 
        main.appendChild(frame) ;  ; 
    }
    else {
        view.children[num].src = 'AppInspector/AppInspector/index.html' ; 
            
    }*/

    pan=  document.getElementById('index') ; 
    if(!pan){
        main = document.getElementById('main-panels') ; 
        //main.children[0].children[1].innerHTML = '' ;
        frame = document.createElement('iframe') ; 
        id = getid(window.location.href) ; 
        frame.src = 'AppInspector/AppInspector/index.html' + '?tab=' + id ; 
        frame.id= 'index' ; 
        frame.scrolling= 'yes' ; 
        frame.style.height  = '100%'  ; 
        frame.style.width= '100%' ; 
        frame.style.visibility = 'visible' ; 
        main.appendChild(frame) ;  ;
    }
    else{
        pan.style.visibility = 'visible' ; 
    }
    pan = document.getElementById('index') ; 
    ajax= document.getElementById('pre') ; 
    if(ajax){
        pan.parentNode.insertBefore(pan,ajax) ; 
    }
    but  = document.getElementById('Sencha')  ; 
    but.className = 'toolbar-item toggleable elements toggled-on' ; 
}

// click handler for OpenAjaxs Panel

click1 = function(){
    if (WebInspector.inspectorView._currentPanel === 'OpenAjax')
    return ; 

    console.log('Hello World') ; 
    if(WebInspector.inspectorView._currentPanel!=='Sencha') {
        WebInspector.inspectorView._currentPanel.detach();
    }
    else{
        document.getElementById('index').style.visibility = 'hidden' ; 
        but  = document.getElementById('Sencha')  ; 
        but.className = 'toolbar-item toggleable elements' ; 
    }
    
    WebInspector.inspectorView._currentPanel = 'OpenAjax' ; 
    /*view = document.getElementById('main-panels') ; 
    len= view.children.length ; */
    /*var num ; 
    for(i=0;  i < len ; i++){
        tag = view.children[i].tagName ; 
       if(tag==='IFRAME' && view.children[i].src.indexOf('pre.html') ){
           num = i ; 
           break ; 
       }
    }

    if(!(num>=0) ){
        main = document.getElementById('main-panels') ; 
        //main.children[0].children[1].innerHTML = '' ;
        frame = document.createElement('iframe') ; 
        frame.src = 'custom/hub/pre.html' ; 
        frame.id= 'pre' ; 
        frame.scrolling= 'yes' ; 
        frame.style.height  = '100%'  ; 
        frame.style.width= '100%' ; 
        frame.style.visibility = 'visible' ; 
        main.appendChild(frame) ;  ; 
    }
    else {
        //view.children[num].src = 'custom/hub/pre.html' ; 
        frame = document.getElementById('fra') ; 
        frame.style.visibility = 'visible' ;      
    }*/

    pan = document.getElementById('pre') ; 
    if(!pan){
        main = document.getElementById('main-panels') ; 
        //main.children[0].children[1].innerHTML = '' ;
        frame = document.createElement('iframe') ; 
        id = getid(window.location.href) ; 
        frame.src = 'custom/hub/pre.html' + '?tab=' + id ; 
        frame.id= 'pre' ; 
        frame.scrolling= 'yes' ; 
        frame.style.height  = '100%'  ; 
        frame.style.width= '100%' ; 
        frame.style.visibility = 'visible' ; 
        main.appendChild(frame) ;  ; 
    }
    else{
        pan.style.visibility = 'visible' ; 
    }
    pan = document.getElementById('pre') ; 
    sencha= document.getElementById('index') ; 
    doc = pan.contentDocument ; 
    table = doc.getElementById('table') ; 
    if(sencha){
        pan.parentNode.insertBefore(sencha) ; 
        table1 = pan.contentDocument.getElementById('table') ;  
        pan.contentDocument = doc ; 

    }
    
    but  = document.getElementById('OpenAjax')  ; 
    but.className = 'toolbar-item toggleable elements toggled-on' ; 
} ; 

window.onload =   function(){

    chrome.runtime.sendMessage({content : 'loaded'  , sender :  'addSencha.js'}  , function(response){
    
    } ) ; 

    // adding  Senchas Panel 
    var but = document.createElement('button') ;
    but.onclick = 'click()' ; 
    but.id =  'Sencha' ; 
    var div = document.createElement('div') ; 
    div.className = 'toolbar-icon' ; 
    but.className=   'toolbar-item toggleable elements' ; 
    but.appendChild(div) ; 
    but.onclick = click ; 
    var div1 = document.createElement('div') ; 
    div1.className = 'toolbar-label' ; 
    div1.innerHTML = 'Sencha' ; 
    but.appendChild(div1) ; 
    document.getElementById('toolbar').appendChild(but) ; 
    /*main = document.getElementById('main-panels') ; 
    //main.children[0].children[1].innerHTML = '' ;
    frame = document.createElement('iframe') ; 
    frame.src = 'AppInspector/AppInspector/index.html' ; 
    frame.scrolling= 'yes' ; 
    frame.style.height  = '100%'  ; 
    frame.style.width= '100%' ; 
    frame.style.visibility = 'hidden' ; 
    main.appendChild(frame) ;  ; */



    //adding the openAjax panel  . 

    but = document.createElement('button') ;
    //but.onclick = 'click1()'
    but.id = 'OpenAjax' ; 
    div = document.createElement('div') ; 
    div.className = 'toolbar-icon' ; 
    but.className=   'toolbar-item toggleable elements' ; 
    but.appendChild(div) ; 
    but.onclick = click1 ; 
    div1 = document.createElement('div') ; 
    div1.className = 'toolbar-label' ; 
    div1.innerHTML = 'openAjax' ; 
    but.appendChild(div1) ; 
    document.getElementById('toolbar').appendChild(but) ;



}


window.onbeforeunload = function () {
    chrome.runtime.sendMessage( {content : 'closed' , sender : 'addSencha.js'} , function(response){}) ; 
    //return "Do you really want to close?";
}; 