
import { Estudiante } from "./estudiante.js";
import { ArbolAVL } from "./arbol-avl.js";

const botonCargaMasiva = document.getElementById("carga-masiva-btn");
const botonMostrarAlumnos = document.getElementById("mostrar-alumnos-btn");
const botonGraficar = document.getElementById("boton-graficar");
const inputCargaMasiva = document.getElementById("input-carga-masiva");
const cuerpoTablaEstudiantes = document.getElementById("cuerpo-tabla-estudiantes");

let arbol_estudiantes = new ArbolAVL();
let arreglo_estudiantes = [];
let cambios_alumnos = false;

//agregando el arbol de estudiantes al local storage

//insertando alumnos
botonCargaMasiva.addEventListener("click", function(){
    inputCargaMasiva.click();
})

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
                let nuevoEstudiante = new Estudiante(alumno.carnet, alumno.nombre, alumno.contraseña);
                arbol_estudiantes.insertar(nuevoEstudiante);
                arreglo_estudiantes.push(nuevoEstudiante);
            });

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
        let numeroFila = 1;
        arreglo_estudiantes.forEach(est => {
            const fila = document.createElement("tr");
            fila.innerHTML += `
                    <th scope="row">${numeroFila}</th>
                    <th>${est.carnet}</th>
                    <th>${est.nombre}</th>
                `;
            cuerpoTablaEstudiantes.append(fila);
            numeroFila += 1;
        })
        cambios_alumnos = false;
    }
});

//graficar
botonGraficar.addEventListener("click", function(){
    const img1 = document.getElementById("img-in-orden");
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G{ \nlabel = "Recorrido In-Orden";\n ${arbol_estudiantes.graficarInOrden()} }`;
    console.log(body);
    img1.setAttribute("src",url + body);
    //$("#img-in-orden").attr("src", url + body);
})







