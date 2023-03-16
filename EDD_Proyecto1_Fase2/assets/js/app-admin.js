
const botonCargaMasiva = document.getElementById("carga-masiva-btn");
const inputCargaMasiva = document.getElementById("input-carga-masiva");
const cuerpoTablaEstudiantes = document.getElementById("cuerpo-tabla-estudiantes");
var estudiantesAceptados = [];

//carga masiva

botonCargaMasiva.addEventListener("click", function(){
    inputCargaMasiva.click();
})

inputCargaMasiva.addEventListener("change", function(){
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function(event){
        const contents = event.target.result;
        const jsonData = JSON.parse(contents)
        //pruebas para mostrar estudiantes en la tabla
        let numeroFila = 1;
        jsonData.forEach(function(obj){
            const fila = document.createElement("tr");
            fila.innerHTML += `
                <th scope="row">${numeroFila}</th>
                <th>${obj.carnet}</th>
                <th>${obj.nombre}</th>
            `;
        cuerpoTablaEstudiantes.append(fila);
        numeroFila += 1;
        });
    };
    reader.readAsText(file);
})