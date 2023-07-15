function userLoggedMiddleware (req,res,next){
    res.locals.isLogged = false;   //res.locals son variables que puedo compartir a traves de todas las vistas indist. del controlador

    if (req.session.usuarioLogueado){
        res.locals.isLogged = true;
        res.locals.usuarioLogueado = req.session.usuarioLogueado; //pasa lo que tengo en session a una variable local 
    }

    next();
}

module.exports = userLoggedMiddleware 