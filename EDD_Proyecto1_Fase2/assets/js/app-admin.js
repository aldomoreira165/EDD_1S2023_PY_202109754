
import { Estudiante } from "./estudiante.js";
import { ArbolAVL } from "./arbol-avl.js";

const botonCargaMasiva = document.getElementById("carga-masiva-btn");
const botonMostrarAlumnos = document.getElementById("mostrar-alumnos-btn");
const botonGraficar = document.getElementById("graficar-btn");
const botonInOrden = document.getElementById("radio-in");
const botonPreOrden = document.getElementById("radio-pre");
const botonPostOrden = document.getElementById("radio-post");
const botonSalir = document.getElementById("bnt-logout");
const inputCargaMasiva = document.getElementById("input-carga-masiva");
const cuerpoTablaEstudiantes = document.getElementById("cuerpo-tabla-estudiantes");

let arbol_estudiantes = new ArbolAVL();
let arreglo_estudiantes = [];
let cambios_alumnos = false;

//insertando alumnos
botonCargaMasiva.addEventListener("click", function(){
    inputCargaMasiva.click();
})

//carga de alumnos a LS 
inputCargaMasiva.addEventListener("change", function(){
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function(event){
        const contents = event.target.result;
        try {
            //vaciando el arreglo de estudiantes
            arreglo_estudiantes = [];
            cambios_alumnos = true;

            const jsonData = JSON.parse(contents);
            jsonData.alumnos.forEach(function(alumno){
                let nuevoEstudiante = new Estudiante(alumno.carnet, alumno.nombre, alumno.password);
                arbol_estudiantes.insertar(nuevoEstudiante);
                arreglo_estudiantes.push(nuevoEstudiante);
            });

            //notificando que la carga se realizó con éxito
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: '¡Carga de alumnos realizada con éxito!',
                showConfirmButton: false,
                timer: 1500
              })

            //agregando el arbol nuevamente al local storage
            localStorage.setItem("arbolEstudiantesLS", JSON.stringify(arbol_estudiantes))
        } catch (error) {
            console.error("Error al analizar el archivo JSON", error);
        }
    };
    reader.readAsText(file);
});

//mostrando alumnos
botonMostrarAlumnos.addEventListener("click", function(){

    if(cambios_alumnos == false){
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No has cargado nuevos alumnos.',
          })
    }else{
        arreglo_estudiantes.forEach(est => {
            const fila = document.createElement("tr");
            fila.innerHTML += `
                    <td>${est.carnet}</td>
                    <td>${est.nombre}</td>
                    <td>${est.password}</td>
                `;
            cuerpoTablaEstudiantes.append(fila);
        })
        cambios_alumnos = false;
    }
});

//graficar
botonGraficar.addEventListener("click", function(){
    const contenedorImagen = document.getElementById("container-arbol-img");
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G{${arbol_estudiantes.graficar()} }`;
    console.log(body);
    contenedorImagen.setAttribute("src",url + body);
    //$("#img-in-orden").attr("src", url + body);
})

//métodos para cambiar el recorrido y la tabla

botonInOrden.addEventListener("change", function(){
    if(this.checked){
        const tablaEstudiantes = document.getElementById('tabla-estudiantes').querySelector('tbody');
        tablaEstudiantes.innerHTML = arbol_estudiantes.inOrder(); 
    }
});

botonPreOrden.addEventListener("change", function(){
    if(this.checked){
        const tablaEstudiantes = document.getElementById('tabla-estudiantes').querySelector('tbody');
        tablaEstudiantes.innerHTML = arbol_estudiantes.preOrder(); 
    }
});

botonPostOrden.addEventListener("change", function(){
    if(this.checked){
        const tablaEstudiantes = document.getElementById('tabla-estudiantes').querySelector('tbody');
        tablaEstudiantes.innerHTML = arbol_estudiantes.postOrder(); 
    }
});

//log out 

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

document.getElementById("aux-btn").addEventListener("click", function(){
    /*//obteniendo el arbol avl, JSON.parse devuelve un obtejo de tipo ArbolAVL, lo de adentro devuelve un JSON
    let info = localStorage.getItem("arbolEstudiantesLS");
    let dataPersistence = JSON.parse(info);
    console.log("***********data***********")
    console.log(dataPersistence); 
    console.log("**************************")
    //manipulando la info
    //insetando nuevo alumno
    let nuevoEstudiante = new Estudiante(202109754, "Aldo Moreira", "hola123");
    dataPersistence = dataPersistence.insertar(nuevoEstudiante);

    //conviertiendo  el arbol actualizado en una cadena de texto JSON y luego se almacena en LS
    let arbolActualzado = JSON.stringify(dataPersistence);
    localStorage.setItem("arbolEstudiantesLS", arbolActualzado);*/
})









