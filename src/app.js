const express = require("express");
const path = require("path");
const { allowedNodeEnvironmentFlags } = require("process");

const app = express();

const indexRouter = require("./routes/indexRouter");
const usersRouter = require("./routes/usersRouter");

// Implementar los metodos PUT y DELETE
/* const methodOverride = require("method-override");
app.use(methodOverride("_method")); */


// Configuracion para capturar los datos que se envian en los formularios (capturarlo en forma de ob. literal)
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static("public"));


app.listen(3021, function(){
    console.log("Servidor corriendo en http://localhost:3021");
})


app.use('/', indexRouter);
app.use('/users', usersRouter);