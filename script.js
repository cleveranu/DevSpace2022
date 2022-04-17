var jwt = localStorage.getItem('token');
if (jwt != null) {
    window.location.href = 'index.html';
}

function login() {
    const name = document.getElementById('input-name').value;
    const email = document.getElementById('input-email').value;
    const message = document.getElementById('input-message')= document.getElementById('input-email').value;

    const xhttp = new XMLHttpRequest();
    xhttp.open('POST', 'http://acril-backend.herokuapp.com/api/v1/feedback/add');
    xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhttp.send(JSON.stringify({
        'name': name,
        'email': email,
        'message': message
    }));
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const objects = JSON.parse(this.responseText);
            console.log(objects);
            if (objects['status'] == 'ok') {
                localStorage.setItem('token', objects['token']);
                Swal.fire({
                    text: objects['message'],
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = 'index.html';
                    }
                });
            } else {
                Swal.fire({
                    text: objects['message'],
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };
    return false;
}
