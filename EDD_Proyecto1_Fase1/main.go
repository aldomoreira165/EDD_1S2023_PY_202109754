package main

import (
	"fmt"
	"modulo/Funciones"
	"modulo/Cola"
)

func main() {

	cola_estudiantes_pendientes := Cola.Nueva_Cola()

	var (
		//usuario string
		//password string
		exit bool
	)

	opcion := 0

	for !exit {
		fmt.Println("**************** EDD GoDrive ****************")
		fmt.Println("*             1. Iniciar Sesión             *")
		fmt.Println("*            2. Salir del Sistema           *")
		fmt.Println("*********************************************")
		fmt.Scanln(&opcion)

		switch opcion{
		case 1:
			/*fmt.Print("Ingresa tu usuario: ")
			fmt.Scan(&usuario)
			fmt.Print("Ingrese tu password ")
			fmt.Scan(&password)*/
			Funciones.Menu_Administrador(cola_estudiantes_pendientes)
		case 2:
			fmt.Println("Has salido del sistema.")
			exit = true
		}
	}
}
