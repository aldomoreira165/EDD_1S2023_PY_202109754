package Cola

import (
	"fmt"
	"modulo/Persona"
	"strconv"
)

type Cola struct {
	Primero *Nodo
	Tamaño  int
}

func Nueva_Cola() *Cola {
	return &Cola{nil, 0}
}

func Agregar_Estudiante(estudiante *Persona.Estudiante, cola *Cola) {
	var nuevoEstudiante *Nodo = &Nodo{nil, estudiante}
	//verificando si la cola está vacía o no
	if cola.Primero == nil {
		cola.Primero = nuevoEstudiante
		cola.Tamaño += 1
	} else {
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

func Obtener_Tamaño(cola *Cola) {
	fmt.Println(cola.Tamaño)
}

func Sacar_Estudiante(cola *Cola) *Nodo {
	//sacando el primer elemento de la lista
	estudiante_fuera := cola.Primero

	//reordenando la lista
	cola.Primero = cola.Primero.Siguiente
	cola.Tamaño -= 1

	return estudiante_fuera
}

func Grafica(cola *Cola) string {
	temp := cola.Primero
	nodos := ""
	conexiones := ""
	contador := 0

	for temp != nil {
		nodos += "NODO" + strconv.Itoa(contador) + "[label=\"Carnet: " + strconv.Itoa(temp.Estudiante.Carnet) + "\nNombre: " + temp.Estudiante.Nombre + "\"];\n"
		temp = temp.Siguiente
		contador += 1
	}

	contador = 0
	temp = cola.Primero
	for temp != nil {
		conexiones += "NODO" + strconv.Itoa(contador) + "->" + "NODO" + (strconv.Itoa(contador + 1)) + ";\n"
		temp = temp.Siguiente
		contador += 1
	}

	return "digraph G {\n" +
		"node[shape=rectangle, style=filled, color=lightsalmon];\n" +
		"rankdir=LR;\n" +
		nodos + // NODOS
		conexiones + // CONEXIONES
		"\n}"

}
