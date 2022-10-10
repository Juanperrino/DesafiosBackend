const fs = require('fs');

class CRUD {
    constructor(fileName) {
        this.fileName = __dirname + '/' + fileName;
    }


    //METODOS

    //Generador de Id
    generateId() {
        return new Date().getTime().toString()
    }

    // CREATE un objeto
    async create(obj) {
        try {
            const readFile = await this.getAll();//obtengo todos los archivos
            obj.id = this.generateId();//les genero un id
            readFile.push(obj);//agregar los id al obj pasado por param
            this.writeData(readFile);//escribo el archivo con los id generados
            return obj;//retorno el archivo completo con los id generados
        } catch (error) {
            console.log(error);
        }
    }


    //READ - Para obtener el objeto con el Id buscado
    async getById(id) {
        try {
            const objects = await this.getAll();//agarro todos mis archivos
            const obj = objects.find(el => el.id == id);//busco en el array el id que coincida con el id pasado por parametro
            return obj ? obj : null;//si el id hizo match con uno del array entonces obj es true y si es true retorno el obj, sino un null
        } catch (error) {
            console.log(error);
        }
    }


    //UPDATE un objeto
    async modify(id, objMod) {
        try {
            objMod["id"] = id //El parametro objMod en la posicion "id" va a ser guardado en id (Resume un id)
            const elementos = await this.getAll();//obtengo todos los elementos
            const obj = elementos.find(el => el.id == id);//busco y comparo con el id resumido y lo guardo en obj
            if (!obj)//si es true entra en throw
                throw new Error('No existe el id' + id);
            const elementosModificados = elementos.map(item => {//con un map recorro todos los elementos 
                if (item.id == id)//el que tenga el id igual al id que tengo guardado
                    return objMod//retorno lo que le mande
                return item// sino retorno lo mismo que ya tenia antes
            })
            this.writeData(elementosModificados);//Una vez resuelto el map reescribimos el archivo
            return objMod// y retornamos el objeto modificado
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }


    // READ - Devuelve un array con los objetos presentes en el archivo
    async getAll() {
        try {
            const data = await this.readData(this.fileName);
            return data;
        } catch (error) {
            return []
        }
    }


    //REMOVE - Elimina del archivo el objeto con el ID buscado
    async delete(id) {
        try {
            const objects = await this.getAll();//Obtengo todos los archivos
            const filterObjects = objects.filter(el => el.id != id);//Filtro por todos los que el id sea distinto y lo guardo en la variable filterObjects(armo un nuevo arreglo)
            this.writeData(filterObjects);//Y guardo ese arreglo
        } catch (error) {
            throw new Error(error)
        }
    }


    // --------------------FUNCIONES USO INTERNO---------------------------
    // Funciones de fileSystem Leer y Escribir
    readData(path) {
        const data = JSON.parse(fs.readFileSync(path, 'utf-8') || '[]');
        return data;
    }
    writeData(objects) {
        fs.writeFileSync(this.fileName, JSON.stringify(objects, null, 2));
    }
}

module.exports = CRUD;