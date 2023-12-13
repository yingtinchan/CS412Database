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
        //alert(json.student_id);

        res = await fetch(`/lecture/getLectureById/ `, {
            body: JSON.stringify({"id":json.student_id}),
            headers: {
              Authorization: `Bearer ${localtoken}`,
              'dataType': 'json',
              'content-type': 'application/json'
            },
            method: 'POST',
          })
    } else if (keys[1].substring(0, 1) == "t") {
        res = await fetch(`/lecture/getLectureById/ `, {
            body: JSON.stringify({"id":json.teacher_id}),
            headers: {
              Authorization: `Bearer ${localtoken}`,
              'dataType': 'json',
              'content-type': 'application/json'
            },
            method: 'POST',
          })
    }
    const lectures = await res.json()
//alert(JSON.stringify(lectures));
    if (lectures.length == 0) {
        document.getElementById('getdata').innerHTML = '<h2>No lectures yet</h2>'
    } else {
        let table = '<tr><th>Lecture ID</th><th>Lecture Name</th><th>start_time</th><th>end_time</th><th>sem</th></tr>'
        //alert(38);
        for (let i = 0; i < lectures.length; i++) {
            table += `<tr>
                <th>${lectures[i].lecture_id}</th>
                <th>${lectures[i].lecture_name}</th>
                <th>${lectures[i].start_time}</th>
                <th>${lectures[i].end_time}</th>
                <th>${lectures[i].sem}</th>
                </tr>`
        }
        //alert(48);
        document.getElementById('getdata').innerHTML = table
        //alert(50);
    }
    //alert(52);
}
getdata()
