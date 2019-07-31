addClass = (element, className)=>{
    if(element.className.indexOf(className) == -1) {
        element.className += " " + className
    }
}

delClass = (element, className)=>{
    let arr = element.className.split(" ")

    while(arr.indexOf(className) > -1) {
        arr.splice(arr.indexOf(className), 1)
    }

    element.className = arr.join(" ")
}

getJSON = (filePath, callback)=>{
    var fileReader = new XMLHttpRequest();
	fileReader.open('GET', filePath, true);
    fileReader.onreadystatechange = ()=>{
        if (fileReader.readyState == 4 && fileReader.status == 200) {
            callback(JSON.parse(fileReader.responseText));
        }
    }
    fileReader.send(null);
}

searchSite = ()=>{
    var searchBar = document.getElementById('searchBar');
    var query = searchBar.value.trim();
    // console.log(query);

    if(query.length < 1) {
        searchBar.blur();
        return;
    }

    //- searching area

    var searchedItems = document.getElementById('searchedItems');
    while(searchedItems.hasChildNodes()) {
        searchedItems.removeChild(searchedItems.firstChild);
    }

    //- match data from search.json

    getJSON('/assets/json/search.json', (data)=>{
        // console.log(data);
        var result_html = '';

        result_data = [];
        collections = [];
        for(var datum of data) {
            let isFind = false;
            // console.log(datum);
            let datum_keys = Object.getOwnPropertyNames(datum);
            // console.log(datum_keys);
            for(var key of datum_keys) {
                // console.log(key);
                if(key == 'collection') {
                    // console.log(datum[key]);
                    if(collections.indexOf(datum[key]) == -1) {
                        collections.push(datum[key]);
                    }
                }

                if(key == 'collection' || key == 'url') continue;
                if(datum[key].indexOf(query) != -1) {
                    isFind = true;
                    break;
                }
            }
            if(!isFind) continue;
            result_data.push(datum);
        }

        // console.log(collections);

        for(var collection of collections) {
            result_html +=
            `
            <h3 class="search-collection">${collection}</h3>
            <ul class="search-list">`;

            var isResult = false;

            for(var result_datum of result_data) {
                // console.log(result_datum);
                if(result_datum["collection"] != collection) {
                    continue;
                }

                if(!isResult) {
                    isResult = true;
                }

                result_html += 
                `
                <li class="search-item">
                    <a href="${result_datum["url"]}">
                        <p class="item-categories">`;
                        if(result_datum["categories"].trim().length > 0) {
                            for(var category of result_datum["categories"].split(',')) {
                                result_html+=`<span class="item-category">${category}</span>`
                            }
                        }
                        result_html+=`
                        </p>
                        <p class="item-title">${result_datum["title"]}</p>
                        <p class="item-excerpt">${result_datum["excerpt"]}</p>`+
                        // <p class="item-content">${result_datum["contents"].substring(0, 25)+"..."}</p>
                    `</a>
                </li>
                `;
            }

            if(!isResult) {
                result_html+='<li class="search-item search-empty">Not Found Data</li>';
            }

            result_html+='</ul>';
        }

        searchedItems.innerHTML = result_html;
    });

    var searchResult = document.getElementById('searchResult')
    delClass(searchResult, 'hide')
    addClass(searchResult, 'show')

    // 아래 함수는 IE가 지원하지 않아 다시 되돌림
    // document.getElementById('searchResult').classList.toggle('show', true);
}

window.onkeyup = (e)=>{
    if(e.keyCode == 27) {
        let searchResult = document.getElementById('searchResult');
        let searchBar = document.getElementById('searchBar');

        if(searchBar.classList.contains('show')) {
            delClass(searchBar, 'show')
            addClass(searchBar, 'hide')
            searchBar.classList.remove('show')
        } else {

        }
    }
}

document.getElementById('fabSearch').addEventListener('click', ()=>{
    let searchBar = document.getElementById('searchBar')
    let query = searchBar.value.trim()

    if(query.length < 1) {
        if(!searchBar.classList.contains('show')) {
            delClass(searchBar, 'hide')
            addClass(searchBar, 'show')
        }else {
            delClass(searchBar, 'show')
            addClass(searchBar, 'hide')
        }
    } else {
        if(!searchBar.classList.contains('show')) {
            delClass(searchBar, 'hide')
            addClass(searchBar, 'show')
            
            searchBar.autofocus = true
        }
        else searchSite()
    }
})

document.getElementById('searchBar').addEventListener('keyup', e=>{
    if( e.keyCode === 13 ) searchSite()
    
})

document.getElementById('searchExtend').addEventListener('click', ()=>{
    let searchResult = document.getElementById('searchResult');
    let searchExtend = document.getElementById('searchExtend');
    let extendIcon = document.getElementById('extendIcon');
    if(searchResult.classList.contains('extend')){
        delClass(searchResult, 'extend');
        delClass(searchExtend, 'extended');
        delClass(extendIcon, 'fa-angle-double-left');
        addClass(extendIcon, 'fa-angle-double-right');
    } else {
        addClass(searchResult, 'extend');
        addClass(searchExtend, 'extended');
        delClass(extendIcon, 'fa-angle-double-right');
        addClass(extendIcon, 'fa-angle-double-left');
    }
});

document.getElementById('searchClose').addEventListener('click', ()=>{
    let searchResult = document.getElementById('searchResult')
    if(searchResult.classList.contains('show')) {
        delClass(searchResult, 'show')
        addClass(searchResult, 'hide')
    }
});

document.getElementById('searchEmpty').addEventListener('click', ()=>{
    let searchResult = document.getElementById('searchResult')
    if(searchResult.classList.contains('show')) {
        delClass(searchResult, 'show')
        addClass(searchResult, 'hide')
    }
})