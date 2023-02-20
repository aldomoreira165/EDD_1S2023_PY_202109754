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

//ordenando lista de menor a mayor por el método de quicksort
func Ordenar(lista *Lista_Enlazada){
	tamaño_lista := lista.Tamaño 
	if tamaño_lista > 1{
		for i := 0; i < tamaño_lista-1; i++{
			act := lista.Primero
			next := act.Siguiente
			for j := 0; j<tamaño_lista-i-1; j++{
				if act.Estudiante.Carnet > next.Estudiante.Carnet{
					temp := act.Estudiante
					act.Estudiante = next.Estudiante
					next.Estudiante = temp
				}
				act = next
				next = act.Siguiente
			}
		}
	}
}
