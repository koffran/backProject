import express,{Request,Response} from 'express'
import Item from './items'
import { getById } from './functions';
import router from './itemsRouter'
import { NextFunction } from 'express-serve-static-core';
import { Socket } from 'socket.io';
//import { string } from 'prop-types';
let path = require('path')
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({extended:true}))


io.on('connection', (socket:Socket)=>{
    console.log(socket.id);
    socket.emit('prueba',"mensaje de prueba")

    socket.on('product created', (data:any)=>{
        console.log(data)
    })
})







app.get('/index',(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,'../public','/index.html'))
})

app.get('/', (req:Request,res:Response)=>{
    res.send("Ingresar a /index para cargar productos  \nIngresar a /items para ver los productos cargados ")
})


app.use('/items',function(req:Request,res:Response,next:NextFunction){//MIDDLEWARE con ruta especifica
    
    next();
})
app.use('/items', router)
app.use('/',router)
app.use(express.static('public'))

const server = http.listen(8080, ()=>{
    console.log("Running on port 8080");
})
server.on("error", (error: any) => console.log(`Error en el servidor ${error}`))