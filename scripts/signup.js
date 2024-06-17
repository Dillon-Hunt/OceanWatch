document.querySelector('.random_fact').textContent = get_fact()

document.querySelector('.user').onsubmit = async (e) => {
    e.preventDefault()
    
    const first_name = document.querySelector('input[name = first_name]').value
    const last_name = document.querySelector('input[name = last_name]').value
    const username = document.querySelector('input[name = username]').value
    const email = document.querySelector('input[name = email]').value
    const password = document.querySelector('input[name = password]').value
    const password_confirmation = document.querySelector('input[name = password_confirmation]').value

    if (password !== password_confirmation) {
        alert('Passwords do not match.')
        return
    }

    const headers_list = {
        "Accept": "*/*",
        "Content-Type": "application/json"
    }
       
    const body_content = JSON.stringify({
        "first_name": first_name,
        "last_name": last_name,
        "username": username,
        "email": email,
        "password": password
    })

    response = await fetch("http://localhost:3005/users/", { method: 'POST', body: body_content, headers: headers_list })
        .then(response => {
            if (response.status === 201) {
                response.json().then(data => {
                    sessionStorage.setItem('token', data.token)
                    window.location.href = '../pages/authentication.html'
                })
            } else {
                response.json().then(data => {
                    alert(data.message)
                })
            }
        })
        .catch((error) => console.error(error))
}