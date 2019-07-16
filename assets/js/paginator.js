addClass = (element, name)=>{
    if (element.className.indexOf(name) == -1) {
        element.className += " " + name;
    }
}

removeClass = (element, name)=>{
    var arr;
    arr = element.className.split(" ");

    while (arr.indexOf(name) > -1) {
        arr.splice(arr.indexOf(name), 1);
    }
    /* 배열의 원소들을 연결하여 하나의 값으로 만듭니다. */
    element.className = arr.join(" ");
}

paginator = (page_idx)=>{
    var id = 'paginator'+page_idx;
    // console.log(id);
    
    var cur_paginator = document.getElementById(id);
    if(!cur_paginator) return;

    var paginators = document.getElementsByClassName('paginator-item');
    for(let i=0; i < paginators.length; i++) {
        removeClass(paginators[i], 'active');
    }
    addClass(cur_paginator, 'active');
    
    var collections = document.getElementsByClassName('collection-list');
    for(let i=0; i< collections.length; i++) {
        removeClass(collections[i], 'show');
        if(collections[i].id.indexOf('page'+page_idx) > -1)
            addClass(collections[i], 'show');
    }
}

paginator(1);
(()=>{
    var paginators = document.getElementsByClassName('paginator-item');
    for(var i=0; i < paginators.length; i++) {
        let id = 'paginator'+(i+1);
        // console.log(i, id);
        let page = document.getElementById(id);
        page.addEventListener('click', paginator.bind(null, i+1));
    }
})();