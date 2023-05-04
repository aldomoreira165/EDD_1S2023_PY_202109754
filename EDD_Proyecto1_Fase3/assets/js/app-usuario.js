
import { arbolMulticamino } from "./arbol-multicamino.js";
import { ArbolAVL } from "./arbol-avl.js";
import { ListaCircular } from "./lista-circular.js";
import { SparseMatrix } from "./matriz.js";
import { Permiso } from "./permiso.js";
import { Tree } from "./Tree.js";

const selectEstudiantes = document.getElementById("select-estudiantes");
const selectArchivos = document.getElementById("select-archivos");
const selectPermisos = document.getElementById("select-permisos");
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
const botonReporteMatriz = document.getElementById("btn-reporte-matriz");
const botonReporteGrafo = document.getElementById("btn-reporte-no-dirigido");
const botonRetornar = document.getElementById("boton-retornar");
const botonPermisos = document.getElementById("btn-dar-permisos");
const botonMensajes = document.getElementById("bnt-message");
const botonSalir = document.getElementById("bnt-logout");

let arbolCarpetas = new arbolMulticamino();
let listaAcciones = new ListaCircular();
let grafo = new Tree();
let matrizPermisos = null;

//función que se ejecuta al cargar la pagina
function inicioPagina() {
  let usuario = JSON.parse(localStorage.getItem("estudianteLog"));
  etiquetaNombre.innerHTML = `Bienvenido ${usuario.nombre}`

  //acá se obtienen los datos necesarios de los estudiantes (carpetas, acciones, etc) almacenados previamente

  //mostrando las carpetas del usuario recien loggeado
  if (usuario.carpeta != null) {
    let grafoLoggeado = new Tree();
    let temp2 = JSON.parse(localStorage.getItem("estudianteLog")).grafo;

    grafoLoggeado.root = temp2.root;

    grafo.root = temp2.root;

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

  //actualizando acordeon de alumnos
  actualizarSelectAlumnos();

  //actualizando acordeon de archivos
  actualizarSelectArchivos();

  //actualizando compartidos
  actualizarTablaCompartidos();
}

function otorgarPermiso(carnet, permiso) {
  let arbol = new ArbolAVL();
  let temp = localStorage.getItem('arbolEstudiantesLS');

  arbol.raiz = JSON.parse(temp).raiz;
  arbol.darPermisos(carnet, permiso);
  localStorage.setItem('arbolEstudiantesLS', JSON.stringify(arbol));
}

function actualizarTablaCompartidos() {
  let fila = "";
  const tablaCompartidos = document.getElementById('tabla-compartidos').querySelector('tbody');
  let compartidosConmigo = JSON.parse(localStorage.getItem("estudianteLog")).compartidos;

  for (let i = 0; i < compartidosConmigo.length; i++) {
    fila += `
                <tr>
                    <th>${compartidosConmigo[i].propietario}</th>
                    <td>${compartidosConmigo[i].archivo}</td>
                    <td>${compartidosConmigo[i].permisos}</td>
                </tr>
                `;
  }
  tablaCompartidos.innerHTML = fila;
}

function actualizarSelectAlumnos() {
  let contador = 1;
  //agregando los estudiantes
  let arregloEstudiantes = JSON.parse(localStorage.getItem("arregloEstudiantes"));

  arregloEstudiantes.forEach(estudiante => {
    let opcion = document.createElement("option");
    //estableciendo el valor y el texto de la opción
    opcion.value = contador;
    opcion.text = estudiante.carnet;
    //agregando la opción al select
    selectEstudiantes.appendChild(opcion);
    contador += 1;
  });
}

function actualizarSelectArchivos() {
  //agregando los archivos
  let contadorArchivos = 1;
  let archivos = arbolCarpetas.getFolder(barraRuta.value).documents;

  //limpiando el select
  selectArchivos.innerHTML = "";

  let opcion = document.createElement("option");
  opcion.innerHTML = "Archivos";

  selectArchivos.appendChild(opcion);

  //asignando el elemento seleccionado por defecto
  selectArchivos.options[0].selected = true;

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

botonReporteGrafo.addEventListener("click", function () {
  const contenedorImagen = document.getElementById("container-grafo-img");
  let url = 'https://quickchart.io/graphviz?graph=';
  let body = `digraph G{${grafo.graph()} }`;
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
  inputCrearCarpeta.value = "";
});

//funcion para eliminar archivo
botonEliminarArchivo.addEventListener("click", function () {
  let nombreEliminar = "";
  nombreEliminar = inputEliminarArchivo.value;
  let valorRuta = barraRuta.value;
  eliminarArchivo(nombreEliminar, valorRuta);
  inputEliminarArchivo.value = "";
});

function eliminarArchivo(nombre, rutaActual) {
  let indice = arbolCarpetas.getFolder(rutaActual).documents.findIndex(obj => obj.name == nombre);
  if (indice != -1) {
    // Eliminar el valor del array 

    const newArray = arbolCarpetas.getFolder(rutaActual).documents.filter((obj, i) => {
      return i !== indice;
    });

    arbolCarpetas.getFolder(rutaActual).documents = newArray;

    //actualizando las carpetas
    actualizarCarpetas();

    //insertando la acción en la lista
    let accion = `Acción: Se eliminó archivo: ${nombre}\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
    listaAcciones.insertar(accion);

    //actualizando las acciones
    actualizarAcciones();

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Archivo eliminado exitosamente!',
      showConfirmButton: false,
      timer: 1500
    })

    contenedorCarpetas.innerHTML = "";
    contenedorCarpetas.innerHTML = (arbolCarpetas.getHTML(rutaActual))

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
  inputEliminarCarpeta.value = "";
})

function eliminarCarpeta(nombreCarpeta, ruta) {
  //obteniendo el arbol de carpetas del localstorage
  arbolCarpetas.delete(nombreCarpeta, ruta);

  //eliminando carpeta del grafo
  grafo.delete(nombreCarpeta, ruta);

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
  actualizarSelectArchivos();
  matrizPermisos = null;
}

//funcion para retornar al inicio 

botonRetornar.addEventListener("click", function () {
  barraRuta.value = "/";
  contenedorCarpetas.innerHTML = "";
  contenedorCarpetas.innerHTML = (arbolCarpetas.getHTML("/"))
  actualizarBotonesCarpetas();
  actualizarSelectArchivos();
})

//funcion para crear carpetas

function crearCarpeta(nombreCarpeta, ruta) {
  //obteniendo el arbol de carpetas del localstorage
  arbolCarpetas.insert(nombreCarpeta, ruta);

  //insertando al grafo
  grafo.insert(nombreCarpeta, ruta);

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
  arbol.modificarGrafo(usuario.carnet, grafo)

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

      //insertando la acción en la lista
      let accion = `Acción: Se creó el documento: ${nombreCopia}\\n Fecha:${(new Date()).toLocaleDateString()}\\n Hora:${(new Date()).toLocaleTimeString()}\\n`;
      listaAcciones.insertar(accion);

      //actualizando las acciones
      actualizarAcciones();

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

const base64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});


botonPermisos.addEventListener("click", function () {
  let usuario = JSON.parse(localStorage.getItem("estudianteLog"));

  let propietario = usuario.carnet;
  let destino = (selectEstudiantes.options[selectEstudiantes.selectedIndex]).text;
  let ubicacion = barraRuta.value;
  let archivo = (selectArchivos.options[selectArchivos.selectedIndex]).text;
  let permisos = (selectPermisos.options[selectPermisos.selectedIndex]).text;

  //agregando la asignacion de permisos en todo el sistema
  if (localStorage.getItem('permisosSistema')) {
    let permisosSistema = JSON.parse(localStorage.getItem("permisosSistema"));
    let permisosArreglo = permisosSistema;
    let permisoNuevo = new Permiso(propietario, destino, ubicacion, archivo, permisos);
    permisosArreglo.push(permisoNuevo);
    localStorage.setItem('permisosSistema', JSON.stringify(permisosArreglo));

    //alerta
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Permisos otorgado exitosamente!',
      showConfirmButton: false,
      timer: 1500
    })

  } else {
    let permisosArreglo = [];
    let permisoNuevo = new Permiso(propietario, destino, ubicacion, archivo, permisos);
    permisosArreglo.push(permisoNuevo);
    localStorage.setItem('permisosSistema', JSON.stringify(permisosArreglo));

    //alerta
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Permiso otorgado exitosamente!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  //agregando la asignacion de permisos unicamente para el usuario
  otorgarPermiso(destino, new Permiso(propietario, destino, ubicacion, archivo, permisos));

});

botonReporteMatriz.addEventListener("click", function () {
  if (matrizPermisos != null) {
    const contenedorImagen = document.getElementById("container-matriz-img");
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G{${matrizPermisos.graph()} }`;
    contenedorImagen.setAttribute("src", url + body);
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No hay una matriz existente.',
    })
  }

});

botonMensajes.addEventListener("click", function(){
  window.location.href = "./mensajes.html";
})


/*actualizar datos al cargar la pagina*/
window.onload = inicioPagina;