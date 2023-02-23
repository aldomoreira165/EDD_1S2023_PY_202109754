package Dot

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
)

// MÉTODO PARA ESCRIBIR EL ARCHIVO ".dot"
func WriteDotFile(code string, fileName string, path string) {
	// Verifica que el archivo existe
	var _, err = os.Stat(path + "\\" + fileName)
	// Crea el archivo si no existe
	if os.IsNotExist(err) {
		// Si no existe lo crea
		var file, err = os.Create(fileName)
		if err != nil {
			fmt.Println(err.Error())
		}
		defer file.Close()
	} else {
		// Si existe lo elimina, para crearlo de nuevo
		// Y actualizar el archivo si fuese necesario
		err := os.Remove(fileName)
		if err == nil {
			var file, err = os.Create(fileName)
			if err != nil {
				fmt.Println(err.Error())
			}
			defer file.Close()
		}
	}

	// Abre archivo usando permisos de escritura
	var file, _ = os.OpenFile(fileName, os.O_RDWR, 0644)
	_, err = file.WriteString(code)
	if err != nil {
		fmt.Println(err.Error())
	}
	// Guardar los cambios
	err = file.Sync()
	if err != nil {
		fmt.Println(err.Error())
	}
}

// Método para ejecutar comando en consola
func GeneratePNG(fileName string) {
	nombre := fileName + ".dot"
	data, err := ioutil.ReadFile(nombre)
    if err != nil {
        panic(err)
    }

    // Crea un comando Graphviz para generar el archivo PNG
    cmd := exec.Command("dot", "-Tpng")
    cmd.Stdin = bytes.NewReader(data)

    // Escribe el archivo PNG
    out, err := cmd.Output()
    if err != nil {
        panic(err)
    }

	nombre_imagen := fileName + ".png"
    err = ioutil.WriteFile(nombre_imagen, out, 0644)
    if err != nil {
        panic(err)
    }
}
