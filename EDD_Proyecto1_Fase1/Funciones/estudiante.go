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
	low := l.Primero
    high := l.Ultimo
    for low != nil && high != nil && low != high && high.Siguiente != low {
        mid := low
        for mid != high && mid.Siguiente != high {
            mid = mid.Siguiente
        }
        if mid.Estudiante.Carnet == carnet {
			if mid.Estudiante.Password == password{
				return true, true, mid.Estudiante
			}else{
				return true, false, nil
			}
            
        } else if mid.Estudiante.Carnet > carnet {
            high = mid.Siguiente
        } else {
            low = mid.Siguiente
        }
    }
    if low != nil && low.Estudiante.Carnet == carnet {
        if low.Estudiante.Password == password{
			return true, true, low.Estudiante
		}else{
			return true, false, nil
		}
    } else {
        return false, false, nil
    }
}