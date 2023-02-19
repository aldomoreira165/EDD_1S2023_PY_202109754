package Cola

import (
	"modulo/Persona"
)

type Nodo struct{
	Siguiente *Nodo
	Estudiante *Persona.Estudiante
}