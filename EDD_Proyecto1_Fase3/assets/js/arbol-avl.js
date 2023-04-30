
let nodos = "";
let conexiones = "";

class NodoAVL {
    constructor(estudiante) {
        this.estudiante = estudiante;
        this.altura = 0;
        this.izquierdo = null;
        this.derecho = null;
    }
}

class ArbolAVL {
    constructor() {
        this.raiz = null;
    }

    //funciones generales
    _obtenerAltura(nodo) {
        if (nodo == null) {
            return -1;
        }
        return nodo.altura;
    }

    _obtenerAlturaMaxima(nodoIzquierdo, nodoDerecho) {
        if (nodoIzquierdo > nodoDerecho) {
            return nodoIzquierdo;
        }
        return nodoDerecho;
    }

    //rotaciones
    _rotacionIzquierda(nodo) {
        var aux = nodo.izquierdo;

        nodo.izquierdo = aux.derecho;
        aux.izquierdo = nodo;

        nodo.altura = this._obtenerAlturaMaxima(this._obtenerAltura(nodo.izquierdo), this._obtenerAltura(nodo.derecho)) + 1;
        aux.altura = this._obtenerAlturaMaxima(this._obtenerAltura(nodo.derecho), nodo.altura) + 1;

        return aux;
    }

    _rotacionDerecha(nodo) {
        var aux = nodo.derecho;

        nodo.derecho = aux.izquierdo;
        aux.izquierdo = nodo;

        nodo.altura = this._obtenerAlturaMaxima(this._obtenerAltura(nodo.izquierdo), this._obtenerAltura(nodo.derecho)) + 1;
        aux.altura = this._obtenerAlturaMaxima(this._obtenerAltura(nodo.derecho), nodo.altura) + 1;

        return aux;
    }

    _rotacionDobleIzquierda(nodo) {
        nodo.izquierdo = this._rotacionDerecha(nodo);
        return this._rotacionIzquierda(nodo);
    }

    _rotacionDobleDerecha(nodo) {
        nodo.derecho = this._rotacionIzquierda(nodo);
        return this._rotacionDerecha(nodo);
    }

    // Función para insertar un nodo en el árbol AVL
    insertar(estudiante) {
        this.raiz = this._agregar(estudiante, this.raiz);
    }

    _agregar(estudiante, nodo) {
        if (nodo == null) {
            return new NodoAVL(estudiante);
        }

        if (estudiante.carnet < nodo.estudiante.carnet) {
            nodo.izquierdo = this._agregar(estudiante, nodo.izquierdo);
            if (this._obtenerAltura(nodo.derecho) - this._obtenerAltura(nodo.izquierdo) == -2) {
                if (estudiante.carnet < nodo.izquierdo.estudiante.carnet) {
                    nodo = this._rotacionIzquierda(nodo);
                } else {
                    nodo = this._rotacionDobleIzquierda(nodo);
                }
            }
        } else if (estudiante.carnet > nodo.estudiante.carnet) {
            nodo.derecho = this._agregar(estudiante, nodo.derecho);
            if (this._obtenerAltura(nodo.derecho) - this._obtenerAltura(nodo.izquierdo) == 2) {
                if (estudiante.carnet > nodo.derecho.estudiante.carnet) {
                    nodo = this._rotacionDerecha(nodo);
                } else {
                    nodo = this._rotacionDobleDerecha(nodo);
                }
            }
        } else {
            nodo.estudiante = estudiante;
        }
        nodo.altura = this._obtenerAlturaMaxima(this._obtenerAltura(nodo.izquierdo), this._obtenerAltura(nodo.derecho)) + 1;
        return nodo;
    }


    graficar() {
        conexiones = "";
        nodos = "";
        this._graficarRecursivo(this.raiz);
        return nodos + conexiones;
    }

