package main

import (
	"fmt"
	"modulo/Cola"
	"modulo/Funciones"
	"modulo/Lista"
	"modulo/Pila"
	"time"
)

func main() {

	cola_estudiantes_pendientes := Cola.Nueva_Cola()
	lista_estudiantes_aceptados := Lista.Nueva_Lista()
	pila_acciones_administrador := Pila.Nueva_Pila()

	var (
		exit bool
	)

	opcion := 0

	for !exit {
		fmt.Println("**************** EDD GoDrive ****************")
		fmt.Println("*  1. Iniciar Sesión como administrador     *")
		fmt.Println("*    2. Iniciar Sesión como Estudiante      *")
		fmt.Println("*            3. Salir del Sistema           *")
		fmt.Println("*********************************************")
		fmt.Scanln(&opcion)

		switch opcion{
		case 1:
			var usuario string
			var password string
			fmt.Print("Ingresa tu usuario: ")
			fmt.Scan(&usuario)
			fmt.Print("Ingrese tu password ")
			fmt.Scan(&password)


			if usuario == "admin" && password == "admin" {
				Funciones.Menu_Administrador(cola_estudiantes_pendientes, lista_estudiantes_aceptados, pila_acciones_administrador)
			}else{
				fmt.Println("Datos no encontrados.")
			}
		case 2:
			var usuario int
			var password string
			fmt.Print("Ingresa tu usuario: ")
			fmt.Scan(&usuario)
			fmt.Print("Ingrese tu password ")
			fmt.Scan(&password)

			encontrado, contraseña, estudiante := Funciones.Buscar(lista_estudiantes_aceptados, usuario, password)
			if encontrado == true && contraseña == true {
				Pila.Agregar_Pila("Inicio de sesión", time.Now(), estudiante.Logins)
				Funciones.Menu_Estudiante(estudiante)
			}else if encontrado == true && contraseña == false {
				fmt.Println("ENCONTRADO. DATOS DE INICIO DE SESION INCORRECTOS")
			}else{
				Funciones.No_Encontrado()
			}
		case 3:
			fmt.Println("Has salido del sistema.")
			exit = true
		}
	}
}
