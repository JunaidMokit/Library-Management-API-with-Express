import {Server} from 'http'
import mongoose from 'mongoose';
import app from './app';
// DNS2bnld2TkJQkqU
//mongodb+srv://JunaidRahman:<db_password>@cluster0.hturdn4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
let server:Server;
const PORT=5000;
async function main(){
    try {
        await mongoose.connect('mongodb+srv://JunaidRahman:DNS2bnld2TkJQkqU@cluster0.hturdn4.mongodb.net/libraryManage?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Connect to mongoDB useing Mongoose")

        server=app.listen(PORT,()=>{
            console.log(`App is listening on port ${PORT}`)
        })
        
    } catch (error) {
        console.log(error)
    }
}

main()