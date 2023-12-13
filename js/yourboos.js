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
        res = await fetch(`/book/${json.student_id}`, {
            headers: {
              Authorization: `Bearer ${localtoken}`,
            },
          })
    } else if (keys[1].substring(0, 1) == "t") {
        res = await fetch(`/book/${json.teacher_id}`, {
            headers: {
              Authorization: `Bearer ${localtoken}`,
            },
          })
    }

    const books = await res.json()

    if (books.length == 0) {
        document.getElementById('getdata').innerHTML = '<h2>No books borrow yet</h2>'
    } else {
        let table = '<tr><th>Book ID</th><th>Book Name</th><th>Category</th></tr>'
        for (let i = 0; i < books.length; i++) {
            table += `<tr>
                <th>${books[i].book_id}</th>
                <th>${books[i].name}</th>
                <th>${books[i].category}</th>
                </tr>`
        }
        document.getElementById('getdata').innerHTML = table
    }
}
getdata()
