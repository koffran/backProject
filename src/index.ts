import express from 'express'
import Item from './items'
import { getById } from './functions';

const app = express();
app.use(express.json());

let items:Item[] = [];

app.get('/items', (req,res)=>{
    items.length === 0? 
    res.send({error: 'no hay productos cargados'})
    :
    res.json(items);
})

app.post('/items',(req,res)=>{
    const {title, price, thumbnail} = req.body;
    let item = new Item(title,price,thumbnail, items.length+1)
    items.push(item);
    res.sendStatus(201);
})

app.get('/items/:id', (req,res)=>{
    const item = getById(items,parseInt(req.params.id))
    if(items.length === 0){
        res.status(404).send({error: 'producto no encontrado'})
    }
    res.json(item);
})

app.patch('/items/:id/thumbnail',(req,res)=>{
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

app.delete('/items/:id',(req,res)=>{
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




/*      //Teoria
app.post('/users', (req,res)=>{
    res.send({
        params: req.params,
        queryParams: req.query,
        body: req.body
    })
})*/




const server = app.listen(8080, ()=>{
    console.log("Running on port 8080");
})
server.on("error", error => console.log(`Error en el servidor ${error}`))