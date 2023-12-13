async function enter() {
    //alert(2);
    //document.querySelector('#loginbu').addEventListener('click', async (e) => {
            //alert(5);
            //e.preventDefault()
            //e.stopPropagation()
            const id = document.getElementById("userid").value;//document.querySelector('#userid').value
            //alert("9="+id);
            let res = await fetch('/user/forgetPWByEmail', {
                method: 'POST',
                headers: {
                    'dataType': 'json',
                    'content-type': 'application/json'
                },
                body: JSON.stringify({email:id,verifyUrl:window.location.hostname+'/user/verify/'})
            })
            //alert(18);
            let json = await res.json()
            //alert(19);
            console.log(json);
            document.querySelector('.form-login').reset()
            if (json.statusCode === 200) {
                window.location.replace('newpwd.html')
            } else {
                window.location.replace('login.html')
            }
            //alert(27);
        //})
}
function back(){
    document.querySelector('#cancel')
        .addEventListener('click', async (e) => {
            window.location.replace('login.html')
        })
}