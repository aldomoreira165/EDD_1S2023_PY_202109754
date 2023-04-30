import { Estudiante } from "./estudiante.js";
import { ArbolAVL } from "./arbol-avl.js";

const botonIniciar = document.querySelector('form');

botonIniciar.addEventListener('submit', function (event) {
    event.preventDefault();

    let campoCarnet = document.querySelector('#carnet').value;
    let campoPassword = document.querySelector('#password').value;

    if (campoCarnet == "Admin" && campoPassword == "Admin") {
        window.location.href = "./EDD_Proyecto1_Fase3/ventana-admin.html";
    } else {
        let arbol = new ArbolAVL();

        let temp = localStorage.getItem('arbolEstudiantesLS');
        arbol.raiz = JSON.parse(temp).raiz;

        let buscandoEstudiante =  arbol.buscarEstudiante(campoCarnet);

        if (buscandoEstudiante != null){
            let estudianteLoggeado = new Estudiante(buscandoEstudiante.estudiante.carnet,buscandoEstudiante.estudiante.nombre, buscandoEstudiante.estudiante.password, buscandoEstudiante.estudiante.carpeta, buscandoEstudiante.estudiante.acciones)
            if(campoPassword == estudianteLoggeado.password){
                localStorage.setItem('estudianteLog', JSON.stringify(estudianteLoggeado));
                window.location.href = "./EDD_Proyecto1_Fase3/ventana-usuario.html";
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Contraseña incorrecta. Verificala y vuelve a intentar.',
                })  
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Datos incorrectos. Verificalos y vuelve a intentar.',
            })
        }
    }
});