
import { arbolMulticamino } from "./arbol-multicamino.js";
import { ArbolAVL } from "./arbol-avl.js";
import { ListaCircular } from "./lista-circular.js";

const contenedorCarpetas = document.getElementById("carpetas-container");
const etiquetaNombre = document.getElementById("saludo-usuario");
const barraRuta = document.getElementById("input-busqueda");
const inputSubirArchivo = document.getElementById("input-subir-archivo");
const botonSubirArchivo = document.getElementById("container-logo-subir-archivo");
const botonCrearCarpeta = document.getElementById("btn-crear-carpeta");
const botonEliminarCarpeta = document.getElementById("btn-eliminar-carpeta");
const botonReporteCarpetas = document.getElementById("btn-reporte-carpetas");
const botonReporteAcciones = document.getElementById("btn-reporte-acciones");
const botonRetornar = document.getElementById("boton-retornar");
const botonSalir = document.getElementById("bnt-logout");

let arbolCarpetas = new arbolMulticamino();
let listaAcciones = new ListaCircular();

//función que se ejecuta al cargar la pagina
function inicioPagina() {
  let usuario = JSON.parse(localStorage.getItem("estudianteLog"));
  etiquetaNombre.innerHTML = `Bienvenido ${usuario.nombre}`

  //acá se obtienen los datos necesarios de los estudiantes (carpetas, acciones, etc) almacenados previamente

  //mostrando las carpetas del usuario recien loggeado
  if (usuario.carpeta != null) {
    let carpetasLoggeado = new arbolMulticamino();
    let temp = JSON.parse(localStorage.getItem("estudianteLog")).carpeta;

    carpetasLoggeado.root = temp.root;

    contenedorCarpetas.innerHTML = "";
    contenedorCarpetas.innerHTML = (carpetasLoggeado.getHTML("/"));

    //actualizando el arbol carpetas 
    arbolCarpetas.root = temp.root;

    //actualizando los botones carpeta
    actualizarBotonesCarpetas();
  }

  if (usuario.acciones != null) {
    let temp = JSON.parse(localStorage.getItem("estudianteLog")).acciones;

    listaAcciones.cabeza = temp.cabeza;
  }

  //insertando la acción en la lista
  let accion = `Inició sesión\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
  listaAcciones.insertar(accion);

  //actualizando las acciones
  actualizarAcciones();
}

//funcion para el reporte de carpetas
botonReporteCarpetas.addEventListener("click", function () {
  const contenedorImagen = document.getElementById("container-arbol-img");
  let url = 'https://quickchart.io/graphviz?graph=';
  let body = `digraph G{${arbolCarpetas.graph(barraRuta.value)} }`;
  contenedorImagen.setAttribute("src", url + body);
});

//funcion para el reporte de acciones
botonReporteAcciones.addEventListener("click", function () {
  const contenedorImagen = document.getElementById("container-acciones-img");
  let url = 'https://quickchart.io/graphviz?graph=';
  let body = `digraph G{node [shape=box]${listaAcciones.graficar()} }`;
  contenedorImagen.setAttribute("src", url + body);
});

//funcion para crear una carpeta
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

//funcion para eliminar carpetas
botonEliminarCarpeta.addEventListener("click", function () {
  let nombreCarpeta = "";
  Swal.fire({
    title: 'Ingresa el nombre de la carpeta a eliminar',
    input: 'text',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Eliminar',
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
      eliminarCarpeta(nombreCarpeta, valorRuta);
    }
  })
})

function eliminarCarpeta(nombreCarpeta, ruta) {
  //obteniendo el arbol de carpetas del localstorage
  arbolCarpetas.delete(nombreCarpeta, ruta);

  //actulizando carpetas en el arbolAVL
  actualizarCarpetas();

  //insertando la acción en la lista
  let accion = `Acción: Se eliminó carpeta: ${nombreCarpeta}\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
  listaAcciones.insertar(accion);

  //actualizando las acciones
  actualizarAcciones();

  //alerta
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: '¡Carpeta eliminada exitosamente!',
    showConfirmButton: false,
    timer: 1500
  })

  contenedorCarpetas.innerHTML = "";
  contenedorCarpetas.innerHTML = (arbolCarpetas.getHTML(ruta))

  //actualizando los botones carpeta
  actualizarBotonesCarpetas();
}

//funcion para navegar entre carpetas

function actualizarBotonesCarpetas() {
  let botonesCarpetas = document.querySelectorAll(".btnCarpeta");

  botonesCarpetas.forEach(boton => {
    boton.addEventListener('click', navegarEntreCarpetas)
  });
}

