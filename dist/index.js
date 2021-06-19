"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
var gatos = [];
app.get('/gatos', function (req, res) {
    res.json(gatos);
});
app.post('/gatos', function (req, res) {
    var _a = req.body, id = _a.id, nombre = _a.nombre, raza = _a.raza, edad = _a.edad;
    var gato = {
        id: id,
        nombre: nombre,
        raza: raza,
        edad: edad
    };
    gatos.push(gato);
    res.sendStatus(201);
});
app.get('/gatos/:id', function (req, res) {
    var id = req.params.id;
    var gato = gatos.find(function (gato) { return gato.id === id; });
    if (!gato) {
        res.sendStatus(404);
    }
    res.json(gato);
});
app.patch('/gatos/:id/raza', function (req, res) {
    var id = req.params.id;
    var gato = gatos.find(function (gato) { return gato.id === id; });
    if (!gato) {
        res.sendStatus(404);
    }
    var raza = req.body.raza;
    gato.raza = raza;
    res.sendStatus(204);
});
app.delete('/gatos/:id', function (req, res) {
    var id = req.params.id;
    var gato = gatos.find(function (gato) { return gato.id === id; });
    if (!gato) {
        res.sendStatus(404);
    }
    gatos = gatos.filter(function (gato) { return gato.id !== id; });
    res.sendStatus(200);
});
/*      //Teoria
app.post('/users', (req,res)=>{
    res.send({
        params: req.params,
        queryParams: req.query,
        body: req.body
    })
})*/
app.listen(3333, function () {
    console.log("Running on port 3333");
});
