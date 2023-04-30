
import { Estudiante } from "./estudiante.js";
import { ArbolAVL } from "./arbol-avl.js";
import { HashTable } from "./tabla-hash.js";

const botonCargaMasiva = document.getElementById("carga-masiva-btn");
const botonMostrarAlumnos = document.getElementById("mostrar-alumnos-btn");
const botonGraficar = document.getElementById("graficar-btn");
const botonTrasladar = document.getElementById("trasladar-btn");
const botonPermisos = document.getElementById("permisos-btn")
const botonInOrden = document.getElementById("radio-in");
const botonPreOrden = document.getElementById("radio-pre");
const botonPostOrden = document.getElementById("radio-post");
const botonTablaOrden = document.getElementById("radio-tabla");
const botonSalir = document.getElementById("bnt-logout");
const inputCargaMasiva = document.getElementById("input-carga-masiva");

let arbol_estudiantes = new ArbolAVL();
let arreglo_estudiantes = [];
let tabla = new HashTable();
let estudiantesInOrden;

//insertando alumnos
botonCargaMasiva.addEventListener("click", function () {
    inputCargaMasiva.click();
})

//carga de alumnos a LS 
inputCargaMasiva.addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        const contents = event.target.result;
        try {
            //vaciando el arreglo de estudiantes
            arreglo_estudiantes = [];

            const jsonData = JSON.parse(contents);
            jsonData.alumnos.forEach(function (alumno) {
                let nuevoEstudiante = new Estudiante(alumno.carnet, alumno.nombre, alumno.password, null, null, null);
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
            localStorage.setItem("arregloEstudiantes", JSON.stringify(arreglo_estudiantes));
        } catch (error) {
            console.error("Error al analizar el archivo JSON", error);
        }
    };
    reader.readAsText(file);
});

//mostrando alumnos
botonMostrarAlumnos.addEventListener("click", function () {

    if (localStorage.getItem('arbolEstudiantesLS')) {
        //obteniendo los alumnos desde el LS
        let temp = localStorage.getItem('arbolEstudiantesLS');
        arbol_estudiantes.raiz = JSON.parse(temp).raiz;

        //graficando en la tabla
        const tablaEstudiantes = document.getElementById('tabla-estudiantes').querySelector('tbody');
        tablaEstudiantes.innerHTML = arbol_estudiantes.inOrder();
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No existen alumnos en el sistema.',
        })
    }
});

//graficar
botonGraficar.addEventListener("click", function () {

    if (localStorage.getItem('arbolEstudiantesLS')) {
        //recuperando datos desde el lS
        let temp = localStorage.getItem('arbolEstudiantesLS');
        arbol_estudiantes.raiz = JSON.parse(temp).raiz;

        const contenedorImagen = document.getElementById("container-arbol-img");
        let url = 'https://quickchart.io/graphviz?graph=';
        let body = `digraph G{node [shape=box]${arbol_estudiantes.graficar()} }`;
        console.log(body);
        contenedorImagen.setAttribute("src", url + body);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No existen alumnos en el sistema.',
        })
    }
})

botonTrasladar.addEventListener("click", function () {
    estudiantesInOrden = arbol_estudiantes.inOrderToArray();

    //recorriendo arreglo de estudiantes

    try {
        for (let index = 0; index < estudiantesInOrden.length; index++) {
            let carnet = estudiantesInOrden[index].carnet;
            let nombre = estudiantesInOrden[index].nombre;
            let password = estudiantesInOrden[index].password;
            tabla.insert(carnet, nombre, password);
        }

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Traslado realizado con éxito!',
            showConfirmButton: false,
            timer: 1500
        })

    } catch (error) {
        console.error("Error al traladar los datos, error");
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Algo salió mal. Intentalo nuevamente.',
        })
    }


})

botonPermisos.addEventListener("click", function () {
    if (localStorage.getItem('permisosSistema')) {
        let fila = "";
        const tablaPermisos = document.getElementById('tabla-permisos').querySelector('tbody');
        let permisosSistema = JSON.parse(localStorage.getItem("permisosSistema"));

        for (let i = 0; i < permisosSistema.length; i++) {
            fila += `
                <tr>
                    <th>${permisosSistema[i].propietario}</th>
                    <td>${permisosSistema[i].destino}</td>
                    <td>${permisosSistema[i].ubicacion}</td>
                    <td>${permisosSistema[i].archivo}</td>
                    <td>${permisosSistema[i].permisos}</td>
                </tr>
                `;
        }
        tablaPermisos.innerHTML = fila;
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Aún no se han otorgado permisos en el sistema.',
        })
    }
})

//métodos para cambiar el recorrido y la tabla
botonInOrden.addEventListener("change", function () {
    if (this.checked) {
        const tablaEstudiantes = document.getElementById('tabla-estudiantes').querySelector('tbody');
        tablaEstudiantes.innerHTML = arbol_estudiantes.inOrder();
    }
});

botonPreOrden.addEventListener("change", function () {
    if (this.checked) {
        const tablaEstudiantes = document.getElementById('tabla-estudiantes').querySelector('tbody');
        tablaEstudiantes.innerHTML = arbol_estudiantes.preOrder();
    }
});

botonPostOrden.addEventListener("change", function () {
    if (this.checked) {
        const tablaEstudiantes = document.getElementById('tabla-estudiantes').querySelector('tbody');
        tablaEstudiantes.innerHTML = arbol_estudiantes.postOrder();
    }
});

botonTablaOrden.addEventListener("change", function () {
    try {
        if (this.checked) {
            let fila = "";
            const tablaEstudiantes = document.getElementById('tabla-estudiantes').querySelector('tbody');

            for (let i = 0; i < tabla.table.length; i++) {
                if (tabla.table[i] == null || tabla.table[i] == undefined) {
                    continue;
                } else {
                    fila += `
                        <tr>
                            <th>${tabla.table[i].carnet}</th>
                            <td>${tabla.table[i].nombre}</td>
                            <td>${tabla.table[i].password}</td>
                        </tr>
                        `;
                }
            }

            tablaEstudiantes.innerHTML = fila;
        }
    } catch (error) {
        console.error("Error al mostrar los datos, error");
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Algo salió mal. Intentalo nuevamente.',
        })
    }
})

//log out 

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

/*function encriptarPassword(passWord) {
    const algorithm = 'aes-256-cbc'; // algoritmo de cifrado
    const key = crypto.randomBytes(32); // clave de cifrado aleatoria
    const iv = crypto.randomBytes(16); // vector de inicialización aleatorio

    // Crear un objeto de cifrado con el algoritmo y la clave
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    // Actualizar el cifrado con el texto a encriptar
    let encrypted = cipher.update(passWord, 'utf8', 'hex');

    // Finalizar el cifrado
    encrypted += cipher.final('hex');
    return encrypted
}*/










