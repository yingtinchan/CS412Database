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
    
    if (keys[1].substring(0, 1) == "s") {
        res = await fetch(`/user/student/${json.student_id}`, {
            headers: {
              Authorization: `Bearer ${localtoken}`,
            },
          })
    } else if (keys[1].substring(0, 1) == "t") {
        res = await fetch(`/user/teacher/${json.teacher_id}`, {
            headers: {
              Authorization: `Bearer ${localtoken}`,
            },
          })
    }

    const lectures = await res.json()

    if (lectures.length == 0) {
        document.getElementById('getdata').innerHTML = '<h2>No lectures yet</h2>'
    } else {
        let table = '<tr><th>lecture ID</th><th>lecture Name</th></tr>'

            table += `<tr>
                <th>${lectures.major.major_id}</th>
                <th>${lectures.major.name}</th>
                </tr>`
     
        document.getElementById('getdata').innerHTML = table
    }
}
getdata()
