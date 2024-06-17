document.querySelector('.random_fact').textContent = get_fact()

document.querySelector('.user').onsubmit = async (e) => {
    e.preventDefault()
    
    const username = document.querySelector('input[name = username]').value
    const password = document.querySelector('input[name = password]').value

    const headers_list = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }

    const body_content = JSON.stringify({
        "username": username,
        "password": password
    })

    response = await fetch("http://localhost:3005/auth/login", { method: 'POST', body: body_content, headers: headers_list })
        .then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    sessionStorage.setItem('token', data.token)
                    window.location.href = '../pages/authentication.html'
                })
            } else {
                response.json().then(data => {
                    alert(data.message)
                    document.querySelector('input[name = username]').value = ''
                    document.querySelector('input[name = password]').value = ''
                })
            }
        })
        .catch((error) => console.error(error))
}