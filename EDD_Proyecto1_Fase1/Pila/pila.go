package Pila

import (
	"fmt"
	"modulo/Accion"
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