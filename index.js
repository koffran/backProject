const express = require('express') //trae express desde el node_modules
const Archivo = require ('./src/files')
const app = express();// Instancia de express
app.use(express.json())

const fs = require('fs');

let file = new Archivo('productos.txt')
let users;
let visitas = {
    "items": 0,
    "item": 0
}

file.leer().then(val => users = JSON.parse(val))

app.get('/items',(req, res )=>{
    let productsName= users.map(function (item){
        return item.title
    });

    let items ={
        "items": productsName,
        "cantidad": users.length
    }

    visitas.items++;
    res.send(items)//Mando una respuesta
})

 app.get('/item-random',(req, res )=>{
     let random = Math.floor(Math.random()* users.length)

     visitas.item++
     res.send(users[random])
 })

app.get('/visitas',(req,res)=>{
    res.send(visitas)  
})

const server =app.listen('3030', ()=>{
    console.log("El servidor esta arriba")
})
server.on("error", error => console.log(`Error en el servidor ${error}`))