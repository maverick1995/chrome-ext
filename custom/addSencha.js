click = function(){
    console.log('Hello World') ; 
    main = document.getElementById('main') ; 
    main.children[0].children[1].innerHTML = '' ;
    main.children[1].innerHTML = 'HEllo Wolrd' ;  
}

window.onload =   function(){
    var but = document.createElement('button') ;
    

    but.onclick = 'click()'
    var div = document.createElement('div') ; 
    div.className = 'toolbar-icon' ; 
    but.className=   'toolbar-item toggleable sencha' ; 
    but.appendChild(div) ; 
    but.onclick = click ; 
    var div1 = document.createElement('div') ; 
    div1.className = 'toolbar-label' ; 
    div1.innerHTML = 'Sencha' ; 
    but.appendChild(div1) ; 
    document.getElementById('toolbar').appendChild(but) ; 
}