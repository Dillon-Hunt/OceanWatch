document.querySelector('.import__box__name').textContent = document.querySelector('.import__box__file').value.split("\\").pop()

document.querySelector('.import__box__file').onchange = (e) => {
    document.querySelector('.import__box__name').textContent =  e.target.value.split("\\").pop()
}

document.querySelector('.import__upload').onclick = async (e) => {
    e.preventDefault()

    if (document.querySelector('.import__upload').style.cursor !== 'not-allowed') {

        document.querySelector('.import__upload__text').textContent = 'Uploading...'
        document.querySelector('.import__upload').style.opacity = 0.4
        document.querySelector('.import__upload').style.backgroundColor = 'var(--purple-80)'
        document.querySelector('.import__upload').style.cursor = 'not-allowed'

        const file = document.querySelector('.import__box__file').files[0]

        const headers_list = {
            "Accept": "*/*",
            "Content-Type": "multipart/form-data"
        }

        var body_content = new FormData()
        body_content.append('file', file)

        response = await fetch("http://localhost:3005/upload", { method: 'POST', body: body_content }) //, headers: headers_list
            .then(response => {
                if (response.status === 200) {
                    location.href = '../pages/admin_map.html'
                } else {
                    document.querySelector('.import__upload__text').textContent = 'Upload'
                    document.querySelector('.import__upload').style.opacity = 1
                    document.querySelector('.import__upload').style.backgroundColor = 'var(--purple)'
                    document.querySelector('.import__upload').style.cursor = 'not-allowed'
                    console.error(response)
                }
            })
            .catch(error => {
                document.querySelector('.import__upload__text').textContent = 'Upload'
                document.querySelector('.import__upload').style.opacity = 1
                document.querySelector('.import__upload').style.backgroundColor = 'var(--purple)'
                document.querySelector('.import__upload').style.cursor = 'not-allowed'
                alert(error)
            })
    }
}