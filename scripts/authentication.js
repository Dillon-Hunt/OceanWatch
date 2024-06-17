document.querySelector('.authentication__input').value = ''

document.querySelector('.authentication').onsubmit = async (e) => {
    e.preventDefault()

    const headers_list = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    const body_content = JSON.stringify({
        "token": sessionStorage.getItem('token'),
        "verification_code": document.querySelector('.authentication__input').value.replace(' ', '')
    })

    response = await fetch("http://localhost:3005/auth/verification/", { method: 'POST', body: body_content, headers: headers_list })
        .then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    sessionStorage.setItem('token', data.token)
                    sessionStorage.setItem('verified', data.verified)
                    
                    if (data.verified) window.location.href = '../pages/admin_map.html'
                    else window.location.href = '../pages/public_map.html'
                })
            } else {
                response.json().then(data => {
                    alert(data.message)
                    document.querySelector('.authentication__input').value = ''
                })
            }
        })
        .catch(error => console.error(error))
}