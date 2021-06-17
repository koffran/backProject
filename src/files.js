const fs = require('fs');

 exports.a = class Archivo{
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