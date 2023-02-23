package JSON

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"modulo/Lista"
)

type Alumno struct {
    Nombre       string `json:"nombre"`
    Carnet       int    `json:"carnet"`
    Password     string `json:"password"`
    Carpeta_Raiz string `json:"Carpeta_Raiz"`
}

func Generar_JSON(lista *Lista.Lista_Enlazada, archivo string) {
	Lista.Ordenar(lista)
	temp := lista.Primero
	var alumnos []Alumno

	for temp != nil {
        alumno := Alumno{
            Nombre:       temp.Estudiante.Nombre,
            Carnet:       temp.Estudiante.Carnet,
            Password:     temp.Estudiante.Password,
            Carpeta_Raiz: "/",
        }
        alumnos = append(alumnos, alumno)
        temp = temp.Siguiente
    }

	alumnosJSON, err := json.MarshalIndent(alumnos, "", "  ")
    if err != nil {
        fmt.Println("Error al generar el JSON:", err)
        return
    }

	err = ioutil.WriteFile(archivo, alumnosJSON, 0644)
	if err != nil {
		fmt.Println("Error al escribir el archivo:", err)
		return
	}
}