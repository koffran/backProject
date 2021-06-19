import express from 'express'
import Item from './items'
import { getById } from './functions';
const router = express.Router();

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

export default router