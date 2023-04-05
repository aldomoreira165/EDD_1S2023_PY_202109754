
import { arbolMulticamino } from "./arbol-multicamino.js";
import { ArbolAVL } from "./arbol-avl.js";
import { ListaCircular } from "./lista-circular.js";

const selectEstudiantes = document.getElementById("select-estudiantes");
const selectArchivos = document.getElementById("select-archivos");
const contenedorCarpetas = document.getElementById("carpetas-container");
const etiquetaNombre = document.getElementById("saludo-usuario");
const barraRuta = document.getElementById("input-busqueda");
const inputSubirArchivo = document.getElementById("input-subir-archivo");
const botonSubirArchivo = document.getElementById("container-logo-subir-archivo");
const botonEliminarArchivo = document.getElementById("btn-eliminar-archivo");
const inputEliminarArchivo = document.getElementById("input-eliminar-archivo");
const botonCrearCarpeta = document.getElementById("btn-crear-carpeta");
const inputCrearCarpeta = document.getElementById("input-crear-carpeta");
const botonEliminarCarpeta = document.getElementById("btn-eliminar-carpeta");
const inputEliminarCarpeta = document.getElementById("input-eliminar-carpeta");
const botonReporteCarpetas = document.getElementById("btn-reporte-carpetas");
const botonReporteAcciones = document.getElementById("btn-reporte-acciones");
const botonRetornar = document.getElementById("boton-retornar");
const botonAcordeon = document.getElementById("boton-acordeon");
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

  //actualizando acordeon de permisos
  actualizarAcordeon();
}

function actualizarAcordeon() {
  let contador = 1;
  //agregando los estudiantes
  let arregloEstudiantes = JSON.parse(localStorage.getItem("arregloEstudiantes"));

  arregloEstudiantes.forEach(estudiante => {
    let opcion = document.createElement("option");
    //estableciendo el valor y el texto de la opción
    opcion.value = contador;
    opcion.text = estudiante.nombre;
    //agregando la opción al select
    selectEstudiantes.appendChild(opcion);
    contador += 1;
  });

  //agregando los archivos
  let contadorArchivos = 1;
  let archivos = arbolCarpetas.getFolder(barraRuta.value).documents;

  archivos.forEach(archivo => {
    let opcion = document.createElement("option");
    //estableciendo el valor y el texto de la opción
    opcion.value = contadorArchivos;
    opcion.text = archivo.name;
    //agregando la opción al select
    selectArchivos.appendChild(opcion);
    contadorArchivos += 1;
  });
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
  nombreCarpeta = inputCrearCarpeta.value;
  let valorRuta = barraRuta.value;
  crearCarpeta(nombreCarpeta, valorRuta);
});

//funcion para eliminar archivo
botonEliminarArchivo.addEventListener("click", function () {
  let nombreEliminar = "";
  nombreEliminar = inputEliminarArchivo.value;
  let valorRuta = barraRuta.value;
  eliminarArchivo(nombreEliminar, valorRuta);
});

function eliminarArchivo(nombre, rutaActual) {
  let indice = arbolCarpetas.getFolder(rutaActual).documents.indexOf(nombre);
  if (indice != -1) {
    // Eliminar el valor del array utilizando splice()
    arbolCarpetas.getFolder(rutaActual).documents.splice(indice, 1);
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Archivo eliminado exitosamente!',
      showConfirmButton: false,
      timer: 1500
    })
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se ha encontrado el archivo.',
    })
  }
};

//funcion para eliminar carpetas
botonEliminarCarpeta.addEventListener("click", function () {
  let nombreCarpeta = "";
  nombreCarpeta = inputEliminarCarpeta.value;
  let valorRuta = barraRuta.value;
  eliminarCarpeta(nombreCarpeta, valorRuta);
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
  actualizarAcordeon();
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

inputSubirArchivo.addEventListener("change", async function () {
  let rutaActual = barraRuta.value;
  let nombreCopia = "";

  const archivo = this.files[0];

  //verificando si ya existe el archivo
  const existeArchivo = arbolCarpetas.getFolder(rutaActual).documents.find(doc => doc.name === archivo.name);

  if (existeArchivo) {
    let contador = 0;

    for (let i = 0; i < arbolCarpetas.getFolder(rutaActual).documents.length; i++) {
      const indice = arbolCarpetas.getFolder(rutaActual).documents[i].name.indexOf("("); // buscamos el índice del primer paréntesis
      const nombreSinCopia = indice !== -1 ? arbolCarpetas.getFolder(rutaActual).documents[i].name.substring(0, indice) : arbolCarpetas.getFolder(rutaActual).documents[i].name;
      if (nombreSinCopia == archivo.name) {
        contador++;
      }
    };

    let extension = (archivo.name.split("."))[1];
    let nombreArchivo = (archivo.name.split("."))[0];
    nombreCopia = `${nombreArchivo}(copia${contador}).${extension}`;
  } else {
    nombreCopia = archivo.name;
  }

  if (archivo.type == "text/plain") {
    let fr = new FileReader();
    fr.readAsText(archivo);
    fr.onload = () => {
      arbolCarpetas.getFolder(rutaActual).documents.push({
        name: nombreCopia,
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
    let parseBase64 = await base64(archivo);
    arbolCarpetas.getFolder(rutaActual).documents.push({
      name: nombreCopia,
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

    //insertando la acción en la lista
    let accion = `Acción: Se creó el documento: ${nombreCopia}\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
    listaAcciones.insertar(accion);

    //actualizando las acciones
    actualizarAcciones();

    //graficando
    contenedorCarpetas.innerHTML = "";
    contenedorCarpetas.innerHTML = (arbolCarpetas.getHTML(rutaActual));
  }

});

function base64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const contenido = reader.result;
      const base64 = btoa(contenido);
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsBinaryString(file);
  });
}


/*actualizar datos al cargar la pagina*/
window.onload = inicioPagina;