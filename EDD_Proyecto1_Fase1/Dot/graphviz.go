package Dot

import (
	"fmt"
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
	fmt.Println("Archivo .dot creado.")

}

// Método para ejecutar comando en consola
func GeneratePNG(fileName string, path string) {
	cmd := exec.Command("dot", "-Tpng", path, "-o", path)
	err := cmd.Run()
	if err != nil{
		fmt.Println(err)
	}
	_, err = os.Stat(path)
    if os.IsNotExist(err) {
        fmt.Println("Error: no se pudo generar el archivo PNG")
    } else {
        fmt.Println("Archivo PNG generado exitosamente")
    }
}

//obtener la direccion del directorio