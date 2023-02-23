package Pila

import (
	"fmt"
	"modulo/Accion"
	"strconv"
	"time"
)

type Pila struct{
	Primero *Nodo
	Tamaño int
}

func Nueva_Pila () *Pila{
	return &Pila{nil, 0}
}

func Agregar_Pila(accion string, hora time.Time, pila *Pila){
	nueva_accion := &Accion.Accion{Accion: accion, Hora:hora}
	nuevo_nodo := &Nodo{nil, nueva_accion}

	if pila.Primero == nil{
		pila.Primero = nuevo_nodo
		pila.Tamaño += 1
	}else{
		temp := pila.Primero
		pila.Primero = nuevo_nodo
		nuevo_nodo.Siguiente = temp
		pila.Tamaño += 1
	}
}

func Imprimir_Pila(pila *Pila){
	temp := pila.Primero
	
	for temp != nil {
		fmt.Println(temp.Accion.Accion, temp.Accion.Hora)
		temp = temp.Siguiente
	}
}

func Grafica(pila *Pila) string {
	temp := pila.Primero
	nodos := ""
	conexiones := ""
	contador := 0

	for temp != nil {
		nodos += "NODO" + strconv.Itoa(contador) + "[label=\"Acción: " + temp.Accion.Accion + "\nHora: " + (temp.Accion.Hora).Format("2006-01-02 15:04:05") + "\"];\n"
		temp = temp.Siguiente
		contador += 1
	}

	contador = 0
	temp = pila.Primero
	for temp != nil && (contador+1)!= pila.Tamaño{
		conexiones += "NODO" + strconv.Itoa(contador) + "->" + "NODO" + (strconv.Itoa(contador + 1)) + ";\n"
		temp = temp.Siguiente
		contador += 1
	}

	return "digraph G {\n" +
		"label=\"Acciones de Administrador\"\n"+
		"node[shape=rectangle, style=filled, color=lightsalmon];\n" +
		"rankdir=LR;\n" +
		nodos + // NODOS
		conexiones + // CONEXIONES
		"\n}"

}