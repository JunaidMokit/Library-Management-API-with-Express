import express, { Request, Response } from "express"
import { Library } from "../models/library.model";

export const libraryRouter=express.Router();

libraryRouter.post('/books',async(req:Request,res:Response)=>{
    
    try {
        const body=req.body;
        const book=await Library.create(body);
        const { _id, title, author, genre, description, isbn, copies, available, createdAt, updatedAt } = book.toObject();

        res.status(201).json({
            success:true,
            message:"Book created successfully",
            data: {
               _id,
               title,
               author,
               genre,
               isbn,
               description,
               copies,
               available,
               createdAt,
               updatedAt

            }
        })
        
    } catch (error:any) {
        console.log(error);
        res.status(400).json({
            success:false,
            message:error.message,
            error
        })
        
    }

})

libraryRouter.get('/books',async(req:Request,res:Response)=>{
    const data=await Library.find();
    res.status(201).json({
        success:true,
        message:"Books retrieved successfully",
        data
    })
})

libraryRouter.get('/books/:bookId',async(req:Request,res:Response)=>{
    const bookId=req.params.bookId;
    const book=await Library.findById(bookId);
    res.status(201).json({
        success:true,
        message:"Book retrieved successfully",
        data:book
    })
    

})

libraryRouter.get('/',(req:Request,res:Response)=>{
    res.send('Welcome to our library app');

})

libraryRouter.get('/',(req:Request,res:Response)=>{
    res.send('Welcome to our library app');

})
