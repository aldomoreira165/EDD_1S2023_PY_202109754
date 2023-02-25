package Funciones

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"modulo/Cola"
	"modulo/Dot"
	"modulo/JSON"
	"modulo/Lista"
	"modulo/Persona"
	"modulo/Pila"
	"os"
	"strconv"
	"time"
)

func Menu_Administrador(c *Cola.Cola, l *Lista.Lista_Enlazada, p_admin *Pila.Pila) {

	var (
		opcion int
		exit   bool
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
			Estudiantes_Pendientes(c, l, p_admin)
		case 2:
			Lista.Ordenar(l)
			Ver_Estudiantes_Aceptados(l)
		case 3:
			Registrar_Nuevo_Estudiante(c)
		case 4:
			var archivo string
			fmt.Print("Escriba el nombre del archivo: ")
			fmt.Scanln(&archivo)
			Carga_Masiva(archivo, c)
		case 5:
			fmt.Println("Has cerrado sesión (Administador).")
			exit = true
		}
	}
}

func Estudiantes_Pendientes(c *Cola.Cola, l *Lista.Lista_Enlazada, p *Pila.Pila) {
	temp := c.Primero

	if temp == nil {
		fmt.Println("No hay ningún estudiante en espera.")
	} else {
		opcion := 0
		for temp != nil && opcion != 3 {

			fmt.Println("********** Pendientes: ", c.Tamaño, " **********")
			fmt.Println("Estudiante Actual: ", temp.Estudiante.Nombre)
			fmt.Println("	1. Aceptar al estudiante")
			fmt.Println("	2. Rechazar al estudiante")
			fmt.Println("	3. Volver al menú")
			fmt.Scanln(&opcion)

			switch opcion {
			case 1:
				estudiante := Cola.Sacar_Estudiante(c)
				Lista.Insertar_Final(estudiante.Estudiante, l)
				//pila que guarda las acciones del admin
				Pila.Agregar_Pila("Se aceptó estudiante", time.Now(), p)

				//creando pila de logins al estudiante aceptado
				Persona.Pila_Logins(estudiante.Estudiante)

				//actualizando json de estudiantes aceptos
				JSON.Generar_JSON(l, "aceptados.json")

				//generando graphviz de acciones de admin
				Grafica_Acciones_Admin(p)

				//actualizando .png de estudiantes en espera
				//Grafica_Esperando(c)

				//grafica estudiantes aceptados
				Grafica_Aceptados(l)

				temp = temp.Siguiente
				fmt.Println("Has aceptado al estudiante")
			case 2:
				Cola.Sacar_Estudiante(c)
				Pila.Agregar_Pila("Se rechazó estudiante", time.Now(), p)
				fmt.Println("Has rechazado al estudiante")

				//generando graphviz de acciones de admin
				Grafica_Acciones_Admin(p)

				//Grafica_Esperando(c)
				temp = temp.Siguiente
			}
		}
	}
}

func Ver_Estudiantes_Aceptados(l *Lista.Lista_Enlazada) {
	temp := l.Primero
	if temp != nil {
		fmt.Println("********** Listado de Estudiantes **********")
		for temp != nil {
			fmt.Println("Nombre: ", temp.Estudiante.Nombre, ", Carnet: ", temp.Estudiante.Carnet)
			fmt.Println("*******************************************")
			temp = temp.Siguiente
		}
	} else {
		fmt.Println("No hay estudiantes aceptados.")
	}
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

	nombre_completo := nombre_estudiante + " " + apellido_estudiante
	var nuevo_estudiante *Persona.Estudiante = Persona.Nuevo_Estudiante(nombre_completo, carnet_estudiante, password_estudiante)

	Cola.Agregar_Estudiante(nuevo_estudiante, c)
	fmt.Println("Estudiante agregado a la cola exitosamente.")

	//actualizando .png de estudiantes en espera
	Grafica_Esperando(c)
}

func Carga_Masiva(path string, c *Cola.Cola) {
	file, err := os.Open(path)

	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	reader := csv.NewReader(file)

	//descartar el encabezado
	_, err = reader.Read()
	if err != nil {
		log.Fatal(err)
	}

	//leyendo cada fila
	contador := 0
	for {
		row, err := reader.Read()
		if err == io.EOF {
			break
		} else if err != nil {
			log.Fatal(err)
		}

		// Procesa la fila
		carnet, err := strconv.Atoi(row[0])
		nombre := row[1]
		contraseña := row[2]

		if err != nil {
			fmt.Printf("No se pudo convertir la cadena a un número: %v\n", err)
			return
		}
		nuevo_estudiante := Persona.Nuevo_Estudiante(nombre, carnet, contraseña)
		Cola.Agregar_Estudiante(nuevo_estudiante, c)
		contador += 1
	}
	Grafica_Esperando(c)
	fmt.Println("Archivo de estudiantes cargado correctamente.")
}

// generador de .png estudiantes en espera
func Grafica_Esperando(c *Cola.Cola) {
	path, error := os.Getwd()

	if error != nil {
		log.Println(error)
	}
	Dot.WriteDotFile(Cola.Grafica(c), "esperando.dot", path)
	Dot.GeneratePNG("esperando")
}

func Grafica_Acciones_Admin(p *Pila.Pila) {
	path, error := os.Getwd()

	if error != nil {
		log.Println(error)
	}

	Dot.WriteDotFile(Pila.Grafica(p), "acciones-admin.dot", path)
	Dot.GeneratePNG("acciones-admin")
}

func Grafica_Aceptados(l *Lista.Lista_Enlazada){
	path, error := os.Getwd()

	if error != nil {
		log.Println(error)
	}

	Dot.WriteDotFile(Lista.Grafica(l), "aceptados.dot", path)
	Dot.GeneratePNG("aceptados")
}