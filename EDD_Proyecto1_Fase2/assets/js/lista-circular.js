

class Nodo {
    constructor(accion) {
        this.accion = accion;
        this.siguiente = null;
        this.anterior = null;
    }
}

class ListaCircular{
    constructor(){
        this.cabeza = null;
        this.cola = null;
        this.largo = 0;
    }

    insertar(accion){
        const nodo = new Nodo(accion);
        if (!this.cabeza) {
            this.cabeza = nodo;
            this.cola = nodo;
            nodo.siguiente = nodo;
        }else{
            this.cola.siguiente = nodo;
            nodo.siguiente = this.cabeza;
            this.cola = nodo;
        }
        this.largo = 1;
    }

    graficar() {
        let temp = this.cabeza;
        let conexiones = "";
        let nodos = "";
        let contador = 0;

        while (temp.siguiente != this.cabeza) {
            nodos += `S_${contador}[label=${temp.accion}];\n`;
            conexiones += `S_${contador}->`;
            temp = temp.siguiente;
            contador += 1;
        }
        nodos += `S_${contador}[label=${temp.accion}];\n`;
        conexiones += `S_${contador}->S_0`;
        console.log(nodos, conexiones)
      }
}

let lista = new ListaCircular()

lista.insertar("accion1");
lista.insertar("accion2");
lista.insertar("accion3");
lista.insertar("accion4");

lista.graficar();
