package Pila

import (
	"modulo/Accion"
)

type Nodo struct{
	Siguiente *Nodo
	Accion *Accion.Accion
}