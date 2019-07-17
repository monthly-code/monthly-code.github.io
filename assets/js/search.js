/// search script
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
    var searcher = document.getElementById('searcher');
    var query = searcher.value.trim();
    // console.log(query);

    if(query.length < 1) {
        searcher.blur();
        return;
    }

    //- searching area

    var searchResult = document.getElementById('searchResult');
    while(searchResult.hasChildNodes()) {
        searchResult.removeChild(searchResult.firstChild);
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
                        <p class="item-subtitle">${result_datum["subtitle"]}</p>
                        <p class="item-content">${result_datum["contents"].substring(0, 25)+"..."}</p>
                    </a>
                </li>
                `;
            }

            if(!isResult) {
                result_html+='<li class="search-item search-empty">Not Found Data</li>';
            }

            result_html+='</ul>';
        }

        searchResult.innerHTML = result_html;
    });

    var searchNav = document.getElementById('searchNav');
    addClass(searchNav, 'show');

    // 아래 함수는 IE가 지원하지 않아 다시 되돌림
    // document.getElementById('searchNav').classList.toggle('show', true);
}

document.getElementById('searcher').addEventListener('keyup', e=>{
    if( e.keyCode !== 13 ) return;
    searchSite();
});

document.getElementById('goToSearchBtn').addEventListener('click', ()=>{

    var search = document.getElementById('searcher');

    if(search.value.trim().length < 1) {
        showToggleClass(search);
        if(search.classList.contains('show')) {
            search.autofocus = true;
        }
    } else {
        if(!search.classList.contains('show')) {
            showToggleClass(search);
            search.autofocus = true;
        } else {
            searchSite();
        }
    }
});

window.onkeyup = (e)=>{
    // console.log(e.keyCode);

    if(e.keyCode == 27) {
        var searchNav = document.getElementById('searchNav');
        var search = document.getElementById('searcher');

        if(search.classList.contains('show')) {
            search.classList.remove('show');
        } else if(searchNav.classList.contains('show')) {
            searchNav.classList.remove('show');
        } else {

        }
    }
}

document.getElementById('searchExtend').addEventListener('click', ()=>{
    var searchNav = document.getElementById('searchNav');
    var searchExtend = document.getElementById('searchExtend');
    var extendIcon = document.getElementById('extendIcon');
    if(searchNav.classList.contains('extend')){
        removeClass(searchNav, 'extend');
        removeClass(searchExtend, 'extended');
        removeClass(extendIcon, 'fa-angle-double-left');
        addClass(extendIcon, 'fa-angle-double-right');
    } else {
        addClass(searchNav, 'extend');
        addClass(searchExtend, 'extended');
        removeClass(extendIcon, 'fa-angle-double-right');
        addClass(extendIcon, 'fa-angle-double-left');
    }
});