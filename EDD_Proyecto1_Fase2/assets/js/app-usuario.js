
const etiquetaNombre = document.getElementById("saludo-usuario");
const botonSalir = document.getElementById("bnt-logout");

function saludoUsuario(){
    let usuario = JSON.parse(localStorage.getItem("estudianteLog"));
    etiquetaNombre.innerHTML = `Bienvenido ${usuario.nombre}`
}

botonSalir.addEventListener("click", function(){
    try {
        Swal.fire({
            title: '¿Estás seguro que deseas salir?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, estoy seguro!',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                '¡Has salido!',
                'Vuelve pronto.',
                'success'
              )
              window.location.href = "../index.html";
            }
          })
    } catch (error) {
        console.error("Ha ocurrido un error al hacer logout", error);
    }
})

window.onload = saludoUsuario;