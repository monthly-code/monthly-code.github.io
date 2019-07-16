document.onscroll=(e)=>{
    highlightToc(window.scrollY)
}

moveScroll=(offset)=>{
    window.scrollTo(0, offset - 50)
}

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

makeToc=()=>{
    var tocArea = document.getElementById('toc')
    var tocHTML = ''

    var tocIdx = 0
    for(element of document.all) {
        let re = /h[1-3]/i
        if(re.test(element.tagName)) {
            if(element.className == 'page-date') {
                continue;
            } else {
                // console.log(element.offsetTop)
                if(element.className == 'page-title') {
                    tocHTML+=`<li class="toc-item toc-${element.tagName.toLowerCase()} toc-title" id="toc-${tocIdx++}" onclick="moveScroll(${element.offsetTop})">${element.innerText}</li>`
                } else {
                    tocHTML+=`<li class="toc-item toc-${element.tagName.toLowerCase()}" id="toc-${tocIdx++}" onclick="moveScroll(${element.offsetTop})">${element.innerText}</li>`
                }
                
            }
        }
    }
    tocArea.innerHTML = tocHTML
}

makeToc()

highlightToc=(offset)=>{
    tocSize = document.getElementsByClassName('toc-item').length

    var offsetList = [0]
    for(element of document.all) {
        let re = /h[1-3]/i
        if(re.test(element.tagName)) {
            if(element.className == 'page-date') {
                continue;
            }
            offsetList.push(element.offsetTop)
        }
    }
    offsetList.push(document.body.scrollHeight)

    for(var i=0; i<tocSize; i++) {
        removeClass(document.getElementById(`toc-${i}`), 'toc-highlight')
    }

    var idx = 1;
    for(; idx <= tocSize; idx++) {
        if(offsetList[idx-1] <= offset && offset < offsetList[idx]) {
            addClass(document.getElementById(`toc-${idx-1}`), 'toc-highlight')    
            break;
        }
    }
}
highlightToc(window.scrollY)