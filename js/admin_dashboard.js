$(document).ready(function () {
    $('.hamburger').click(function () {
        $('.left_sidebar').css({
            'transform': 'translateX(0)'
        });
    });
    $('.student').click(function () {
        $('.right_sidebar').css({
            'transform': 'translateX(0)'
        });
    });

    $('.close_btn').click(function () {
        $('.right_sidebar').css({
            'transform': 'translateX(150%)'
        })
    })

    $('.close_hamburger_btn').click(function () {
        $('.left_sidebar').css({
            'transform': 'translateX(-150%)'
        })
    })

});

function darkMode() {
    $('body').toggleClass('dark-mode');
    $('.table tr:nth-child(even)').css({
        'background-color': '#999',
        'color': '#555',
    })
    $('.table tr:nth-child(1)').css({
        'background-color': '#777',
        'color': '#555',
    })

    $('.main_content .main_navbar .dark_mode_icon .bx-sun').click(function () {
        $(this).css('display', 'none');
        $('.main_content .main_navbar .dark_mode_icon .bx-moon').css('display', 'block');
    });

    $('.main_content .main_navbar .dark_mode_icon .bx-moon').click(function () {
        $(this).css('display', 'none');
        $('.main_content .main_navbar .dark_mode_icon .bx-sun').css('display', 'block');
    });
}

