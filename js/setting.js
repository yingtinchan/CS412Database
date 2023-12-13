function enter() {
    const localtoken = localStorage.getItem("token");
    const data = localStorage.getItem("data");
    const json = JSON.parse(data)
    let keys = Object.keys(json)
    document.querySelector('#loginbu')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            e.stopPropagation()
            const name = document.querySelector('#username').value
            const email = document.querySelector('#useremail').value
            const pwd = document.querySelector('#password').value

    
            if (keys[1].substring(0, 1) == "s") {
                let res = await fetch(`/user/student/${json.student_id}`, {
                    method: 'POST',
                    headers: {
                        'dataType': 'json',
                        'content-type': 'application/json',
                        Authorization: `Bearer ${localtoken}`,
                    },
                    body: JSON.stringify({name:name,email:email,password:pwd})
                  })
            } else if (keys[1].substring(0, 1) == "t") {
                let res = await fetch(`/user/teacher/${json.teacher_id}`, {
                    method: 'POST',
                    headers: {
                        'dataType': 'json',
                        'content-type': 'application/json',
                        Authorization: `Bearer ${localtoken}`,
                    },
                    body: JSON.stringify({name:name,email:email,password:pwd})
                  })
            }
            document.querySelector('.form-login').reset()
            window.location.replace('login.html')
        })
}
function back(){
    document.querySelector('#cancel')
        .addEventListener('click', async (e) => {
            window.location.replace('/')
        })
}