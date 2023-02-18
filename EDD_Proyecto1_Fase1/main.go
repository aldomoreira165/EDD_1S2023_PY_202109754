package main

import (
	"fmt"
	"modulo/Persona"
	"modulo/Estructuras"
)

func main(){
	Pantalla_Principal()
}

func Pantalla_Principal(){
	fmt.Println("**************** EDD GoDrive ****************")
	fmt.Println("*             1. Iniciar Sesión             *")
	fmt.Println("*            2. Salir del Sistema           *")
	fmt.Println("*********************************************")

	var opcion int
	fmt.Scanln(&opcion)

	if opcion == 1 {
		var usuario string
		var password string

		fmt.Print("Ingresa tu usuario: ")
		fmt.Scan(&usuario)
		fmt.Print("Ingrese tu password ")
		fmt.Scan(&password)
		Menu_Administrador()
	}else{
		fmt.Println("Has salido del sistema.")
	}
}

func Menu_Administrador(){
	fmt.Println("*** Dashborad Administrador - EDD GoDrive ***")
	fmt.Println("*      1. Ver Estudiantes Pendientes        *")
	fmt.Println("*      2. Ver Estudiantes del Sistema       *")
	fmt.Println("*      3. Registrar Nuevo Estudiante        *")
	fmt.Println("*      4. Carga masiva de estudiantes       *")
	fmt.Println("*      5. Cerrar sesión                     *")
	fmt.Println("*********************************************")

	var opcion int
	fmt.Scanln(&opcion)

	switch opcion {
	case 1:
		fmt.Println("Has escogido la op 1")
	case 2:
		fmt.Println("Has escogido la op 2")
	case 3:
		Registrar_Nuevo_Estudiante()
	case 4:
		fmt.Println("Has escogido la op 4")
	case 5:
		Pantalla_Principal()
	}

}

func Registrar_Nuevo_Estudiante(){
	var nombre_estudiante string
	var apellido_estudiante string
	var carnet_estudiante int
	var password_estudiante string

	//obteniendo datos de estudiante
	fmt.Println("***** Registro de Estudiantes - EDD GoDrive *****")
	fmt.Print("Ingresa nombre: ")
	fmt.Scan(&nombre_estudiante)
	fmt.Print("Ingresa Apellido: ")
	fmt.Scan(&apellido_estudiante)
	fmt.Print("Ingresa Carnet: ")
	fmt.Scan(&carnet_estudiante)
	fmt.Print("Ingresa Password: ")
	fmt.Scan(&password_estudiante)

	var nuevo_estudiante *Persona.Estudiante = Persona.Nuevo_Estudiante(nombre_estudiante, apellido_estudiante, carnet_estudiante, password_estudiante)

	var cola_estudiantes *Estructuras.Cola = Estructuras.Nueva_Cola()
	Estructuras.Insertar_Cola(nuevo_estudiante, cola_estudiantes)
}