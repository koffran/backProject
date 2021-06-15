const express = require('express') //trae express desde el node_modules
const casual = require('casual')
const app = express();// Instancia de express
app.use(express.json())
const users =[]

for(let i=0; i<20; i++){
    users.push(
        {
            id: casual.uuid,
            username: casual.username,
            password: casual.password
        }
    )
}



app.get('/',(req, res )=>{
    res.send(users)//Mando una respuesta
})

app.get('/:id',(req, res )=>{
    console.log(req.params.id)//el req puede acceder a los parametros que pase por la ruta
    
})


app.post('/',(req,res)=>{
  console.log(req.body)  
  users.unshift(req.body)
  res.sendStatus(200)
})

app.listen('3030', ()=>{
    console.log("El servidor esta arriba")
})