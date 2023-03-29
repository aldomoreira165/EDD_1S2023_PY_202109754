
import { arbolMulticamino } from "./arbol-multicamino.js";

const contenedorCarpetas = document.getElementById("carpetas-container");
const etiquetaNombre = document.getElementById("saludo-usuario");
const barraRuta = document.getElementById("input-busqueda");
const botonCrearCarpeta = document.getElementById("btn-crear-carpeta");
const botonSalir = document.getElementById("bnt-logout");

let arbolCarpetas = new arbolMulticamino();

function saludoUsuario() {
  let usuario = JSON.parse(localStorage.getItem("estudianteLog"));
  etiquetaNombre.innerHTML = `Bienvenido ${usuario.nombre}`
}

botonCrearCarpeta.addEventListener("click", function(){
  let nombreCarpeta = "";
  Swal.fire({
    title: 'Ingresa el nombre de la carpeta',
    input: 'text',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Crear',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (login) => {
      return fetch(`//api.github.com/users/${login}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          return response.json()
        })
        .catch(error => {
          Swal.showValidationMessage(
            `Request failed: ${error}`
          )
        })
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      nombreCarpeta = result.value.login;
      let valorRuta = barraRuta.value;
      crearCarpeta(nombreCarpeta, valorRuta);
    }
  })
});

function crearCarpeta(nombreCarpeta, ruta){
  arbolCarpetas.insert(nombreCarpeta, ruta);
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: '¡Carpeta creada exitosamente!',
    showConfirmButton: false,
    timer: 1500
  })

  contenedorCarpetas.innerHTML = "";
  contenedorCarpetas.innerHTML = (arbolCarpetas.getHTML(ruta))
}

botonSalir.addEventListener("click", function () {
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