
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
    
    chrome.windows.create({
    	'url' : 'inspector.html?experiments=true&tab=' + id ,
    	'type'  : 'popup'  , 
    	'focused': true , 
    	'width' : tab.width , 
    	'top' : Math.round(tab.height/2)  
    }) ; 
}

