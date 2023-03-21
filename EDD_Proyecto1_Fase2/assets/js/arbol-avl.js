
let = nodos = "";
let = conexiones = "";

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
    //obteniendo la altura del nodo
    _obtenerAltura(nodo) {
        if (nodo == null) {
            return -1;
        } else {
            return nodo.altura;
        }
    }

    _obtenerAlturaMaxima(nodoIzquierdo, nodoDerecho){
        if (nodoIzquierdo > nodoDerecho){
            return nodoIzquierdo.altura
        }else{
            return nodoDerecho.altura;
        }
    }

    _obtenerFactorEquilibrio(nodo) {
        if (nodo === null) {
            return 0;
        }
        return this._obtenerAltura(nodo.izquierdo) - this._obtenerAltura(nodo.derecho);
    }

    _rotacionIzquierda(nodo) {
        var izquierdo = nodo.izquierdo;
        
        nodo.izquierdo = izquierdo.derecho;
        izquierdo.izquierdo = nodo;

        nodo.altura = this._obtenerAlturaMaxima(this._obtenerAltura(nodo.derecho), this._obtenerAltura(nodo.izquierdo)) + 1;
        izquierdo.altura = this._obtenerAlturaMaxima(this._obtenerAltura(izquierdo.izquierdo), nodo.altura) + 1;

        return izquierdo;
    }

    _rotacionDerecha(nodo) {
        var derecho = nodo.derecho;

        nodo.derecho = derecho.izquierdo;
        derecho.izquierdo = nodo;

        nodo.altura = this._obtenerAlturaMaxima(this._obtenerAltura(nodo.derecho), this._obtenerAltura(nodo.izquierdo)) + 1;
        derecho.altura = this._obtenerAlturaMaxima(this._obtenerAltura(derecho.derecho), nodo.altura) + 1;

        return derecho;
    }

    _rotacionDobleIzquierda(nodo) {
        nodo.izquierdo = this._rotacionDerecha(nodo.izquierdo);
        return this._rotacionIzquierda(nodo);
    }

    _rotacionDobleDerecha(nodo) {
        nodo.derecho = this._rotacionIzquierda(nodo.derecho);
        return this._rotacionDerecha(nodo);
    }

    // Función para insertar un nodo en el árbol AVL
    insertar(estudiante) {
        this.raiz = this._agregar(estudiante, this.raiz);
        console.log(`Se insertó: ${estudiante.carnet}`);
    }

    _agregar(estudiante, nodo){
        if(nodo == null) {
            return new NodoAVL(estudiante);
        }else if(estudiante.carnet < nodo.estudiante.carnet) {
            nodo.izquierdo = this._agregar(estudiante, nodo.izquierdo);
            if(this._obtenerAltura(nodo.izquierdo)-this._obtenerAltura(nodo.derecho) == 2) {
                if(estudiante.carnet < nodo.izquierdo.estudiante.carnet) {
                    nodo = this._rotacionIzquierdo(nodo);
                } else {
                    nodo = this._rotacionDobleIzquierdo(nodo);
                }
            }
        } else if(estudiante.carnet > nodo.estudiante.carnet) {
            nodo.derecho = this._agregar(estudiante, nodo.derecho);
            if(this._obtenerAltura(nodo.derecho)-this._obtenerAltura(nodo.izquierdo) == 2) {
                if(estudiante.carnet < nodo.derecho.estudiante.carnet) {
                    nodo = this._rotacionDerecha(nodo);
                } else {
                    nodo = this._rotacionDobleDerecha(nodo);
                }
            }
        } else {
            console.log("El elemento ya existe en el árbol");
        }
        nodo.altura = this._obtenerAlturaMaxima(this._obtenerAltura(nodo.izquierdo), this._obtenerAltura(nodo.derecho))+1;
        return nodo;
    }

    graficar() {
        let conexiones = "";
        let nodos = "";
        this._graficarRecursivo(this.raiz);
        console.log(nodos, conexiones);
    }

    _graficarRecursivo(nodo) {
        if (nodo.izquierdo != null) {
            this._graficarRecursivo(nodo.izquierdo);
            conexiones += `${nodo.valor} -> S${nodo.izquierdo.valor}\n`
        }
        nodos += `S${nodo.valor}[label = ${nodo.valor}];`;
        if (nodo.derecho != null) {
            this._graficarRecursivo(nodo.derecho);
            conexiones += `S${nodo.valor} -> S${nodo.derecho.valor}\n`;
        }
    }
}

let estudiante = require('./estudiante')

let est1 = new estudiante.Estudiante(8318054, "Hugo30");
let est2 = new estudiante.Estudiante(199919737, "Williams42");
let est3 = new estudiante.Estudiante(201700792, "Dennis28");
let est4 = new estudiante.Estudiante(1, "Denn");
let est5 = new estudiante.Estudiante(22, "Dino");

let arbol_avl = new ArbolAVL();
arbol_avl.insertar(est1);
arbol_avl.insertar(est2);
arbol_avl.insertar(est3);
arbol_avl.insertar(est4);
arbol_avl.insertar(est5);
console.log("hola")