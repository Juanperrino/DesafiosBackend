const express = require('express');
const { create } = require('express-handlebars');
const indexRoutes = require('./routes/index')
const tasksRoutes = require('./routes/tasks')
const app = express();
const PORT = 8080;

const hbs = create({
    extname: ".hbs",
    helpers: {
    }
});


app.engine('.hbs', hbs.engine);

app.set('view engine', '.hbs');

app.set('views', './views');

app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoutes);
app.use("/api/productos", tasksRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})