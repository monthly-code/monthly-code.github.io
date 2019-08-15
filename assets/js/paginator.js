movePaginator = (pageIdx)=>{
    let pageId = 0;
}

paginator = (page_idx)=>{
    var id = 'paginator'+page_idx;
    
    var cur_paginator = document.getElementById(id);
    if(!cur_paginator) return;

    var paginators = document.getElementsByClassName('paginator-item');
    for(let i=0; i < paginators.length; i++) {
        delClass(paginators[i], 'active');
    }
    addClass(cur_paginator, 'active');
    
    var collections = document.getElementsByClassName('collection-items');
    console.log(`collection size : ${collections.length}`)
    for(let i=0; i< collections.length; i++) {
        delClass(collections[i], 'show');
        if(collections[i].id.indexOf('collection'+page_idx) > -1)
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