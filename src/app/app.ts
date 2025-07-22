import express, { Application, Request, Response } from 'express'
import { libraryRouter } from './Controllers/library';

const app:Application=express()

app.use(express.json());

app.use("/api",libraryRouter)
app.get('/',(req:Request,res:Response)=>{
    res.send('Welcome to our library app');

})
export default app;