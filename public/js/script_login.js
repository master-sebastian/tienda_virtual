axios({
    method: 'post',
    url: './api/v1/auth/verify',
    data: {},
    headers:{
        'Authorization': 'Bearer ' + (localStorage.getItem("token_jwt_tienda") == null?"":localStorage.getItem("token_jwt_tienda"))
    }
  }).then((response) => {
    location.href = "/"
  }).catch(function (error) {
});
document.querySelector("#ingresar").addEventListener("click", () => {
    axios({
        method: 'post',
        url: './api/v1/auth/login',
        data: {
            user: document.querySelector("#usuario").value,
            password: document.querySelector("#clave").value
        }
    }).then((response) => {
        localStorage.setItem("token_jwt_tienda", response.data.token)
        location.href = "/"
    }).catch(function (error) {
        try {
            if (error.response.data.msg !== undefined) {
                Swal.fire({
                    title: error.response.data.msg,
                    text: '',
                    icon: 'error',
                    confirmButtonText: 'Cerrar'
                })
            }
        } catch (error_) { }
    });
})