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

moveScroll = (destination, duration)=>{
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

document.getElementById('fabTop').addEventListener('click', moveScroll.bind(null, 0, 500))