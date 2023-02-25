package Funciones

import (
	"fmt"
	"modulo/Lista"
	"modulo/Persona"
	"modulo/Pila"
)

func Menu_Estudiante(estudiante *Persona.Estudiante) {

	var (
		opcion int
		exit   bool
	)

	for !exit {
		fmt.Println("*** Bienvenido ",estudiante.Nombre," - EDD GoDrive ***")
		fmt.Println("*  1. Ver bitácora de inicios de sesión     *")
		fmt.Println("*          2. Cerrar sesión                 *")
		fmt.Println("*********************************************")
		fmt.Scanln(&opcion)

		switch opcion {
		case 1:
			Pila.Imprimir_Pila(estudiante.Logins)
		case 2:
			fmt.Println("Has cerrado sesión (Estudiante).")
			exit = true
		}
	}
}

func No_Encontrado() {

	var (
		opcion int
		exit   bool
	)

	for !exit {
		fmt.Println("**********     NO ENCONTRADO       **********")
		fmt.Println("*      1. Regresar al menú                  *")
		fmt.Println("*********************************************")
		fmt.Scanln(&opcion)

		switch opcion {
		case 1:
			exit = true
		}
	}
}

//buscando al estudiante por el metodo de busqueda binaria
func Buscar(l *Lista.Lista_Enlazada, carnet int, password string) (bool, bool, *Persona.Estudiante){
	Lista.Ordenar(l)
	temp := l.Primero

	for temp != nil {
		if temp.Estudiante.Carnet == carnet && temp.Estudiante.Password != password{
			return true, false, nil
		}else if temp.Estudiante.Carnet == carnet && temp.Estudiante.Password == password{
			return true, true, temp.Estudiante
		}
		temp = temp.Siguiente
	}
	return false, false, nil
}