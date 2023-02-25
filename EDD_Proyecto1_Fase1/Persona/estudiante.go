package Persona

import (
	"modulo/Pila"
)

type Estudiante struct{
	Nombre string
	Carnet int
	Password string
	Logins *Pila.Pila
}

func Nuevo_Estudiante(nombre string, carnet int, password string) *Estudiante{
	return &Estudiante{nombre, carnet, password, nil}
}

func Pila_Logins(estudiante *Estudiante){
	estudiante.Logins = Pila.Nueva_Pila()
}