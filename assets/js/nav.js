navToggle = ()=>{
    let navArea = document.getElementById('fullNav')

    if(navArea.className.indexOf('hide') != -1) {
        /// hide 일 때
        delClass(navArea, 'hide')
        addClass(navArea, 'show')
    } else if(navArea.className.indexOf('show') != -1) {
        /// show 일 때
        delClass(navArea, 'show')
        addClass(navArea, 'hide')
    }
}

document.getElementById('headerNav').addEventListener('click', navToggle.bind(null))
document.getElementById('navClose').addEventListener('click', navToggle.bind(null))