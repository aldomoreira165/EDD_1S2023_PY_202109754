package Estructuras

import (
	"fmt"
	"modulo/Persona"
)

type Nodo struct{
	Siguiente *Nodo
	Estudiante *Persona.Estudiante
}

type Cola struct{
	Primero *Nodo
	Tamaño int
}

func Nueva_Cola () *Cola{
	return &Cola{nil, 0}
}

func Insertar_Cola(estudiante *Persona.Estudiante, cola *Cola){
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
	}
}

func Imprimir_Cola(cola *Cola){
	temp := cola.Primero
	for temp != nil{
		fmt.Println("Estudiante: ", temp.Estudiante.Nombre)
		temp = temp.Siguiente
	}
}











