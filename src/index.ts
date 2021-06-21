import express from 'express'
import Item from './items'
import { getById } from './functions';
import router from './itemsRouter'
import { string } from 'prop-types';
let path = require('path')
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//MIDDLEWARE 

/*app.use(function(req,res,next){//MIDDLEWARE DE APLICACION ocurre antes de que se procese la ruta. ESto es global, para cada ruta en especifico ver el siguiente
    console.log('Soy una etapa anterior');
    next();
})*/

app.use('/items',function(req,res,next){//MIDDLEWARE con ruta especifica
    
    next();
})

app.get('/index',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public','/index.html'))
})

app.get('/', (req,res)=>{
    res.send("Ingresar a /index para cargar productos  \nIngresar a /items para ver los productos cargados ")
})

app.use('/items', router)
app.use('/',router)
app.use(express.static('public'))

const server = app.listen(8080, ()=>{
    console.log("Running on port 8080");
})
server.on("error", error => console.log(`Error en el servidor ${error}`))