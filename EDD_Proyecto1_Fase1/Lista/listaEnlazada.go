package Lista

import (
	"modulo/Persona"
	"strconv"
)

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

func Grafica(lista *Lista_Enlazada) string {
	temp := lista.Primero
	nodos := ""
	conexiones := ""
	conexiones_inversas := ""
	cadena_logins := ""
	cadena_rank := ""
	cadena_rank2 := ""
	cadena_union := ""
	contador := 0

	cadena_rank2 += "{rank = same "
	for temp != nil {
		cadena_rank2 += "NODO" + strconv.Itoa(contador) + " "
		nodos += "NODO" + strconv.Itoa(contador) + "[label=\"Carnet: " + strconv.Itoa(temp.Estudiante.Carnet) + "\nNombre: " + temp.Estudiante.Nombre + "\"];\n"
		temp = temp.Siguiente
		contador += 1
	}
	cadena_rank2 += "}\n"

	//imprimiendo las conexiones
	contador = 0
	temp = lista.Primero
	for temp != nil && (contador+1)!= lista.Tamaño{
		conexiones += "NODO" + strconv.Itoa(contador) + "->" + "NODO" + (strconv.Itoa(contador + 1)) + ";\n"
		temp = temp.Siguiente
		contador += 1
	}

	contador2 := 0
	temp = lista.Ultimo
	for temp != nil && (contador2+1)!= lista.Tamaño{
		conexiones_inversas += "NODO" + strconv.Itoa(contador) + "->" + "NODO" + (strconv.Itoa(contador -1)) + ";\n"
		temp = temp.Anterior
		contador -= 1
		contador2 += 1
	}

	//agregando los login
	contador = 0
	temp = lista.Primero
	cadena_rank += "{rank=same "
	for temp != nil && (contador+1)!= lista.Tamaño{
		if temp.Estudiante.Logins.Tamaño > 0 {
			contador_logins := 0
			pila_logins := temp.Estudiante.Logins
			temp2 := pila_logins.Primero
			cadena_union += "NODO" + strconv.Itoa(contador) + "->"
			cadena_rank += "Estudiante"+strconv.Itoa(contador)+"_N0 "
			for temp2 != nil{

				if temp2.Siguiente == nil{
					cadena_union += "Estudiante"+strconv.Itoa(contador)+"_N"+strconv.Itoa(contador_logins)
				}else{
					cadena_union += "Estudiante"+strconv.Itoa(contador)+"_N"+strconv.Itoa(contador_logins) +"->"
				}
				
				cadena_logins += "Estudiante"+strconv.Itoa(contador)+"_N"+strconv.Itoa(contador_logins)+
				"[label=\""+temp2.Accion.Accion+" "+temp2.Accion.Hora.Format("2006-01-02 15:04:05")+"\"];\n"
				contador_logins += 1
				temp2 = temp2.Siguiente
			}
			cadena_union += "\n"
		}
		temp = temp.Siguiente
		contador += 1
	}
	cadena_rank += "}\n"

	//creando enlaces con listas de logins


	return "digraph G {\n" +
		"label=\"Estudiantes Aceptados\"\n"+
		"node[shape=rectangle, style=filled, color=lightsalmon];\n" +
		nodos + // NODOS
		conexiones + // CONEXIONES
		conexiones_inversas + //CONEXIONES INVERSAS
		cadena_logins + //LOGINS
		cadena_rank + //RANK
		cadena_rank2 + //RANK2
		cadena_union + //UNIONES
		"\n}"

}