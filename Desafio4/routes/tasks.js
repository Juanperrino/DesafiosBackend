const { Router } = require('express')//requerimos Router de express
const router = Router();// lo inicializamos
const CRUD = require('../server/index'); //requerimos la clase CRUD
const tareasFunction = new CRUD('db.txt');// guardamos en variable una nueva clase CRUD y le pasamos por param el path de la base de datos.


router.get("/list", async (req, res) => { //A router le decimos que vamos a tener un metodo get que va a ser /list
    const tasks = await tareasFunction.getAll() //encerramos en variable todos los archivos con la variable tareasFunction mas el metodo getAll()
    res.render("tasks/list", { //Renderizamos en esa ruta tasks/list
        tasks,
    });
});
//SIEMPRE QUE ES GET ES PARA DEVOLVER ALGO, (en este caso es enviar el form)
router.get("/edit/:id", async (req, res) => { //Otro metodo get que va a ser /edit
    try {

        const { id } = req.params;
        const task = await tareasFunction.getById(id) //encerramos en variable tareasFunction con el metodo getById y le pasamos id por param

        const formInfo = {
            botonName: "Actualizar",
            metodo: "POST",
            url: "/api/productos/edit/" + id
        }

        return res.render("tasks/create", { task, ...formInfo }); //Retornamos un render en la ruta tasks/create

    }
    catch (errors) {
        console.log({ errors })
    }

});

router.get("/create", (req, res) => { //Aca tenemos un get para crear, osea que va a ser un form tambien

    const formInfo = {
        botonName: "Crear",
        metodo: "POST",
        url: "/api/productos/create/"
    }

    res.render("tasks/create", formInfo); //Renderizamos el hbs en la ruta tasks/create
});

router.get("/delete/:id", async (req, res) => { // Router get de delete
    try {

        const { id } = req.params;
        await tareasFunction.delete(id) //A la variable tareasFunction le pasamos el metodo delete() y el id por param
        res.redirect("/api/productos/list"); // Finalmente redireccionamos a la ruta tasks/list
    }
    catch (errors) {
        console.log({ errors });;
    }
});

router.post("/create", async (req, res) => { // Tenemos un router post para crear 
    try {
        const { title, price, description } = req.body; //Obtengo los datos
        await tareasFunction.create({ title, price, description }) // usamos la variable tareasFunction con el metodo create y le pasamos los 2 params que solicita la function
        res.redirect("/api/productos/list"); // Finalmente despues de crear la tarea redireccionamos a la ruta tasks/list
    } catch (errors) {
        console.log(errors);
    }
});

router.post("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params; //obtengo el id
        const { title, description } = req.body; // obtengo los datos
        await tareasFunction.modify(id, { title, description })// aplico metodo modify y le paso los parametros
        res.redirect("/api/productos/list");
    } catch (errors) {
        console.log({ errors })
    }
});

module.exports = router; // Exportamos el modulo 


