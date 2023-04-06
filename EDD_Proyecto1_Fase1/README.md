# EDD_1S2023_PY_202109754
Primera fase de sistema de archivos utilizando estructuras de datos.

Aldo Saúl Vásquez Moreira
Carnet 202109754

El proyecto realizado es una de las tres fases en las que consiste el proyecto final.
La finalidad de este es crear la base de lo que es un registro de estudiantes con la 
respectiva creación de usuarios dentro del sistema al ser aceptados por un administrador del 
sistema.

Se desarrolló con el lenguaje de programación Golang o Go. 
El reporte de las estructuras se evidenció mediante la representación gráfica con Graphviz.

Se aplicaron conceptos de estructuras de datos tales como: 

*LISTA DOBLEMENTE ENLAZADA: El desarrollo de esta estructura esta dentro del paquete "Lista", donde se 
divide en dos archivos "listaEnlazada.go" y "nodo.go". El archivo "listaEnlazada" contiene las siguientes funcionalidades para conseguir el comportamiento esperado: 

    -Insertar al final
    -Ordenar
    -Gráficar

*LISTA DE PILAS: La lista de pilas se aplicó para llevar el control de los usuarios aceptados dentro del sistema, así como las veces que han ingresado al mismo por medio del usuario que se les creó a cada uno al momento de ser aceptos. 

Para conseguir dicho funcionamiento cada estudiante contiene atributo llamado "Pila_Logins", el cual al 
principio es declarado como nulo hasta que este sea aceptado.

*PILA: Como sabe, la pila tiene un mecanismo llamado "LIFO" en donde se van acumulando los nodos hasta que se necesite sacar uno de estos, es el último el que sale. Por lo tanto, este funcionamiento se desarrolló en el archivo "Pila.go" del paquete pila, dicho archivo contiene los siguientes métodos;

    -Agregar_Pila
    -Imprimir_Pila
    -Gráfica

*COLA: El desarrollo de la cola funciona de la siguiente mano FIFO, lo cual significa que el primero en entrar es el primero en salir. Dicho funcionamiento se desarrolló en el archivo "cola.go" del paquete "Cola. 

Además de dichas estructuras, se implementaron métodos de ordenamiento y búsqueda para reducir los tiempos y hacer más eficiente el sistema.

//tecnologías adicionales 

*Se hizo uso de la librería encoding/json para generar un reporte de salida en formato JSON el cual contiene el detalle de cada uno de los estudiantes que fueron aceptados en el sistema. Fue desarrollado con este formato para futuras fases.

*Se hizo uso de Graphviz para el reporte de cada una de las estructuras implementadas. Este funcionamiento se detalla en el paquete "DOT", en general cuenta con el método para generar el archivo ".dot" y otro que genera la imagen en formato ".png" a partir de dicho archivo. Por lo tanto, para ejecutar correctamente el software es necesario tener instalado Graphviz en el  equipo. 

*Se hizo uso de la librería encoding/csv para poder hacer una carga masiva de usuarios. Este recibe un archivo y separa cada uno de los datos por medio de la función split. Luego cada uno de los datos es asignado a un puntero de tipo Estudiante y este se inserta en la cola de estudiantes en espera. 

