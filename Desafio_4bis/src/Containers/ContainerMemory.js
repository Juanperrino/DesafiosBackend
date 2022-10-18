class ContainerMemory {
    constructor() {
        this.elements = [];
    }

    // METODOS

    // getAll Method
    getAll() {
        return this.elements;
    }

    // Save Method
    save(element) {
        element.id = !this.elements.length ? 1 : this.elements[this.elements.length - 1].id + 1;

        this.elements.push(element);

        return element;
    }

    //Get by id Method
    getById(id) {
        return this.elements.find(element => element.id === id);
    }


    // Update Method
    updateById(id, newData) {
        // Con findIndex buscamos el elemento en el array, devuelve -1 si no lo encuentra
        const elementIndex = this.elements.findIndex((element) => element.id == id);
        // Validamos con el -1 que nos devuelve el findIndex para el caso que no lo encuentr
        if (elementIndex === -1) return { error: true };

        // En caso que lo encuentre
        //accedemos a los datos de la memoria en la posicion que se guardo en elementIndex, de esa manera ya estariamos accediendo al elemento

        // Lo podemos sobreescribir completamente
        // Podemos copiar las propiedades que ya tiene y pegar las nuevas
        // O podemos recorrer ese elemento y por cada propiedad actualizar segun la que llegue

        this.elements[elementIndex] = {
            //Aca estamos sobreescribiendo el objeto que ya tiene por uno nuevo
            //Copiando todas las propiedades del original y los nuevos
            // El problema de esta forma es que si en newData recibimos propiedades distintas las vamos a copiar al nuevo objeto. 
            //Lo mejor seria recorrer cada propiedad del objeto existente y a apartir de esas propiedades buscarlas en el objeto que nos llega y ahi si actualizarlas
            ...this.elements[elementIndex],
            ...newData
        }
        //Mejor forma de hacerlo recorriendo y reemplazando los que matchean
        // Por cada key del objeto newData
        // for (const key in newData) {

        //Si esa key existe en this.elements[key] en la posicion key
        // if (this.elements[elementIndex]) {
        // entonces sobreescribimos ese elemento con esa key en newData[key] en esa misma posicion.
        // this.elements[key] = newData[key]
        // }

        // }

        return this.elements[elementIndex]


    }


    // Delete Method
    deleteById(id) {
        this.elements.filter(element => element.id != id);
        return { success: true }
    }


};


export { ContainerMemory };