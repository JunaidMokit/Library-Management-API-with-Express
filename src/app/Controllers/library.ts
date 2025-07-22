import express, { Request, Response } from "express"
import { Library } from "../models/library.model";
import { Borrow } from "../models/borrow.model";


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

// libraryRouter.get('/books',async(req:Request,res:Response)=>{
//     const data=await Library.find();
//     res.status(201).json({
//         success:true,
//         message:"Books retrieved successfully",
//         data
//     })
// })

libraryRouter.get('/books', async (req: Request, res: Response) => {
  try {
    const filter = req.query.filter as string; // genre filter
    const sortBy = (req.query.sortBy as string) || "createdAt";
    const sortOrder = (req.query.sort as string) === "asc" ? 1 : -1;
    const limit = parseInt(req.query.limit as string) || 10;

    const query: any = {};
    if (filter) {
      query.genre = filter.toUpperCase(); 
    }

    const data = await Library.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
});


libraryRouter.get('/books/:bookId',async(req:Request,res:Response)=>{
    const bookId=req.params.bookId;
    const book=await Library.findById(bookId);
    res.status(201).json({
        success:true,
        message:"Book retrieved successfully",
        data:book
    })
    

})

libraryRouter.patch('/books/:bookId',async(req:Request,res:Response)=>{
    const bookId=req.params.bookId;
    const updateBody=req.body;
    const book=await Library.findByIdAndUpdate(bookId,updateBody)

    res.status(201).json({
        success:true,
        message:"Book updated successfully",
        data:book
    })


})

libraryRouter.delete('/books/:bookId',async(req:Request,res:Response)=>{
   const bookId=req.params.bookId;
   const book=await Library.findByIdAndDelete(bookId);
   res.status(201).json({
        success:true,
        message:"Book deleted successfully",
        data:null
    })


})

libraryRouter.post('/borrow', async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    const book = await Library.findById(bookId);
    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    if (book.copies < quantity) {
      return res.status(400).json({ success: false, message: "Not enough copies available" });
    }

    book.copies -= quantity;
    book.updateAvailability(); //  instance method
    await book.save();

    const borrow = await Borrow.create({ book: bookId, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: "Book borrowed successfully",
      data: borrow,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error", error });
  }
});


libraryRouter.get('/borrow', async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $lookup: {
          from: "libraries", 
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails"
        }
      },
      {
        $unwind: "$bookDetails"
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn"
          },
          totalQuantity: 1
        }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      data: summary
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    });
  }
});



libraryRouter.get('/',(req:Request,res:Response)=>{
    res.send('Welcome to our library apps');

})
