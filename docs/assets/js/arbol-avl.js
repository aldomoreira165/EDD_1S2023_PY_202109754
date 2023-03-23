
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

    //rotaciones
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
            alert("El elemento ya existe en el árbol");
        }
        nodo.altura = this._obtenerAlturaMaxima(this._obtenerAltura(nodo.izquierdo), this._obtenerAltura(nodo.derecho))+1;
        return nodo;
    }


    graficar() {
        console.log("demtro")
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
        nodos += `S_${nodo.estudiante.carnet}[label = "${nodo.estudiante.nombre}"];\n`;
        if (nodo.derecho != null) {
            this._graficarRecursivo(nodo.derecho);
            conexiones += `S_${nodo.estudiante.carnet} -> S_${nodo.derecho.estudiante.carnet};\n`;
        }
    }

    //metodos para recorrer el arbol
    
    inOrder(){
        let html = this._inOrderRecursive(this.raiz);
        return html;
    }

    _inOrderRecursive(nodo){
        let fila = "";
        if(nodo.izquierdo != null){
            fila += this._inOrderRecursive(nodo.izquierdo);
        }
        fila += `
        <tr>
            <th>${nodo.estudiante.carnet}</th>
            <td>${nodo.estudiante.nombre}</td>
            <td>${nodo.estudiante.password}</td>
        </tr>
        `;
        if(nodo.derecho != null){
            fila += this._inOrderRecursive(nodo.derecho);
        }
        return fila;
    }

    preOrder(){
        let html = this._preOrderRecursive(this.raiz);
        return html;
    }

    _preOrderRecursive(nodo){
        let fila = "";
        fila += `
        <tr>
            <th>${nodo.estudiante.carnet}</th>
            <td>${nodo.estudiante.nombre}</td>
            <td>${nodo.estudiante.password}</td>
        </tr>
        `;
        if(nodo.izquierdo != null){
            fila += this._inOrderRecursive(nodo.izquierdo);
        }
        if(nodo.derecho != null){
            fila += this._inOrderRecursive(nodo.derecho);
        }
        return fila;
    }

    postOrder(){
        let html = this._postOrderRecursive(this.raiz);
        return html;
    }

    _postOrderRecursive(nodo){
        let fila = "";
        if(nodo.izquierdo != null){
            fila += this._inOrderRecursive(nodo.izquierdo);
        }
        if(nodo.derecho != null){
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
}

export {ArbolAVL};
