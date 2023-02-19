package Cola

import (
	"fmt"
	"modulo/Persona"
)

type Cola struct{
	Primero *Nodo
	Tamaño int
}

func Nueva_Cola () *Cola{
	return &Cola{nil, 0}
}

func Agregar_Estudiante(estudiante *Persona.Estudiante, cola *Cola){
	var nuevoEstudiante *Nodo = &Nodo{nil, estudiante}
	//verificando si la cola está vacía o no
	if cola.Primero == nil{
		cola.Primero = nuevoEstudiante
		cola.Tamaño += 1
	}else{
		//recorriendo la cola hasta encontrar el último nodo
		temp := cola.Primero
		for temp.Siguiente != nil {
			temp = temp.Siguiente
		}
		//Agregar el nuevo nodo hasta el final
		temp.Siguiente = nuevoEstudiante
		cola.Tamaño += 1
	}
}

func Obtener_Tamaño(cola *Cola){
	fmt.Println(cola.Tamaño)
}

func Sacar_Estudiante(cola *Cola) *Nodo{
	//sacando el primer elemento de la lista
	estudiante_fuera := cola.Primero

	//reordenando la lista 
	cola.Primero = cola.Primero.Siguiente
	cola.Tamaño -= 1

	return estudiante_fuera
}










