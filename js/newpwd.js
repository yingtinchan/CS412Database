function enter() {
    const localtoken = window.location.pathname.split('/')[3];
    document.querySelector('#loginbu')
        .addEventListener('click', async (e) => {
            e.preventDefault()
            e.stopPropagation()
            const id = document.querySelector('#userid').value

            let res = await fetch('/user/verifyForgetPW', {
                method: 'POST',
                headers: {
                    'dataType': 'json',
                    'content-type': 'application/json',
                    Authorization: `Bearer ${localtoken}`,
                },
                body: JSON.stringify({newPw: id})
            })
            document.querySelector('.form-login').reset()
            window.location.replace('login.html')
        })
}
function back(){
    document.querySelector('#cancel')
        .addEventListener('click', async (e) => {
            window.location.replace('login.html')
        })
}