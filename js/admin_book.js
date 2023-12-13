const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let addurl=''

getdata()
createbook()

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

async function getdata() {
    const localtoken = localStorage.getItem("token");
    if(urlParams.has('name')){
        addurl = "name"
    }else{
        addurl = "author"
    }
    
    const res =
    queryString != ''
            ? await fetch('/book/' + addurl+queryString, {
                headers: {
                  Authorization: `Bearer ${localtoken}`,
                },
              })
            : await fetch('/book', {
                headers: {
                  Authorization: `Bearer ${localtoken}`,
                },
              })
    const books = await res.json()
    let status
    let btn

    let table = '<tr><th>Book ID</th><th>Book Name</th><th>Category</th><th>Book Status</th><th>borrower</th><th></th></tr>'
    for (let i = 0; i < books.length; i++) {
        if (books[i].available) {
            status = "available"
        } else {
            status = "not available"
        }
        let borrower = ''
        if(books[i].student) {
            borrower = books[i].student
        } else if(books[i].teacher){
            borrower = books[i].teacher
        }
        table += `<tr>
                <th>${books[i].book_id}</th>
                <th>${books[i].name}</th>
                <th>${books[i].category}</th>
                <th>${status}</th>
                <th>${borrower}</th>
                <th><button onclick="deletedata(${books[i].book_id})">Delete</button></th>
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
            res = await fetch(`/book/${id}`, {
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

async function createbook(){

  const localtoken = localStorage.getItem("token");
    document
		.querySelector('#submit')
		.addEventListener('click', async function (e) {
			e.preventDefault()
			const formData = new FormData(document.querySelector('.createform'))
            const values = [...formData.entries()];
            let data = Object.fromEntries(values)
            let res = await fetch('/book', {
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
