const fs = require('fs');

export default class Archivo{
    path:string;
    constructor(path:string){
    this.path = path;
}

async guardar(data:any){

   fs.writeFile(this.path,JSON.stringify(data),(error:Error) =>{
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
        fs.unlink(this.path, (error:Error) =>{
            if (error) {
                console.log(error);
                return;
            }

            console.log('eliminado');
        });
   
}
}