// addClass = (element, className)=>{
//     if(element.className.indexOf(className) == -1) {
//         element.className += " " + className
//     }
// }

// delClass = (element, className)=>{
//     let arr = element.className.split(" ")

//     while(arr.indexOf(className) > -1) {
//         arr.splice(arr.indexOf(className), 1)
//     }

//     element.className = arr.join(" ")
// }

getSearchLibrary = (filePath, callback)=>{
    var fileReader = new XMLHttpRequest()
	fileReader.open('GET', filePath, true)
    fileReader.onreadystatechange = ()=>{
        if (fileReader.readyState == 4 && fileReader.status == 200) {
            callback(JSON.parse(fileReader.responseText))
        }
    }
    fileReader.send(null)
}

searchingLibrary = ()=>{
    var searchBar = document.getElementById('searchBar')
    var query = searchBar.value.trim()

    if(query.length < 1) {
        searchBar.blur()
        return
    }

    //- searching area
    var searchArea = document.getElementById('searchedItems')
    while(searchArea.hasChildNodes()) {
        searchArea.removeChild(searchArea.firstChild)
    }

    //- match data from search.json
    getSearchLibrary('/assets/json/search.json', (items)=>{
        var searchHTML = ''

        searchedItems = []
        collections = []
        for(var item of items) {
            let isFind = false
            // console.log(datum);
            let item_keys = Object.getOwnPropertyNames(item)
            // console.log(datum_keys);
            for(var key of item_keys) {
                // console.log(key);
                if(key == 'collection') {
                    // console.log(datum[key]);
                    if(collections.indexOf(item[key]) == -1) {
                        collections.push(item[key])
                    }
                }

                if(key == 'collection' || key == 'url') continue
                if(item[key].indexOf(query) != -1) {
                    isFind = true
                    break
                }
            }
            if(!isFind) continue
            searchedItems.push(item)
        }

        // console.log(collections);
        for(var collection of collections) {
            searchHTML +=
            `
            <h3 class="search-collection">${collection}</h3>
            <ul class="search-list">`

            var isResult = false

            for(var searchedItem of searchedItems) {
                // console.log(result_datum);
                if(searchedItem["collection"] != collection) continue

                if(!isResult) isResult = true

                searchHTML += 
                `
                <li class="search-item">
                    <a href="${searchedItem["url"]}">
                        <p class="item-categories">`
                        if(searchedItem["categories"].trim().length > 0) {
                            for(var category of searchedItem["categories"].split(',')) {
                                searchHTML+=`<span class="item-category">${category}</span>`
                            }
                        }
                        searchHTML+=`
                        </p>
                        <p class="item-title">${searchedItem["title"]}</p>
                        <p class="item-excerpt">${searchedItem["excerpt"]}</p>`+
                        // <p class="item-content">${result_datum["contents"].substring(0, 25)+"..."}</p>
                    `</a>
                </li>
                `
            }

            if(!isResult) {
                searchHTML+='<li class="search-item search-empty">Not Found Data</li>'
            }

            searchHTML+='</ul>'
        }

        searchArea.innerHTML = searchHTML
    })

    var searchResult = document.getElementById('searchResult')
    delClass(searchResult, 'hide')
    addClass(searchResult, 'show')

    // 아래 함수는 IE가 지원하지 않아 다시 되돌림
    // document.getElementById('searchResult').classList.toggle('show', true);
}

fixIcon = (element)=>{
    element.style;
}

window.onkeyup = (e)=>{
    if(e.keyCode == 27) {
        let searchResult = document.getElementById('searchResult')
        let searchBar = document.getElementById('searchBar')

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
        else searchingLibrary()
    }
})

document.getElementById('searchBar').addEventListener('keyup', e=>{
    if( e.keyCode === 13 ) searchingLibrary()
    
})

document.getElementById('searchExtend').addEventListener('click', ()=>{
    let searchResult = document.getElementById('searchResult')
    let searchExtend = document.getElementById('searchExtend')
    let extendIcon = document.getElementById('extendIcon')
    if(searchResult.classList.contains('extend')){
        delClass(searchResult, 'extend')
        delClass(searchExtend, 'extended')
        delClass(extendIcon, 'fa-angle-double-left')
        addClass(extendIcon, 'fa-angle-double-right')
    } else {
        addClass(searchResult, 'extend')
        addClass(searchExtend, 'extended')
        addClass(extendIcon, 'fa-angle-double-left')
        delClass(extendIcon, 'fa-angle-double-right')
    }
})

document.getElementById('searchClose').addEventListener('click', ()=>{
    let searchResult = document.getElementById('searchResult')
    if(searchResult.classList.contains('show')) {
        delClass(searchResult, 'show')
        addClass(searchResult, 'hide')
    }
})

document.getElementById('searchEmpty').addEventListener('click', ()=>{
    let searchResult = document.getElementById('searchResult')
    if(searchResult.classList.contains('show')) {
        delClass(searchResult, 'show')
        addClass(searchResult, 'hide')
    }
})