const express = require('express') //trae express desde el node_modules
const casual = require('casual')
const app = express();// Instancia de express
app.use(express.json())

const fs = require('fs');

 class Archivo{
         constructor(path){
             this.path = path;
         }
    
         async guardar(data){
            data.forEach((element, i) => {
                element.id = i+1;
            });
            fs.writeFile(this.path,JSON.stringify(data),(error) =>{
                if(error){
                    console.log(error);
                    return
                }
                console.log("Grabado");
            });                          
         }
    
         async leer(){
             try{
                const data = await fs.promises.readFile(this.path,'utf-8')
                return data;

             }catch {
                 return [];
             }        
         }
    
         async borrar(){
                 fs.unlink(this.path, error =>{
                     if (error) {
                         console.log(error);
                         return;
                     }
    
                     console.log('eliminado');
                 });
         }
     }

let file = new Archivo('./productos.txt')
const users =file.leer()


app.get('/',(req, res )=>{

    res.send(users)//Mando una respuesta
})

app.get('/:id',(req, res )=>{
    users.forEach(element => {
        if(element.id.localeCompare(req.params.id)=== 0)//el req puede acceder a los parametros que pase por la ruta
        {
            res.send(element) // con el res mando el dato que necesite como respuesta
        }
    });
})

app.post('/',(req,res)=>{
  console.log(req.body)  
  users.unshift(req.body)
  res.sendStatus(200)
})

const server =app.listen('3030', ()=>{
    console.log("El servidor esta arriba")
})
server.on("error", error => console.log(`Error en el servidor ${error}`))