
var send_msg ; 
var loaded = {}  ; 
var connections  = {} ; 

// function to get tab id from the url 

getid = function(url){
    len = url.length ; 
    start = url.indexOf('tab=') + 4 ; 
    var str =  url.substr(start, len-1) ; 

    x = Math.round(str) ; 
    return x ;
};


chrome.runtime.onMessage.addListener(function(  message, sender , response  ){
    if(message.sender=== 'content-script.js'){
        id = sender.tab.id ; 
        console.log(message + ' ' + sender.tab.id ) ; 
        tabId = sender.tab.id ; 
        if(!connections[tabId]){
            connections[tabId] = [] ; 

        }
        if(loaded[id] ===1 )
        connections[tabId].push(message) ; 
        else{
        chrome.runtime.sendMessage( {  content : message , sender : 'background.js' , id :  id }) ;     
        }
        
    }
    if(message.sender=== 'panel.js'){
        id = getid(sender.tab.url) ; 
        if(message.content === 'loaded'){
            loaded[id] = 2  ; 
            //id = getid(sender.tab.url) ; 
            arr = connections[id] ; 
            for( var i in arr ){
                chrome.runtime.sendMessage( {  content : arr[i] , sender : 'background.js' , id : id }) ; 
            }
            connections[id]=  [] ; 
        }
            
        
    }
    if (message.sender === 'addSencha.js' ){
        id = getid(sender.tab.url) ; 
        if(message.content === 'loaded'){
            loaded[id] = 1 ; 
        }
        if(message.content === 'closed' ){
            id = getid(sender.tab.url) ; 
            chrome.debugger.detach( { tabId : id })
            connections[id] = [] ; 
            loaded[id] = 0 ; 
        }
    }
}) ; 






chrome.browserAction.onClicked.addListener(function() {
    chrome.windows.getCurrent(function(win) {
        chrome.tabs.getSelected(win.id, actionClicked);
    });
});
var id  ;
var ta;  
function actionClicked(tab) {
    id = tab.id;
    ta = tab ; 
    // Create new window with tab
    
    //chrome.tabs.executeScript(tab.id , {file : 'custom/resources/hub/content-script.js'})

    chrome.windows.create({
    	'url' : 'inspector.html?experiments=true&tab=' + id ,
    	'type'  : 'popup'  , 
    	'focused': true , 
    	'width' : tab.width , 
    	'top' : Math.round(tab.height/2)  
    }) ; 
}

var TABS = {};

// monitor page refresh
chrome.extension.onConnect.addListener(function(port) {

    //when devtools-page connects (when App Inspector is actually opened)
    if (port.name === 'AppInspector') {

        //enable the right-click menu
        //        chrome.contextMenus.update(CONTEXT_MENU, {
        //            enabled : true
        //        });

        /**
         * add event listener for tab refresh
         * NOTE: this fires across ALL tabs!
         */
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

            //changeInfo has multiple statuses... only fire on complete
            if (changeInfo.status === 'complete') {
                var oldUrl = TABS[tabId],
                    hashLocation;

                //cache the URL so we can compare it later
                if (!oldUrl || tab.url !== oldUrl.url) {
                    var newTab = {
                        url: tab.url,
                        hash: ''
                    };

                    hashLocation = tab.url.indexOf('#');

                    if (hashLocation) {
                        newTab.hash = tab.url.substr(hashLocation + 1);
                    }

                    TABS[tabId] = newTab;
                }

                if (oldUrl) {
                    hashLocation = tab.url.indexOf('#');

                    var hash = (hashLocation) ? tab.url.substr(hashLocation + 1) : '';

                    //don't refresh the page if only the hash changes
                    if (hash && oldUrl.hash !== hash) {
                        TABS[tabId].hash = hash;
                    }
                    //if the hash has not changed, assume the user has manually refreshed the browser
                    else {
                        port.postMessage({
                            tabId: tabId,
                            message: 'refreshed!'
                        });
                    }
                }

            }
        });

    }
});


var CONTEXT_MENU = chrome.contextMenus.create({
    'title'    : 'App Inspector for Sencha',
    'contexts' : ['all'],
    'enabled'  : true,

    'onclick' : function (info, tab) {
        //TODO: get access to inspectedWindow
    }
});
