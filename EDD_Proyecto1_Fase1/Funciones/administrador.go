package Funciones

import (
	"fmt"
	"modulo/Cola"
	"modulo/Persona"
)

func Menu_Administrador(c *Cola.Cola) {

	var (
		opcion int
		exit bool
	)

	for !exit {
		fmt.Println("*** Dashborad Administrador - EDD GoDrive ***")
		fmt.Println("*      1. Ver Estudiantes Pendientes        *")
		fmt.Println("*      2. Ver Estudiantes del Sistema       *")
		fmt.Println("*      3. Registrar Nuevo Estudiante        *")
		fmt.Println("*      4. Carga masiva de estudiantes       *")
		fmt.Println("*      5. Cerrar sesión                     *")
		fmt.Println("*********************************************")
		fmt.Scanln(&opcion)

		switch opcion {
		case 1:
			Estudiantes_Pendientes(c)
		case 2:
			fmt.Println("Has escogido la op 2")
		case 3:
			Registrar_Nuevo_Estudiante(c)
		case 4:
			fmt.Println("Has escogido la op 4")
		case 5:
			fmt.Println("Has cerrado sesión (Administador).")
			exit = true
		}
	}
}

func Estudiantes_Pendientes(c *Cola.Cola){
	Cola.Imprimir_Cola(c)
}

func Registrar_Nuevo_Estudiante(c *Cola.Cola) {
	var nombre_estudiante string
	var apellido_estudiante string
	var carnet_estudiante int
	var password_estudiante string
	
	//obteniendo datos de estudiante
	fmt.Println("***** Registro de Estudiantes - EDD GoDrive *****")
	fmt.Print("Ingresa nombre: ")
	fmt.Scanln(&nombre_estudiante)
	fmt.Print("Ingresa Apellido: ")
	fmt.Scanln(&apellido_estudiante)
	fmt.Print("Ingresa Carnet: ")
	fmt.Scanln(&carnet_estudiante)
	fmt.Print("Ingresa Password: ")
	fmt.Scanln(&password_estudiante)

	var nuevo_estudiante *Persona.Estudiante = Persona.Nuevo_Estudiante(nombre_estudiante, apellido_estudiante, carnet_estudiante, password_estudiante)

	Cola.Agregar_Estudiante(nuevo_estudiante, c)
	fmt.Println("Estudiante agregado a la cola exitosamente.")
}
