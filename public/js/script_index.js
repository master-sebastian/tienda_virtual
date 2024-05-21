function validarAuth(){
    axios({
        method: 'post',
        url: './api/v1/auth/verify',
        data: {},
        headers:{
            'Authorization': 'Bearer ' + (localStorage.getItem("token_jwt_tienda") == null?"":localStorage.getItem("token_jwt_tienda"))
        }
      }).then((response) => {
        let list_auth = document.querySelectorAll(".perfil_auth");
        for (let item of list_auth) {item.classList.remove("perfil_auth")}
      }).catch(function (error) {
        let li_list_normal = document.querySelectorAll("li.perfil_normal");
        let button_list_normal = document.querySelectorAll("button.perfil_normal");
        for (let item of li_list_normal) {item.classList.remove("perfil_normal")}
        for (let item of button_list_normal) {item.classList.remove("perfil_normal")}
    });
}

validarAuth()

function cierre_sesion(){
    localStorage.removeItem("token_jwt_tienda");
    location.href = "/"
}

const appendAlert = (message, type, id_) => {
    const alertPlaceholder = document.getElementById(id_)
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}
let control_envio = true;
document.querySelector("#enviar_correo").addEventListener("click", () => {
    document.querySelector("#enviar_correo").classList.add("disabled")
    if (control_envio == true) {
        control_envio = false;
        axios({
            method: 'post',
            url: './api/v1/mail',
            data: {
                numberPhone: document.querySelector("#numero_celular_contacto").value,
                msg: document.querySelector("#mensaje_contacto").value,
                email: document.querySelector("#correo_electronico_contacto").value
            }
        }).then(function (response) {
            if (response.data.msg.indexOf("Se no se puedo enviar") === -1) {
                appendAlert("📧 " + response.data.msg, "success", "liveAlertPlaceholder")
                document.querySelector("#numero_celular_contacto").value = ""
                document.querySelector("#mensaje_contacto").value = ""
                document.querySelector("#correo_electronico_contacto").value = ""
            } else {
                appendAlert("📧 " + response.data.msg, "danger", "liveAlertPlaceholder")
            }
            document.querySelector("#enviar_correo").classList.remove("disabled")
            control_envio = true
        }).catch(function (error) {
            control_envio = true
            document.querySelector("#enviar_correo").classList.remove("disabled")
        });
    }
})

function renderCategory(index, nombre) {
    return `<a href="javascript:void(0)" class="list-group-item list-group-item-action" onclick="filterProductByCategory(this, ${index})">${nombre}</a>`;
}

function renderProduct(index, nombre, imagen, codigo, cantidad, dirigido_a) {
    return `<div class="col-lg-4">
    <div class="card" style="border-bottom: 6px solid #eba9c5; margin-bottom: 10px;">
        <img src="${imagen}" class="card-img-top" alt="..." style="height: 50vh;">
        <div class="card-body">
        <h5 class="card-title text-center">${nombre}</h5>
        <hr style="border: 2px solid #eba9c5 !important; border-bottom-right-radius: 50px;border-bottom-left-radius: 50%;">
        <p class="card-text text-center">
            <b>Codigo:</b> ${codigo}
            <br>
            <b>Cantidad:</b> ${cantidad}
            <br>
            <b>Dirigido A:</b> ${dirigido_a}
        </p>
        <div class="text-center">
            <button class="btn btn-primary" style="border-bottom: 6px solid blue;" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="renderModalPageProducto('${index}')"> 📗 Ver a Detalle</button>
            <hr class="perfil_auth">
            <button class="btn btn-success perfil_auth" style="border-bottom: 6px solid green;" onclick="editProduct('${index}')"> ✏ Editar</button>
            <hr class="perfil_auth">
            <button class="btn btn-danger perfil_auth" style="border-bottom: 6px solid red;" onclick="deleteProduct('${index}')"> 🗑 Eliminar</button>
        </div>
        </div>
    </div>
    </div>`
}

function editProduct(_id){
    localStorage.setItem("id_product_edit", _id);
    location.href = "/product_edit";
}

