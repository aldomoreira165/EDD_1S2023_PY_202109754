package Lista

import (
	"modulo/Persona"
)

type Nodo struct{
	Anterior *Nodo
	Siguiente *Nodo
	Estudiante *Persona.Estudiante
}