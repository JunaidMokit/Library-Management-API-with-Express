import express, { Application, Request, Response } from 'express'
import { libraryRouter } from './src/app/Controllers/library';
import { globalErrorHandler } from './src/app/error/error.middleware';
// import { libraryRouter } from './Controllers/library';
// import { globalErrorHandler } from './error/error.middleware';

const app:Application=express()

app.use(express.json());


app.use("/api",libraryRouter)

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "API route not found",
  });
});
app.use(globalErrorHandler);


app.get('/',(req:Request,res:Response)=>{
    res.send('Welcome to our library app');

})
export default app;