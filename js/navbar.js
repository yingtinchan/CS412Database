let data = [
    {
        "title": "Introduction",
        "img": "./img/index/thumb-schoolguide.jpeg",
        "contect": [
            ["HKIT Message", "hkitmegpage.html"],
            ["Institute History", "history.html"],
            ["Vision & Mission", "vision.html"],
            ["Administrative Unit", "administrative.html"],
            ["Faculty Unit", "faculty.html"],
            ["Campus", "map.html"],
            ["Contact Us", "contact.html"]
        ]
    },
    {
        "title": "Admission",
        "img": "./img/index/thumb-educationtrait.jpeg",
        "contect": [
            ["Prospective Student", "prospective.html"],
            ["Financial Assistance", "financial.html"],
            ["Online Application", "onapp.html"]
        ]
    },
    {
        "title": "Programms",
        "img": "./img/index/thumb-schoollife.jpeg",
        "contect": [
            ["Bachelor  Degree", "degree.html"],
            ["Top-Up Degree", "degree.html"],
            ["Higher Diploma", "highdip.html"],
            ["Diploma in College Foundation Studies (DCFS)", "#"],
            ["Diploma of Applied Education (DAE)", "#"],
            ["Diploma Yi Jin (DYJ)", "#"],
            ["Applied Learning (ApL)", "#"],
            ["Continuing Education Fund (CEF)", "#"],
            ["Short Course", "#"]
        ]
    },
    {
        "title": "News & Events",
        "img": "./img/index/thumb-entranceguide.jpeg",
        "contect": [
            ["News", "news.html"],
            ["Events", "events.html"]
        ]
    },
    {
        "title": "About",
        "img": "./img/index/thumb-guidance.jpeg",
        "contect": [
            ["Contact Us", "contact.html"],
            ["Map", "map.html"]
        ]
    }
]

$("#nav-bar").html(function () {
    let nav = '<ul id="js-index-nav">'
    for (let i = 0; i < data.length; i++) {
        nav += `<li><span class="toggle-btn">${data[i].title}</span>
        <div class="toggle-cont">
          <div class="wrap">
            <div class="index-nav-img">
            <img src="${data[i].img}">
            </div>
            <div class="index-nav-txt">
              <div class="index-nav-title">${data[i].title}</div>
              <div class="index-nav-body">
            `
        for (let k = 0; k < data[i].contect.length; k++) {
            if (k % 4 == 0) {
                nav += `<ul><li><a href="${data[i].contect[k][1]}">${data[i].contect[k][0]}</a></li>`
            } else if (k % 4 == 3) {
                nav += `<li><a href="${data[i].contect[k][1]}">${data[i].contect[k][0]}</a></li></ul>`
            } else {
                nav += `<li><a href="${data[i].contect[k][1]}">${data[i].contect[k][0]}</a></li>`
            }
        }
        if (data[i].contect.length % 4 != 0) {
            nav += `</ul>`
        }
        nav += '</div></div></div></div></li>'
    }
    nav += '</ul>'
    return nav
})

$("#footer-nav").html(function () {
    let nav = ''
    for (let i = 0; i < data.length; i++) {
        nav += `<div class="grid-item">
        <div class="grid-title">${data[i].title}</div>
        <div class="grid-body">
        <ul>`
        for (let k = 0; k < data[i].contect.length; k++) {
            nav += `<li><a href="${data[i].contect[k][1]}">${data[i].contect[k][0]}</a></li>`
        }
        nav += `</ul>
        </div>
      </div>`
    }
    return nav
})

$("#menu-nav").html(function () {
    let nav = '<ul class="menu-cont-wrap pc-hide">'
    for (let i = 0; i < data.length; i++) {
        nav += `
        <a href="#" class="switch">${data[i].title}</a>
        <ul>`
        for (let k = 0; k < data[i].contect.length; k++) {
            nav += `<li><a href="${data[i].contect[k][1]}">${data[i].contect[k][0]}</a></li>`
        }
        nav += `</ul>
        </li>`
    }
    nav += '</ul>'
    return nav
})

async function checklogin() {
    const localtoken = localStorage.getItem("token");
    const json = localStorage.getItem("data");
    const data = JSON.parse(json)
    var id = data.student_id
    if(!id){
        id=data.teacher_id
    }
    if(!id){
        id=data.admin_id
    }

    if (localtoken == null) {
        document.querySelector(".sp-hide").innerHTML += `<li><a href="login.html"><i class="far fa-sticky-note"></i> Login</a></li>`
    } else {
        document.querySelector(".sp-hide").innerHTML += `<li><span class="toggle-switch"><i class="fas fa-address-card"></i> Profile</span>
                                                            <div class="site-header-nav-sub toggle-cont">
                                                                <ul>
                                                                    <li>ID: ${id}<br>
                                                                        Name: ${data.name}</li>
                                                                    <li><a href="yourbooks.html"><i class="fas fa-angle-right"></i> Your Books</a></li>
                                                                    <li><a href="userInfos.html"><i class="fas fa-angle-right"></i> User Infos</a></li>
                                                                    <li><a href="lecture.html"><i class="fas fa-angle-right"></i> Lecture</a></li>
                                                                    <li onclick="removetoken()"><a><i class="fas fa-angle-right"></i> Logout</a></li>
                                                                </ul>
                                                            </div>
                                                        </li>`
    }
}

checklogin()
function removetoken() {
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    if(window.location.pathname=='/yourbooks.html') {
        window.location.replace('library.html');
    }else{
        window.location.reload();
    }
}