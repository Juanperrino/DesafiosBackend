const fs = require('fs');


class Container {
    constructor(fileName) {
        this.filePath = `./products.txt`;
    }


    //METODO GETALL

    async getAll() {
        try {
            const file = await fs.promises.readFile(this.filePath, 'utf8');
            const elements = JSON.parse(file);

            return elements;

        } catch (error) {
            // console.log(error)
            if (error.code === 'ENOENT') {
                await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3));

                return [];
            }
        }
    }


    //METODO SAVE
    async save(element) {
        try {
            const elements = await this.getAll()

            const id = elements.length === 0 ? 1 : elements[elements.length - 1].id + 1;

            element.id = id;

            elements.push(element)

            await fs.promises.writeFile(this.filePath, JSON.stringify(elements, null, 3));

            return element.id

        } catch (error) {
            console.log(error);
        }
    }


    //METODO GETBYID

    async getById(id) {
        try {
            const elements = await this.getAll()

            const foundElement = elements.find((element) => element.id == id)
            if (foundElement) {
                return foundElement
            } else {
                return null
            }
        } catch (error) {
            console.log(error)
        }
    }


    //METODO DELETEBYID
    async deleteById(id) {
        try {
            const elements = await this.getAll()

            const foundElement = elements.find((element) => element.id == id)

            if (!foundElement) return 'No encontrado'

            const filterElements = elements.filter((element) => element.id != id)

            await fs.promises.writeFile(
                this.filePath,
                JSON.stringify(filterElements, null, 3)
            );

        } catch (error) {
            console.log(error);
        }
    }


    //METODO DELETEALL

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.filePath, JSON.stringify([], null, 3))
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Container;
