// CRUD
const create = async (collections, data) => {
    try {
        const document = collections.doc()
        await document.create(data)
        console.log("creado !")
    } catch (error) {
        console.error('ERROR AL BUSCAR LOS DOCUMENTOS', error);
    }
}

const findOne = async (collections, id) => {
    try {
        const document = await collections.doc(id).get()
        return document.data()
    } catch (error) {
        console.error('ERROR AL BUSCAR UN DOCUMENTO: ', error)
    }
}

const findAll = async (collections) => {
    try {
        const document = await collections.get()
        return document.docs.map(doc => { return { ...doc.data(), id: doc.id } })
    } catch (error) {
        console.error('ERROR AL CREAR UN DOCUMENTO ', error)
    }
}

const update = async (collections, id, data) => {
    try {
        const document = collections.doc(id)
        await document.update(data)
        console.log("updateado !")
    } catch (error) {
        console.error('ERROR AL ACTUALIZAR EL DOCUMENTO')
    }
}


const remove = async (collections, id) => {
    try {
        const document = collections.doc(id)
        await document.delete()
        console.log("ELIMINADO !");
    } catch (error) {
        console.error('ERROR AL ELIMINAR UN DOCUMENTO ', error)
    }
}


export {
    create,
    findOne,
    findAll,
    update,
    remove
};