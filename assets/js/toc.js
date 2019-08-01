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

moveScroll = (destination, duration=1)=>{
    const height = window.scrollY,
          step = Math.PI / (duration / 15),
          cosParam = height / 2

    var count = 0,
        margin,
        interval = setInterval(function(){
            if(window.scrollY != destination) {
                count += 1
                margin = cosParam - cosParam * Math.cos(count * step)
                window.scrollTo(0 ,(height - margin))
            }
            else clearInterval(interval)
        }, 15)
}

setContents = ()=>{
    let tocArea = document.getElementById('tocItems')
    let tocHTML = ''

    var count = 1
    for(element of document.all) {
        let re = /h[1-3]/i
        if(re.test(element.tagName)) {
            if(element.className == 'page-date') {
                continue;
            } else {
                if(element.className == 'page-title') {
                    tocHTML+=`<li class="toc-item toc-${element.tagName.toLowerCase()} toc-title" id="toc-${count++}" onclick="moveScroll(${element.offsetTop})">${element.innerText}</li>`
                } else {
                    tocHTML+=`<li class="toc-item toc-${element.tagName.toLowerCase()}" id="toc-${count++}" onclick="moveScroll(${element.offsetTop})">${element.innerText}</li>`
                }
            }
        }
    }

    tocArea.innerHTML = tocHTML
}

getContents = ()=>{
    let contents = []
    let contentsOffset = [0]
    let contentsSize = document.getElementsByClassName('toc-item').length

    // toc가 될만한 요소 수집, h1, h2, h3
    for(element of document.all) {
        let re = /h[1-3]/i
        if(re.test(element.tagName)) {
            if(element.className == 'page-date') {
                continue;
            }
            contents.push(element)
            contentsOffset.push(element.offsetTop)
        }
    }
    contentsOffset.push(document.body.scrollHeight)

    return {contents, contentsOffset}
}

highlightContent = ()=>{
    const { contents, contentsOffset } = getContents()
    for(content of contents) {
        delClass(content, 'highlight')
    }

    const height = window.scrollY

    var idx = 1;
    for(; idx <= tocSize; idx++) {
        if(contentsOffset[idx-1] <= height && height < contentsOffset[idx]) {
            addClass(ontents[idx-1], 'highlight')
            return
        }
    }    
}

window.onload = ()=>{
    setContents()
}

window.onscroll = ()=>{
    highlightContent()
}