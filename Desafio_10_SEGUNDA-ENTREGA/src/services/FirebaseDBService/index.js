// config conexion
import { conect } from '../../db/conection.js';
import {
    create,
    findOne,
    findAll,
    update,
    remove
} from '../../Containers/FirebaseDBContainer.js';

conect().then(db => {

    const collections = db.collection('products')
    //mostrar
    findAll(collections).then(datos => console.log(datos))

    //crear
    // create(collections, {
    //     title: "Video",
    //     description: "placas de video",
    //     code: "527",
    //     price: 589,
    //     stock: 5,
    //     thumbnail: "urll"
    // })
    //eliminar
    // remove(collections, 'EFxtqOiKxDGCjZgkeYnR').then(
    //     findAll(collections).then(datos => console.log(datos))
    // )

    //Update
    update(collections, 'xtitg1JLg0qgnyvCEjme', { title: "videoACTUALIZADO" }).then(
        findAll(collections).then(datos => console.log(datos))
    )
});