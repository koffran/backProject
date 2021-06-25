import express,{Request,Response} from 'express'
import Item from './items'
import { getById } from './functions';
import router from './itemsRouter'
import { NextFunction } from 'express-serve-static-core';
import { Socket } from 'socket.io';

let path = require('path')
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.urlencoded({extended:true}))

let items:Item[] = [];

router.get('/items', (req,res)=>{
    items.length === 0? 
    res.send({error: 'no hay productos cargados'})
    :
    res.json(items);
})

router.post('/items',(req,res)=>{
    const {title, price, thumbnail} = req.body;
    let item = new Item(title,price,thumbnail, items.length+1)
    items.push(item);
    res.sendStatus(201);
})

router.get('/items/:id', (req,res)=>{
    const item = getById(items,parseInt(req.params.id))
    if(items.length === 0){
        res.status(404).send({error: 'producto no encontrado'})
    }
    res.json(item);
})

router.patch('/items/:id/thumbnail',(req,res)=>{
    const item = getById(items,parseInt(req.params.id))
    if(item === undefined){
        res.sendStatus(404);
    }
    else
    {
        const {thumbnail} = req.body;
        item.thumbnail = thumbnail;
        res.sendStatus(204)
    }
})

router.delete('/items/:id',(req,res)=>{
    const id =parseInt(req.params.id);
    const item = getById(items,id)
    if(item === undefined){
        res.sendStatus(404);
    }
    else
    {
        items = items.filter(item => item.id !== id)
        res.sendStatus(200)
    }
})



io.on('connection', (socket:Socket)=>{
    console.log(socket.id);
    socket.emit('Items',items)

    socket.on('product created', (data:any)=>{
        const {title, price, thumbnail} = data;
        let item = new Item(title,price,thumbnail, items.length+1)
        items.push(item);

        io.sockets.emit('addProduct',item)
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