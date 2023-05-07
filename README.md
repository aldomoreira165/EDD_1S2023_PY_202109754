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

# Tercera Fase de EDD GoDrive
### Manual de Usuario

Funciones del Administrador

En la última fase del desarrollo del sistema de gestión de archivos, se han agregado nuevas funcionalidades que mejoran la experiencia del usuario y aumentan la eficiencia del sistema.

Una de las principales mejores es que ahora el usuario tiene un nuevo boton llamado "Traladar datos" el cual permite almacenar los datos almacenados en el arbol avl creado con anterioridad ahora se pueden almacenar en en una tabla hash recorriendo dicho arbol con recorrido inOrden. Cuando dichos datos son almacenados en la tabla hash estos contendran los mismos datos y/o atributos que se tienen en la tabla que hace referencia a los datos almacenados en el arbol. Con la diferencia de que la contraseña estará encriptada. Dado que se desea comenzar a aplicar los conceptos de encriptación se muestra la contraseña de esa forma para evitar el robo de información como si de una base de datos se tratara. Entonces, al momento de iniciar sesión se buscará al estudiante, se desencriptará la contraseña y se verificará si esta coincide con la contraseña ingresada.

[TablaHash](https://imgur.com/9UUCVtX)

Asimismo, el administrador contará con el reporte de cada uno de los archivos compartidos en el sistema por cada uno de los usuarios o estudiantes que lo conforman. Esto para que así pueda mantener un mejor control del sistema y del uso que los estudiantes le dan a la plataforma. Por ello, el administrador podrá visualizar tanto la persona que otorga el permiso, tanto como el que lo recibe. Adicionalmente, podrá visualizar la ruta en la que el archivo se encuentra almacenado, así como el nombre y los permisos que el usuario receptor posee sobre dicho archivo. También contará con la posibilidad de descargar dicho archivo y poder almacenarlo en su equipo para el uso que de desee ya que como administrador es muy importante mantener un control sobre lo que los estudiantes comparten o almacenan en las plataformas educativas.

[Compartidos](https://imgur.com/CgetQ8P)

Una de las principales mejoras ha sido la implementación de un sistema de notificaciones en tiempo real que alerta a los usuarios sobre las acciones que se han realizado en los archivos o carpetas compartidas. Cuando un usuario comparte un archivo o carpeta con otros, se envía automáticamente una notificación a los destinatarios, indicando que se ha compartido un archivo o carpeta específica y los permisos asignados. De esta manera, los usuarios podrán mantenerse al tanto de las acciones que se realizan en los archivos compartidos y saber quién está accediendo a ellos. Asimismo, el usuario sabrá cuando se le haya compartido algun archivo. Y podrá descargarlo o o modificarlo en caso de un archivo de texto plano se estuvieta hablando. Esto para facilitar la manipulación de archivos que se maneja dentro del sistema y evitar que el usp de la plataforma sea trabajoso o incomodo para algunas personas.

[CompartidoConmigo](https://imgur.com/RMPX8Ex)

Otra mejora importante ha sido la integración de una herramienta de colaboración en línea. Los usuarios ahora pueden trabajar en documentos en tiempo real y ver los cambios que otros usuarios están realizando en el mismo documento al mismo tiempo. Esta función mejora la productividad y la eficiencia del equipo, lo que permite a los usuarios trabajar de manera más efectiva en colaboración.

Asimismo, una integración importante al sistema es la mensajería entre usuarios. Ya que se veía importante que los usuarios tuvieran la posibilidad de comunicarse entre ellos al momemnto de necesitar compartir un archivo o bien, solicitar que alguien suba un archivo o lo comparta. El uso es muy sencillo, únicamente debe ingresar sesión como estudiante de la institución, luego irse a la barra superior y buscar el icono de una carta, en esa pantalla usted podrá escoger a quien enviar un mensaje dentro de todos los estudiantes inscritos en la facultad o centro educativo. Luego de enviar el mensaje, dicho mensaje será recibido así como podrá ser respondido.

En cuanto a los reportes que el usuario podrá visualizar en esta fase se tienen las tablas que contienen los reportes recibidos durante los últimos días. Así como también podrá visualizar un reporte del grafo no dirigido del directorio de carpetas de cada uno de los usuarios. Podrá visualizar absolutamente todos los archivos almacenados así como su ubicación y la altura que posee dentro del directorio. 

[Grafo](https://imgur.com/gW5Wexi)

### Manual Técnico

Para el desarrollo de esta fase se implementó una tabla HASH. A continuación se indica cómo se desarrolló: 

La tabla hash es una estructura de datos que se utiliza para almacenar y recuperar información de manera rápida y eficiente. En esta aplicación, se ha implementado una tabla hash para almacenar los datos de los estudiantes. Para hacer esto, se ha seguido una serie de pasos:

Se ha creado una tabla hash con una capacidad inicial de 7 espacios disponibles.
Se ha definido una función hash por división, que toma el valor del carnet del estudiante como parámetro y devuelve un valor entero que se utiliza como índice para insertar el nodo en la tabla hash.

Se ha establecido que cuando la tabla hash llegue al 75% de su capacidad, se aumentará su capacidad hasta el siguiente número primo.

Se ha utilizado una técnica de resolución de colisiones llamada direccionamiento abierto por salto al cuadrado. Cuando se produce una colisión, se toma el valor hash calculado y se eleva al cuadrado, y se intenta insertar el nodo en la nueva posición. Si el nuevo hash sobrepasa el tamaño de la tabla hash, se comienza a recorrer el arreglo desde el inicio con los saltos restantes hasta que se encuentre un espacio vacío.

En resumen, la tabla hash implementada en esta aplicación se basa en una función hash por división y utiliza una técnica de resolución de colisiones llamada direccionamiento abierto por salto al cuadrado para insertar los nodos en la tabla hash. Además, se aumenta la capacidad de la tabla hash cuando se alcanza el 75% de su capacidad inicial.

Asimismo, para la función de los permisos tanto a nivel general en el sistema como para cada usuario. Se agregó el atributo "Permisos" a la clase estudiante para que fuera posible almacenar los permisos que cada uno de los usuarios posee. Asimismo, en la clase del arbol avl se creó un metodo llamado modificarPermisos para que cada vez que se otorgará un permiso este se almacena en el arbol AVL almacenado en el local storage y así mantener la persisistencia de datos. Es decir, para evitar que estos datos se pierdan al detener el servidor o al salir accidental u intencionalmente del navegador. 

GRAFO NO DIRIGIDO 

En cuanto al grafo no dirigido, el usuario que iniciaba sesión tenía una ventana en la que se mostraban diferentes opciones de creación, eliminación y modificación de carpetas. Para que el usuario pudiera acceder a las carpetas de su sistema, se usaba una barra superior de búsqueda, donde colocaba la ruta de su carpeta. Se debía validar que la ruta de la carpeta fuera existente. Por ejemplo, si quería acceder a /imagenes/2023 pero la carpeta imagenes no existía en la raíz, se mostraba una alerta que especificaba que el directorio no era válido.

Para el almacenamiento de las carpetas se usaba el árbol indexado de la fase 2 para leer las carpetas del sistema y se almacenaba en una matriz de adyacencia para poder realizar el árbol de recubrimiento. Esta matriz de adyacencia permitía visualizar las relaciones entre directorios, lo cual servía para la navegación entre carpetas, tomando como carpeta raíz “/” el nodo principal del árbol.

SISTEMA DE MENSAJERÍA 

Con el objetivo de mejorar la comunicación entre estudiantes, se ha creado un nuevo apartado en el que los estudiantes podrán enviar mensajes entre sí. Para garantizar la seguridad de las conversaciones, los mensajes se enviarán encriptados. Cuando un usuario emisor envía un mensaje, el texto se cifra y se mantiene así hasta que el receptor inicie sesión y pueda desencriptarlo para leerlo.

Para manejar el sistema de mensajería se utilizará la tecnología blockchain para garantizar la seguridad e integridad de los mensajes. Para esto, se empleará un sistema de almacenamiento que se asemeja a una lista doblemente enlazada de nodos. El sistema de blockchain tendrá los siguientes atributos:

Índice: Este número representa el número del bloque. El bloque génesis tendrá un valor de índice de 0, y cada bloque adicional creado tendrá valores incrementales (1, 2, 3, etc.).

Timestamp: Representa la fecha y hora exacta en que se creó el bloque, con el siguiente formato: DD-MM-YY-::HH:MM:SS.

Transmitter: Representa al emisor del mensaje, identificado por su número de carnet.
Receiver: Representa al receptor del mensaje, identificado también por su número de carnet.
Message: Este es el cuerpo del mensaje enviado. Para este, se utilizará la encriptación AES.
PreviousHash: Este atributo representa el bloque anterior y sirve para validar que la cadena del blockchain no esté corrupta. En el caso del bloque génesis, el hash anterior debe ser 0000.
Hash: Este atributo protege la información del mensaje y garantiza que no esté corrupta. Para el caso de este proyecto, se utilizará la encriptación SHA256 y se creará una función que reciba como parámetros el índice, timestamp, transmitter, receiver y message, y a partir de ellos genere el hash correspondiente. Por ejemplo: SHA-256(index+timestamp+transmitter+receiver+message).