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

window.addEventListener('scroll', ()=>{
    let visiblePoint = 70
    let isVisible = false
    let scrollTop = window.scrollY || document.documentElement.scrollTop

    let fabTop = document.getElementById('fabTop')
    if(scrollTop > visiblePoint) {
        if(!isVisible) {
            delClass(fabTop, "hide")
            addClass(fabTop, "show")
            isVisible = true
        }
    } else {
        delClass(fabTop, "show")
        addClass(fabTop, "hide")
        isVisible = false
    }
})