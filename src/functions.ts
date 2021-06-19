import Item from "./items";
const getById= (items:Item[],id:number)=>{
    const item = items.find(item=> item.id === id)
    return item;
}

export {getById};