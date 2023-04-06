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

# Segunda Fase de EDD GoDrive
### Manual de Usuario
En esta fase del desarrollo de la nube EDD GoDrive ya puedes almacenar tus datos y documentos importantes por medio del sitio web. Básicamente este consiste de una cuenta de administrador y de usuarios las cuales se detallarán a continuación.

* Ventana Login: En esta parte usted podrá hacer el inicio básico de toda la vida. Es decir, si cuenta con permisos de administrador únicamente deberá ingresar sus credenciales y automáticamente será redirigido a la ventana de administrador. De igual forma si tiene credenciales de usuario común.
![VentanaInicio](https://imgur.com/dzQey24.png)

* Ventana Administrador: Acá usted cuenta con tres opciones principales que son Mostrar alumnos, árbol de estudiantes y carga masiva. En el botón de mostrar alumnos usted obtendrá una vista detallada de los datos de cada uno de los alumnos por medio de una tabla la cual puede ser mostrada en tres maneras diferentes. En el botón de árbol de estudiantes usted tendrá una vista del árbol AVL que se genera y finalmente en el botón de la carga masiva usted podrá cargar un archivo en formato JSON con todos los estudiantes que desee agregar al sistema.
![VentanaInicio](https://imgur.com/4u3cl7c.png)

* Ventana Usuario: En la ventana de usuario se tiene mucha más opción de uso ya que en dicha área usted encontrará opciones para crear carpetas en el directorio principal, así como podrá generar carpetas dentro de carpetas hasta crear un ciclo infinito. Luego usted podrá eliminar dichas carpetas cuando ya no las necesite más. Asimismo, podrá obtener un reporte de las carpetas que contiene el directorio en el que se encuentre ubicado, dicho reporte será la representación visual de un árbol multicamino o n-ario. Seguidamente, podrá agregar archivos de texto plano, pdf o cualquier formato de imagen a la carpeta que usted desee. Luego podrá descargarlas a su equipo. Asimismo, usted tendrá la opción de compartir sus archivos con los demás usuarios del sistema por medio de la opción "permisos". 
![VentanaInicio](https://imgur.com/2FhYoO1.png)

* Árbol AVL: Como administrador podrá visualizar la estructura general de su sistema y quienes lo conforman por medio de la representación del Árbol AVL.
![VentanaInicio](https://imgur.com/bSW17as.png)

*Árbol N-ario: Como usuario, usted tendrá la opción de generar una representación visual de cómo está conformado su sistema de archivos. Además, esta representación podrá ser generada desde cualquier punto que usted desee. 
![VentanaInicio](https://imgur.com/H7StQ06.png)

*Matriz dispersa: Como usuario, usted podrá visualizar quienes poseen permisos sobre sus archivos, esto por medio de una matriz dispersa,
![VentanaInicio](https://imgur.com/XHKmNoW.png)

### Manual Técnico

Introducción

Este manual técnico describe el diseño y la implementación de un sistema de usuarios y archivos utilizando árboles AVL, árboles multicamino, listas circulares y matrices dispersas en el lenguaje de programación JavaScript, mientras que para el frontend se utilizó HTML, CSS y Bootstrap.

Descripción del problema

El sistema de usuarios y archivos debe permitir a los usuarios almacenar y buscar archivos en una estructura de datos eficiente. Para ello, se utilizaron las siguientes estructuras de datos:

Árbol AVL: se utilizó para almacenar los usuarios del sistema que ya han sido aceptados. Cada nodo del árbol contiene la información del usuario, incluyendo su nombre, contraseña y la lista de archivos que ha almacenado en el sistema.

Árbol multicamino o n-ario: se utilizó para manejar el sistema de archivos. Cada nodo del árbol contiene la información de una carpeta o archivo, incluyendo su nombre, tamaño y ubicación en el sistema de archivos.

Lista circular: se utilizó para el manejo de logs, como la creación o eliminación de carpetas o archivos ligados a cada usuario.

Matriz dispersa: se utilizó para manejar permisos en las carpetas del directorio actual.

Diseño del sistema

Para diseñar el sistema, se dividió la funcionalidad en dos módulos principales: el módulo de usuarios y el módulo de archivos. El módulo de usuarios se encarga de manejar la información de los usuarios del sistema, mientras que el módulo de archivos se encarga de manejar la información de los archivos almacenados en el sistema.

En el módulo de usuarios, se implementó un árbol AVL para almacenar los usuarios del sistema que ya han sido aceptados. Cada nodo del árbol contiene la información de un usuario, incluyendo su nombre, contraseña y la lista de archivos que ha almacenado en el sistema. La lista de archivos se implementó como una lista circular, en la que cada nodo contiene la información de un archivo, incluyendo su nombre y su ubicación en el árbol multicamino.

En el módulo de archivos, se implementó un árbol multicamino o n-ario para manejar el sistema de archivos. Cada nodo del árbol contiene la información de una carpeta o archivo, incluyendo su nombre, tamaño y ubicación en el sistema de archivos. Para manejar los permisos en las carpetas del directorio actual, se utilizó una matriz dispersa, en la que cada elemento contiene la información del permiso en esa ubicación.

Para el frontend, se utilizó HTML, CSS y Bootstrap para la implementación de las páginas web y la interfaz gráfica de usuario.

Implementación del sistema
El sistema se implementó en JavaScript utilizando las estructuras de datos mencionadas en la sección 2. Se utilizó javascript para el backend y se implementaron funciones para manejar la inserción, eliminación y búsqueda de usuarios y archivos en el sistema.
Para el frontend, se utilizó HTML, CSS y Bootstrap para la implementación de las páginas web y la interfaz gráfica de usuario.

Además hubieron algunas otras funciones importantes como: 

* Subir archivos: En la ventana principal de EDD GoDrive, se habilitará un apartado para la subida de archivos. Para garantizar la seguridad y el buen funcionamiento de la aplicación, se deberá restringir la extensión de los archivos que se suban. Solo se permitirán archivos de imagen, archivos PDF y archivos de texto. Para garantizar la integridad de los archivos de imagen y PDF, se codificarán en base64 antes de su almacenamiento en la estructura correspondiente. Es importante destacar que, una vez que el usuario suba un archivo, este se agregará al árbol n-ario encargado de las carpetas, que permitirá el acceso a los archivos de los usuarios de forma organizada y jerárquica. Este árbol multicamino permitirá la creación, eliminación y modificación de carpetas, así como la subida y descarga de archivos, y la asignación de permisos de acceso a usuarios específicos. En resumen, el sistema de almacenamiento de archivos EDD GoDrive implementará una política de seguridad en la subida de archivos, que se almacenarán de forma codificada en base64 para garantizar su integridad. Además, se utilizará un árbol multicamino para el manejo organizado y jerárquico de carpetas y archivos

* Subir archivo JSON: En EDD GoDrive, el administrador tendrá la opción de subir un archivo JSON que contenga los datos de los estudiantes aceptados. Esta característica permitirá una gestión más eficiente de los usuarios y facilitará el registro de nuevos estudiantes en el sistema. El archivo JSON deberá contener información detallada sobre cada estudiante aceptado, como su nombre completo, dirección de correo electrónico, nombre de usuario y contraseña. Además, se pueden incluir otros datos relevantes, como su número de identificación estudiantil o su facultad. Al subir el archivo JSON, el sistema EDD GoDrive procesará los datos y actualizará la base de datos de usuarios del sistema, lo que permitirá un acceso más fácil y rápido a la información de los estudiantes. Esta característica es especialmente útil para administradores que necesitan actualizar información de usuarios en bloque, en lugar de hacerlo manualmente uno por uno. De esta manera, se ahorra tiempo y se garantiza la precisión de los datos almacenados en el sistema.




