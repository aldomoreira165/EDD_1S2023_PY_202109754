
class Tnode {
    constructor(folderName) {
        this.folderName = folderName;
        this.children = []; //nodos hijos
        this.id = null;
    }
}

class arbolMulticamino {
    constructor() {
        this.root = new Tnode('/');
        this.root.id = 0;
        this.size = 1; //generar id
    }

    insert(folderName, fatherPath) {
        let newNode = new Tnode(folderName);
        let fatherNode = this._getFolder(fatherPath);

        if (fatherNode) {
            if (fatherNode.children.some(child => child.folderName == folderName)) {
                newNode.folderName = "Copia " + folderName;
            }
            this.size += 1;
            newNode.id = this.size;
            fatherNode.children.push(newNode);
        } else {
            console.log("No existe la ruta")
        }
    }

    _getFolder(path) {
        if (path == this.root.folderName) {
            return this.root;
        } else {
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter(str => str !== '');
            let folder = null;
            while (folders.length > 0) {
                let currentFolder = folders.shift()
                folder = temp.children.find(child => child.folderName == currentFolder);
                if (typeof folder == 'undefined' || folder == null) {
                    return null;
                }
                temp = folder;
            }
            return temp;
        }
    }

    graph(){
        let nodes = "";
        let connections = "";

        let node = this.root;
        let queue = [];
        queue.push(node);
        while(queue.length !== 0){
            let len = queue.length;
            for(let i = 0; i < len; i ++){
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.folderName}"];\n`;
                node.children.forEach( item => {
                    connections += `S_${node.id} -> S_${item.id};\n`
                    queue.push(item);
                });
            }
        }
        return 'node[shape="record"];\n' + nodes +'\n'+ connections;
    }

    getHTML(path){
        let node = this._getFolder(path);
        let code = "";
        node.children.map(child => {
            code += `<div id="${child.folderName}" class="btnCarpeta">
                        <div id="img-carpeta">
                            <a><i class="fas fa-folder"></i></a>
                         </div>
                        <div id="nombre-carpeta">
                            <p>${child.folderName}</p>
                         </div>
                    </div>`
        })
        return code;
    }


}

export {arbolMulticamino};

/*let arbol = new arbolMulticamino();

arbol.insert('Documentos', '/');
arbol.insert('Pics', '/');
arbol.insert('Docu', '/');
arbol.insert('Pruebas', '/Documentos');
arbol.insert('Prueba1', '/Documentos/Pruebas');
arbol.insert('Prueba2', '/Documentos/Pruebas');

console.log(arbol.graph());*/
