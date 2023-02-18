package Persona

type Estudiante struct{
	Nombre string
	Apellido string
	Carnet int
	Password string
}

func Nuevo_Estudiante(nombre string, apellido string, carnet int, password string) *Estudiante{
	return &Estudiante{nombre, apellido, carnet, password}
}