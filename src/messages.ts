export default class Message{
    email:String;
    time: Date;
    msg: String;

    constructor(email:String, time:Date, msg:String){
        this.email = email;
        this.time = time;
        this.msg = msg;
    }

}