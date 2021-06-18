import express from 'express'

const app = express();
app.use(express.json());

let gatos :any[] = [];

app.get('/gatos', (req,res)=>{
    res.json(gatos);
})

app.post('/gatos',(req,res)=>{
    const {id, nombre, raza, edad} = req.body;
    const gato = {      //al tener el mismo nombre no hace falta igualar. 
        id,
        nombre,
        raza,
        edad
    }
    gatos.push(gato);
    res.sendStatus(201)
})

app.get('/gatos/:id', (req,res)=>{
    const id = req.params.id
    const gato = gatos.find(gato=> gato.id === id)
    if(!gato){
        res.sendStatus(404);
    }
    res.json(gato);
})

app.patch('/gatos/:id/raza',(req,res)=>{
    const id = req.params.id
    const gato = gatos.find(gato=> gato.id === id)
    if(!gato){
        res.sendStatus(404);
    }
    
    const {raza} =req.body
    gato.raza = raza
    res.sendStatus(204)

})

app.delete('/gatos/:id',(req,res)=>{
    const id = req.params.id
    const gato = gatos.find(gato=> gato.id === id)
    if(!gato){
        res.sendStatus(404);
    }

    gatos = gatos.filter(gato => gato.id !== id)
    res.sendStatus(200)
})




/*      //Teoria
app.post('/users', (req,res)=>{
    res.send({
        params: req.params,
        queryParams: req.query,
        body: req.body
    })
})*/




app.listen(3333, ()=>{
    console.log("Running on port 3333");
})