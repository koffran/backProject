export default class Item{
    title:string;
    price:Number;
    thumbnail:string;
    id:number;

    constructor(title:string, price:Number, thumbnail:string, id:number){
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id;
    }    
}

