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

moveScrollContent = (destination, duration)=>{
    const height = window.scrollY,
          step = Math.PI / (duration / 15),
          cosParam = height / 2

    var count = 1,
        margin,
        interval = setInterval(function(){
            // console.log(`diff: ${Math.abs(window.scrollY - destination)}`)
            if(Math.abs(window.scrollY - destination) > count * step) {
                count+=1
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
                    tocHTML+=`<li class="toc-item toc-${element.tagName.toLowerCase()} toc-title" id="toc-${count++}" onclick="moveScrollContent(${element.offsetTop-90}, 500)">${element.innerText}</li>`
                } else {
                    tocHTML+=`<li class="toc-item toc-${element.tagName.toLowerCase()}" id="toc-${count++}" onclick="moveScrollContent(${element.offsetTop-90}, 500)">${element.innerText}</li>`
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
    // console.log(`height: ${height}`)

    var idx = 1;
    for(; idx <= contents.length; idx++) {
        if(contentsOffset[idx-1] <= height && height < contentsOffset[idx]) {
            addClass(contents[idx-1], 'highlight')
            // console.log(`content: ${contents[idx-1].innerText}`)
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