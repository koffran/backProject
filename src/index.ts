import express from 'express'
import Item from './items'
import { getById } from './functions';
import router from './itemsRouter'
const app = express();

app.use(express.json());

app.use('/', router)

const server = app.listen(8080, ()=>{
    console.log("Running on port 8080");
})
server.on("error", error => console.log(`Error en el servidor ${error}`))