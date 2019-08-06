addClass = (element, className)=>{
    if(element.className.indexOf(className) == -1) {
        element.className += ((element.className.length > 0 ? " " : "") + className)
    }
}

delClass = (element, className)=>{
    let arr = element.className.split(" ")

    while(arr.indexOf(className) > -1) {
        arr.splice(arr.indexOf(className), 1)
    }

    element.className = arr.join(" ")
}