login()

function login() {
    document.querySelector('#loginbu')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            e.stopPropagation()
            const id = document.querySelector('#userid').value
            const password = document.querySelector('#password').value

            let res = await fetch('/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({id:id,password:password})
            })
            let json = await res.json()
            document.querySelector('.form-login').reset()
            console.log(json)
            if (json.statusCode === 200) {
                localStorage.setItem("token", json["access_token"]);
                localStorage.setItem("data", JSON.stringify(json["data"]));
                switch(json.role){
                    case 'admin':
                        window.location.replace('admin_dashboard.html')
                        break
                    case 'student':
                        window.location.replace('student_dashboard.html')
                        break
                    case 'teacher':
                        window.location.replace('teacher_dashboard.html')
                        break
                }
            } else {
                document.querySelector('.notice').innerHTML = json.msg
            }
        })
}
function back(){
    document.querySelector('#cancel')
        .addEventListener('click', async (e) => {
            window.location.replace('/')
        })
}