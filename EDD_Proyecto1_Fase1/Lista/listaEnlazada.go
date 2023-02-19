package Lista

import "modulo/Persona"

type Lista_Enlazada struct {
	Primero *Nodo
	Ultimo  *Nodo
	Tamaño  int
}

func Nueva_Lista () *Lista_Enlazada{
	return &Lista_Enlazada{nil, nil, 0}
}

func Insertar_Final(estudiante *Persona.Estudiante, lista *Lista_Enlazada) {
	var nuevoEstudianteAceptado *Nodo = &Nodo{nil, nil, estudiante}
	//verificar que la lista este vacía
	if lista.Primero == nil{
		lista.Primero = nuevoEstudianteAceptado
		lista.Ultimo = nuevoEstudianteAceptado
		lista.Tamaño += 1
	}else{
		lista.Ultimo.Siguiente = nuevoEstudianteAceptado
		nuevoEstudianteAceptado.Anterior = lista.Ultimo
		lista.Ultimo = nuevoEstudianteAceptado
		lista.Tamaño += 1
	}
}