function navegarEntreCarpetas(e) {
  const nombre = e.currentTarget.id;
  entrarCarpeta(nombre);
}

function entrarCarpeta(folderName) {
  let path = barraRuta.value;
  let curretPath = path == '/' ? path + folderName : path + "/" + folderName;
  barraRuta.value = curretPath;
  contenedorCarpetas.innerHTML = "";
  contenedorCarpetas.innerHTML = (arbolCarpetas.getHTML(curretPath))
  actualizarBotonesCarpetas();
}

//funcion para retornar al inicio 

botonRetornar.addEventListener("click", function () {
  barraRuta.value = "/";
  contenedorCarpetas.innerHTML = "";
  contenedorCarpetas.innerHTML = (arbolCarpetas.getHTML("/"))
  actualizarBotonesCarpetas();
})

//funcion para crear carpetas

function crearCarpeta(nombreCarpeta, ruta) {
  //obteniendo el arbol de carpetas del localstorage
  arbolCarpetas.insert(nombreCarpeta, ruta);

  //actulizando carpetas en el arbolAVL
  actualizarCarpetas();

  //insertando la acción en la lista
  let accion = `Acción: Se creó carpeta: ${nombreCarpeta}\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
  listaAcciones.insertar(accion);

  //actualizando las acciones
  actualizarAcciones();

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

  //actualizando los botones carpeta
  actualizarBotonesCarpetas();
}


//boton para hacer logout 

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
        //insertando la acción en la lista
        let accion = `Cerró sesión\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
        listaAcciones.insertar(accion);

        //actualizando las acciones
        actualizarAcciones();

        window.location.href = "../index.html";
      }
    })
  } catch (error) {
    console.error("Ha ocurrido un error al hacer logout", error);
  }
})

function actualizarCarpetas() {
  let arbol = new ArbolAVL();
  let temp = localStorage.getItem('arbolEstudiantesLS');
  let usuario = JSON.parse(localStorage.getItem("estudianteLog"));

  arbol.raiz = JSON.parse(temp).raiz;
  arbol.modificarCarpetas(usuario.carnet, arbolCarpetas);

  localStorage.setItem('arbolEstudiantesLS', JSON.stringify(arbol));
}

function actualizarAcciones() {
  let arbol = new ArbolAVL();
  let temp = localStorage.getItem('arbolEstudiantesLS');
  let usuario = JSON.parse(localStorage.getItem("estudianteLog"));

  arbol.raiz = JSON.parse(temp).raiz;
  arbol.modificarAcciones(usuario.carnet, listaAcciones);
  localStorage.setItem('arbolEstudiantesLS', JSON.stringify(arbol));
}

/*Acciones para subir un archivo*/
botonSubirArchivo.addEventListener("click", function () {
  inputSubirArchivo.click();
});

inputSubirArchivo.addEventListener("change", function () {
  let rutaActual = barraRuta.value;

  const archivo = this.files[0];
  if (archivo.type == "text/plain") {
    let fr = new FileReader();
    fr.readAsText(archivo);
    fr.onload = () => {
      arbolCarpetas.getFolder(rutaActual).documents.push({
        name: archivo.name,
        content: fr.result,
        type: archivo.type
      })

      //actulizando carpetas en el arbolAVL
      actualizarCarpetas();

      //notificando que se subió el archivo correctamente
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Documento creado correctamente!',
        showConfirmButton: false,
        timer: 1500
      })

      //graficando
      contenedorCarpetas.innerHTML = "";
      contenedorCarpetas.innerHTML = (arbolCarpetas.getHTML(rutaActual));

    };
  } else {
    let parseBase64 = base64(archivo);
    arbolCarpetas.getFolder(rutaActual).documents.push({
      name: archivo.name,
      content: parseBase64,
      type: archivo.type
    });

    //actulizando carpetas en el arbolAVL
    actualizarCarpetas();

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Documento creado correctamente!',
      showConfirmButton: false,
      timer: 1500
    })

    //graficando
    contenedorCarpetas.innerHTML = "";
    contenedorCarpetas.innerHTML = (arbolCarpetas.getHTML(rutaActual));
  }

});

function base64(file) {
  const lector = new FileReader();

  lector.onload = function (evento) {
    const contenido = evento.target.result;
    const base64 = btoa(contenido);
    console.log(base64);
  };

  lector.readAsBinaryString(file);
}


/*actualizar datos al cargar la pagina*/
window.onload = inicioPagina;