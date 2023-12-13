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

getdata()
async function getdata() {
    const localtoken = localStorage.getItem("token");
    if (localtoken == null) {
        window.location.replace('/login.html')
    }
    const res = await fetch('/lecture', {
        headers: {
            Authorization: `Bearer ${localtoken}`,
        },
    })
    const lectures = await res.json()
    let table = '<tr><th>Lecture ID</th><th>Lecture Name</th><th>Start Time</th><th>End Time</th><th>Sem</th><th></th></tr>'
    for (let i = 0; i < lectures.length; i++) {
        table += `<tr>
                <th>${lectures[i].lecture_id}</th>
                <th>${lectures[i].name}</th>
                <th>${lectures[i].start_time}</th>
                <th>${lectures[i].end_time}</th>
                <th>${lectures[i].sem}</th>
                <th><button onclick="deletedata(${lectures[i].id})">Delete</button></th>
                </tr>`
    }
    document.getElementById('getdata').innerHTML = table
}

async function deletedata(id) {
    const localtoken = localStorage.getItem("token");
    if (localtoken != null) {
        const data = localStorage.getItem("data");
        const json = JSON.parse(data)
        let keys = Object.keys(json)
        res = await fetch(`/lecture/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `${localtoken}`,
                'dataType': 'json',
                'content-type': 'application/json'
            }
        })
        location.reload();
    } else {
        window.location.href = "login.html";
    }
}

create()
async function create() {
    document
    	.querySelector('#submit')
    	.addEventListener('click', async function (e) {
    		e.preventDefault()
    		const formData = new FormData(document.querySelector('.createform'))
            const values = [...formData.entries()];
            let data = Object.fromEntries(values)
    		let res = await fetch('/lecture', {
    			method: 'POST',
                headers: {
                    'dataType': 'json',
                    'content-type': 'application/json'
                },
    			body: JSON.stringify(data)
    		})
    		let json = await res.json()
    		document.querySelector('.createform').reset()
    		location.reload();
    	})
}
