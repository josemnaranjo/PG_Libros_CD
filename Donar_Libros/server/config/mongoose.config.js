const mongoose = require("mongoose");

mongoose.connect(process.env.DB_LINK , {
    useNewUrlParser: true,
	useUnifiedTopology: true,
})
    .then(()=>console.log("CONEXION CON BASE DE DATOS ESTABLECIDA"))
    .catch(err=> console.log("PROBLEMAS CON CONECTARSE A LA BASE DE DATOS ",err))