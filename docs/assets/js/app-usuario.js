
import { arbolMulticamino } from "./arbol-multicamino.js";
import { ArbolAVL } from "./arbol-avl.js";

const contenedorCarpetas = document.getElementById("carpetas-container");
const etiquetaNombre = document.getElementById("saludo-usuario");
const barraRuta = document.getElementById("input-busqueda");
const botonCrearCarpeta = document.getElementById("btn-crear-carpeta");
const botonSalir = document.getElementById("bnt-logout");

let arbolCarpetas = new arbolMulticamino();

//función que se ejecuta al cargar la pagina
function inicioPagina() {
  let usuario = JSON.parse(localStorage.getItem("estudianteLog"));
  etiquetaNombre.innerHTML = `Bienvenido ${usuario.nombre}`

  //mostrando las carpetas del usuario recien loggeado
  if (usuario.carpeta != null) {
    let carpetasLoggeado = new arbolMulticamino();
    let temp = JSON.parse(localStorage.getItem("estudianteLog")).carpeta;

    carpetasLoggeado.root = temp.root;
    
    contenedorCarpetas.innerHTML = "";
    contenedorCarpetas.innerHTML = (carpetasLoggeado.getHTML("/"));

    //actualizando el arbol carpetas 
    arbolCarpetas.root = temp.root;
  }
}

botonCrearCarpeta.addEventListener("click", function () {
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

function crearCarpeta(nombreCarpeta, ruta) {

  //obteniendo el arbol de carpetas del localstorage
  arbolCarpetas.insert(nombreCarpeta, ruta);

  //actulizando carpetas en el arbolAVL
  actualizarCarpetas();

  //alerta
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

function actualizarCarpetas(){
  let arbol = new ArbolAVL();
  let temp = localStorage.getItem('arbolEstudiantesLS');
  let usuario = JSON.parse(localStorage.getItem("estudianteLog"));

  arbol.raiz = JSON.parse(temp).raiz;

  arbol.modificarCarpetas(usuario.carnet,arbolCarpetas);

  localStorage.setItem('arbolEstudiantesLS', JSON.stringify(arbol));
}

/*actualizar datos*/
window.onload = inicioPagina;