$('.typebutton').click(function () {
    $('.typebutton').toggleClass('active');
    $('.libsearch').toggleClass('hide');
    $('.libsearch').show();
    $('.libsearch.hide').hide();
})

$('.libsearch.hide').hide();

async function getdata() {
    const localtoken = localStorage.getItem("token");
    const data = localStorage.getItem("data");
    const json = JSON.parse(data)
    let keys = Object.keys(json)
    var _id="";
    if (keys[1].substring(0, 1) == "s") {
        //alert(json.student_id);
        _id=json.student_id;
        res = await fetch(`/user/student/${json.student_id} `, {
            //body: JSON.stringify({"id":json.student_id}),
            headers: {
              Authorization: `Bearer ${localtoken}`,
            },
            method: 'GET',
          })
    } else if (keys[1].substring(0, 1) == "t") {
        _id=json.teacher_id;
        res = await fetch(`/user/teacher/${json.teacher_id} `, {
            //body: JSON.stringify({"id":json.teacher_id}),
            headers: {
              Authorization: `Bearer ${localtoken}`,
            },
            method: 'GET',
          })
    } else if (keys[1].substring(0, 1) == "a") {
        _id=json.teacher_id;
        res = await fetch(`/user/admin/${json.admin_id} `, {
            //body: JSON.stringify({"id":json.teacher_id}),
            headers: {
              Authorization: `Bearer ${localtoken}`,
            },
            method: 'GET',
          })
    }
    const body = await res.json()
    //alert(JSON.stringify(body));
    if (body.length == 0) {
        document.getElementById('getdata').innerHTML = '<h2>No information</h2>'
    } else {
        let table = '';//'<tr><th>Lecture ID</th><th>Lecture Name</th><th>start_time</th><th>end_time</th><th>sem</th></tr>'
        //alert(38);
        //alert(keys);
        table += `<form id="form1" name="form1">
            <input type="hidden" id="id" value="${body.id}" />
            <tr><td>User Id:</td><td>${_id}</td></tr>
            <tr><td>Name:</td><td><input type="text" id="name" value="${body.name}" /></td></tr>
            <tr><td>Email:</td><td><input type="text" id="email" value="${body.email}" /></td></tr>
            <tr><td>Major Id:</td><td>${body.major.major_id}</td></tr>
            <tr><td>Major Name:</td><td>${body.major.name}</td></tr>
            <tr><td></td><td><button id="button1" onclick="updateInfos('${_id}','${body}','${localtoken}')">Update</button></td></tr>
            </form>`
        //alert(48);
        document.getElementById('getdata').innerHTML = table
        //alert(50);
    }
    //alert(52);
}
function updateInfos(userId,body,localtoken){
    var _id=document.getElementById("id").value;
    var _name=document.getElementById("name").value;
    var _email=document.getElementById("email").value;
    var res="";
    //alert(_name+"|"+_email);
    if (userId.substring(0, 1) == "S") {
        res = fetch(`/user/student/${_id} `, {
            body: JSON.stringify({"name":_name,"email":_email}),
            headers: {
              Authorization: `Bearer ${localtoken}`,
              'dataType': 'json',
              'content-type': 'application/json'
            },
            method: 'PATCH',
        });
    } else if (userId.substring(0, 1) == "T") {
        res = fetch(`/user/teacher/${_id} `, {
            body: JSON.stringify({"name":_name,"email":_email}),
            headers: {
              Authorization: `Bearer ${localtoken}`,
              'dataType': 'json',
              'content-type': 'application/json'
            },
            method: 'PATCH',
        });
    } else if (userId.substring(0, 1) == "A") {
        res = fetch(`/user/admin/${_id} `, {
            body: JSON.stringify({"name":_name,"email":_email}),
            headers: {
              Authorization: `Bearer ${localtoken}`,
              'dataType': 'json',
              'content-type': 'application/json'
            },
            method: 'PATCH',
        });
    }

    //alert(_id);
    //alert(80);
    alert("Update Success");
}

getdata()