jQuery(document).ready(function (e) {
    function t(t) {
        e(t).bind("click", function (t) {
            t.preventDefault();
            e(this).parent().fadeOut()
        })
    }
    e(".dropdown-toggle").click(function () {
        var t = e(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
        e(".button-dropdown .dropdown-menu").hide();
        e(".button-dropdown .dropdown-toggle").removeClass("active");
        if (t) {
            e(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
        }
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-menu").hide();
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-toggle").removeClass("active");
    })
});


const localtoken = localStorage.getItem("token");
if (localtoken != null) {
    const data = localStorage.getItem("data");
    const json = JSON.parse(data)
    $(".username").html(function () {
        return `<p>${json.name}</p>`
    });
} else {
    window.location.href = "login.html";
}

getstudent()
async function getstudent() {
document.getElementById("dashboardStudent").style.fontWeight="bold";
document.getElementById("dashboardTeacher").style.fontWeight="normal";
document.getElementById("dashboardAdmin").style.fontWeight="normal";

    const localtoken = localStorage.getItem("token");
    if (localtoken == null) {
        window.location.replace('/login.html')
    }
    const res = await fetch('/user/student', {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      })
    const students = await res.json()

    let table = '<tr><th>Student ID</th><th>Student Name</th><th>Email</th><th>Major</th><th></th></tr>'
    for (let i = 0; i < students.length; i++) {
        table += `<tr>
                <th>${students[i].student_id}</th>
                <th>${students[i].name}</th>
                <th>${students[i].email}</th>
                <th>${students[i].major.major_id}</th>
                <th><button onclick="deletestudent(${students[i].id})">Delete</button></th>
                </tr>`
    }
    document.getElementById('getdata').innerHTML = table

    const majorres = await fetch('/major', {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      })
    const json = await majorres.json()
    let major = `<select name="major">`
    for (let i = 0; i < json.length; i++) {
        major += `<option value="${json[i].major_id}">${json[i].major_id}</option>`
    }
    major += `</select>`

    document.querySelector('.profile').innerHTML = `                
    <form class="createform" >
    <div><label>Name: </label>
        <input type="text" name="name" placeholder="student name">
    </div>
    <div>
        <label>Password: </label>
        <input type="text" name="password" placeholder="password">
    </div>
    <div>
        <label>Email: </label>
        <input type="text" name="email" placeholder="email">
    </div>
    <div>
        <label>Major: </label>
        ${major}
    </div>
    <input type="submit" id="submit">
</form>`

document
.querySelector('#submit')
.addEventListener('click', async function (e) {
    e.preventDefault()
    const formData = new FormData(document.querySelector('.createform'))
    const values = [...formData.entries()];
    let data = Object.fromEntries(values)
    let res = await fetch('/user/student', {
        method: 'POST',
        headers: {
            'dataType': 'json',
            'content-type': 'application/json',
            Authorization: `Bearer ${localtoken}`
        },
        body: JSON.stringify(data)
    })
    let json = await res.json()
    document.querySelector('.createform').reset()
    location.reload();
})
}

async function getteacher() {
    document.getElementById("dashboardStudent").style.fontWeight="normal";
    document.getElementById("dashboardTeacher").style.fontWeight="bold";
    document.getElementById("dashboardAdmin").style.fontWeight="normal";
    const res = await fetch('/user/teacher', {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      })
    const teachers = await res.json()

    let table = '<tr><th>teacher ID</th><th>teacher Name</th><th>Email</th><th></th></tr>'
    for (let i = 0; i < teachers.length; i++) {
        table += `<tr>
                <th>${teachers[i].teacher_id}</th>
                <th>${teachers[i].name}</th>
                <th>${teachers[i].email}</th>
                <th><button onclick="deleteteacher(${teachers[i].id})">Delete</button></th>
                </tr>`
    }
    document.getElementById('getdata').innerHTML = table

    document.querySelector('.profile').innerHTML = `                
    <form class="createform" >
    <div><label>Name: </label>
        <input type="text" name="name" placeholder="teacher name">
    </div>
    <div>
        <label>Password: </label>
        <input type="text" name="password" placeholder="password">
    </div>
    <div>
        <label>Email: </label>
        <input type="text" name="email" placeholder="email">
    </div>
    <input type="submit" id="submit">
</form>`

document
.querySelector('#submit')
.addEventListener('click', async function (e) {
    e.preventDefault()
    const formData = new FormData(document.querySelector('.createform'))
    const values = [...formData.entries()];
    let data = Object.fromEntries(values)
    let res = await fetch('/user/teacher', {
        method: 'POST',
        headers: {
            'dataType': 'json',
            'content-type': 'application/json',
            Authorization: `Bearer ${localtoken}`,
        },
        body: JSON.stringify(data)
    })
    let json = await res.json()
    document.querySelector('.createform').reset()
    location.reload();
})
}

async function getadmin() {
    document.getElementById("dashboardStudent").style.fontWeight="normal";
    document.getElementById("dashboardTeacher").style.fontWeight="normal";
    document.getElementById("dashboardAdmin").style.fontWeight="bold";
    const res = await fetch('/user/admin', {
        headers: {
          Authorization: `Bearer ${localtoken}`,
        },
      })
    const admins = await res.json()

    let table = '<tr><th>admin ID</th><th>admin Name</th><th>Email</th></tr>'
    for (let i = 0; i < admins.length; i++) {
        table += `<tr>
                <th>${admins[i].admin_id}</th>
                <th>${admins[i].name}</th>
                <th>${admins[i].email}</th>
                </tr>`
    }
    document.getElementById('getdata').innerHTML = table
}
  
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("data");
    window.location.replace('/');
}

async function deletestudent(id) {
    const localtoken = localStorage.getItem("token");
    if (localtoken != null) {
        const data = localStorage.getItem("data");
        const json = JSON.parse(data)
        let keys = Object.keys(json)
            res = await fetch(`/user/student/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${localtoken}`,
                    'dataType': 'json',
                    'content-type': 'application/json'
                }
            })
        location.reload();
    }else {
        window.location.href = "login.html";
    }
}

async function deleteteacher(id) {
    const localtoken = localStorage.getItem("token");
    if (localtoken != null) {
        const data = localStorage.getItem("data");
        const json = JSON.parse(data)
        let keys = Object.keys(json)
            res = await fetch(`/user/teacher/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `${localtoken}`,
                    'dataType': 'json',
                    'content-type': 'application/json'
                }
            })
        location.reload();
    }else {
        window.location.href = "login.html";
    }
}