function deleteProduct(_id){
    const result = confirm("¿Desea elminar este producto?");
    if(result === true){
        axios({
            method: 'delete',
            url: './api/v1/products/'+_id,
            headers: {
              'Authorization': 'Bearer ' + (localStorage.getItem("token_jwt_tienda") == null ? "" : localStorage.getItem("token_jwt_tienda"))
            }
          }).then(async (response) => {
            Swal.fire({
                title: "Se elimino el producto",
                text: '',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            })
            setTimeout(()=>{
                location.href = "/"
            }, 2000)
          }).catch(async (error) => {
        
          });
    }
}

function filterProductByCategory(el, index) {
    let elements_a = document.querySelectorAll("#render-categories a")
    let flag = false;
    for (let element_a of elements_a) {
        if(element_a === el && Array.from(element_a.classList).includes("active") && !flag){
           flag=true; 
        }
        element_a.classList.remove("active")
    }

    let response = null;
    if(flag){
        response = window.data_page_total
        document.querySelector("#titulo_actual_categoria").innerHTML = "📘 Todos las categorias";
    }else{
        let _id = window.data_page_total_categories[index]._id
        el.classList.add("active")
        let nombre_categoria = window.data_page_total_categories[index].nombre;
        document.querySelector("#titulo_actual_categoria").innerHTML = "📘 "+ nombre_categoria;
        response = window.data_page_total.filter((product) => product.categoria_id == _id)
    }

    let ins = ""
    response.forEach(({_id, nombre, codigo, imagen, cantidad, dirigido_a }, index) => {
        ins += renderProduct(_id, nombre, imagen, codigo, cantidad, dirigido_a.length > 0 ? dirigido_a[0].nombre : "")
    })

    if(ins == ""){
        document.querySelector("#render-products").innerHTML = "<h4 class='text-center'>No hay "+nombre_categoria+" disponibles.</h4>"
    }else{
        document.querySelector("#render-products").innerHTML = ins;
    }

    validarAuth()
}

function renderModalPageProducto(index) {
    let { nombre, descripcion, codigo, imagen, cantidad, categoria, talla, dirigido_a, contacto_whatsapp } = window.data_page_total.filter((obj)=> obj._id == index)[0]
    categoria = categoria.length > 0 ? categoria[0].nombre : ""
    talla = talla.length > 0 ? talla[0].nombre : ""
    dirigido_a = dirigido_a.length > 0 ? dirigido_a[0].nombre : ""
    contacto_whatsapp = contacto_whatsapp.length > 0 ? contacto_whatsapp[0].nombre : ""
    document.querySelector("#model-nombre-text").innerHTML = nombre
    document.querySelector("#model-codigo-text").innerHTML = codigo
    document.querySelector("#model-descripcion-text").innerHTML = descripcion
    document.querySelector("#model-img-text").setAttribute("src", imagen)
    document.querySelector("#model-cantidad-text").innerHTML = cantidad
    document.querySelector("#model-dirigido-a-text").innerHTML = dirigido_a
    document.querySelector("#model-talla-text").innerHTML = talla
    document.querySelector("#model-categoria-text").innerHTML = categoria
    document.querySelector("#model-info-whatsapp-text").setAttribute("href", contacto_whatsapp)
}

function renderCategoriesPost() {
    axios({
        method: 'get',
        url: './api/v1/categories'
    }).then((response) => {
        window.data_page_total_categories = response.data;
        let ins = ""
        response.data.forEach(({ nombre }, index) => {
            ins += renderCategory(index, nombre)
        })
        document.querySelector("#render-categories").innerHTML = ins;
    }).catch(function (error) { });
}

axios({
    method: 'get',
    url: './api/v1/products'
}).then((response) => {
    window.data_page_total = response.data;
    let ins = ""
    response.data.forEach(({_id, nombre, codigo, imagen, cantidad, dirigido_a }, index) => {
        ins += renderProduct(_id, nombre, imagen, codigo, cantidad, dirigido_a.length > 0 ? dirigido_a[0].nombre : "")
    })
    if(ins == ""){
        document.querySelector("#render-products").innerHTML = "<h4 class='text-center'>No hay productos disponibles.</h4>"
    }else{
        document.querySelector("#render-products").innerHTML = ins;
    }
    renderCategoriesPost()
    validarAuth()
}).catch(function (error) { });

$(document).ready(function () {
    let width = window.innerWidth;
    let resolucion = $(window).width();

    if (resolucion >= 992) {
        document.querySelector("#boton-lista-categorias").click()
    }
})