    _graficarRecursivo(nodo) {
        if (nodo.izquierdo != null) {
            this._graficarRecursivo(nodo.izquierdo);
            conexiones += `S_${nodo.estudiante.carnet} -> S_${nodo.izquierdo.estudiante.carnet};\n`;
        }
        nodos += `S_${nodo.estudiante.carnet}[label = "${nodo.estudiante.carnet}\\n ${nodo.estudiante.nombre}\\n Altura:${this._obtenerAltura(nodo)}"];\n`;
        if (nodo.derecho != null) {
            this._graficarRecursivo(nodo.derecho);
            conexiones += `S_${nodo.estudiante.carnet} -> S_${nodo.derecho.estudiante.carnet};\n`;
        }
    }

    //metodos para recorrer el arbol

    inOrder() {
        let html = this._inOrderRecursive(this.raiz);
        return html;
    }

    _inOrderRecursive(nodo) {
        let fila = "";
        if (nodo.izquierdo != null) {
            fila += this._inOrderRecursive(nodo.izquierdo);
        }
        fila += `
        <tr>
            <th>${nodo.estudiante.carnet}</th>
            <td>${nodo.estudiante.nombre}</td>
            <td>${nodo.estudiante.password}</td>
        </tr>
        `;
        if (nodo.derecho != null) {
            fila += this._inOrderRecursive(nodo.derecho);
        }
        return fila;
    }

    inOrderToArray() {
        let estudiantes = [];
        this._inOrderRecursiveArray(this.raiz, estudiantes);
        return estudiantes;
    }

    _inOrderRecursiveArray(nodo, estudiantes) {
        if (nodo.izquierdo != null) {
            this._inOrderRecursiveArray(nodo.izquierdo, estudiantes);
        }
        estudiantes.push(nodo.estudiante);
        if (nodo.derecho != null) {
            this._inOrderRecursiveArray(nodo.derecho, estudiantes);
        }
    }

    preOrder() {
        let html = this._preOrderRecursive(this.raiz);
        return html;
    }

    _preOrderRecursive(nodo) {
        let fila = "";
        fila += `
        <tr>
            <th>${nodo.estudiante.carnet}</th>
            <td>${nodo.estudiante.nombre}</td>
            <td>${nodo.estudiante.password}</td>
        </tr>
        `;
        if (nodo.izquierdo != null) {
            fila += this._inOrderRecursive(nodo.izquierdo);
        }
        if (nodo.derecho != null) {
            fila += this._inOrderRecursive(nodo.derecho);
        }
        return fila;
    }

    postOrder() {
        let html = this._postOrderRecursive(this.raiz);
        return html;
    }

    _postOrderRecursive(nodo) {
        let fila = "";
        if (nodo.izquierdo != null) {
            fila += this._inOrderRecursive(nodo.izquierdo);
        }
        if (nodo.derecho != null) {
            fila += this._inOrderRecursive(nodo.derecho);
        }
        fila += `
        <tr>
            <th>${nodo.estudiante.carnet}</th>
            <td>${nodo.estudiante.nombre}</td>
            <td>${nodo.estudiante.password}</td>
        </tr>
        `;
        return fila;
    }

    //buscando 

    buscarEstudiante(valorBuscado) {
        return this._buscarNodo(this.raiz, valorBuscado);
    }

    _buscarNodo(nodo, valorBuscado) {
        if (!nodo || nodo.estudiante.carnet == valorBuscado) {
            return nodo;
        } else if (valorBuscado < nodo.estudiante.carnet) {
            return this._buscarNodo(nodo.izquierdo, valorBuscado);
        } else {
            return this._buscarNodo(nodo.derecho, valorBuscado);
        }
    }

    modificarCarpetas(carnet, carpetas) {
        const nodo = this.buscarEstudiante(carnet);
        if (!nodo) return false;
        nodo.estudiante.carpeta = carpetas;
        return true;
    }

    modificarAcciones(carnet, accion) {
        const nodo = this.buscarEstudiante(carnet);
        if (!nodo) return false;
        nodo.estudiante.acciones = accion;
        return true;
    }

    modificarPermisos(carnet, accion) {
        const nodo = this.buscarEstudiante(carnet);
        if (!nodo) return false;
        nodo.estudiante.acciones = accion;
        return true;
    }
}

export { ArbolAVL };
