const express = require("express");
const bodyParser = require("body-parser"); // esto es refrente al formato ue va a recibir (structura del contenido)
const Joi = require('@hapi/joi');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse application/json 

app.listen(3000, () => {
    console.log("corriendo en el puerto 3000");
});

app.get("/", (req, res) => { //endpoint using HTTP method GET
    res.send("Bienvenido al microservicio");
})

app.post("/test", (req, res) => { //endpoit using HTTP method POST
    console.log(req.body); //array de numeros

    const schema = Joi.object({ //que hace este bloque?
        numeros:
            Joi.array().items(Joi.number()).required()

    }); //dentro declare el schema

    const resultado = schema.validate(req.body);
    console.log(resultado);

    if (resultado.error) {
        res.status(422).json({
            data: '',
            errors: ['invalid_data_format']
        })

    }

    //esto debe ir en otro servicio --- en el controlador de del negocio (la parte logica)
    const suma = req.body.numeros.reduce((sum, value) => sum + parseInt(value), 0);
    const resta = req.body.numeros.reduce((sum, value) => sum - value, 0);
    const multiplicacion = req.body.numeros.reduce((sum, value) => sum * value, 1);
    const division = req.body.numeros.reduce((sum, value) => sum / value, 1);
    res.status(200).json({
        data: {
            suma,
            resta,
            multiplicacion,
            division,
            errors: []
        }

    }); //req: mando el array de numeros
    
//


})

