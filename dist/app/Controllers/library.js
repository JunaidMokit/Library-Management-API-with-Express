"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.libraryRouter = void 0;
const express_1 = __importDefault(require("express"));
const library_model_1 = require("../models/library.model");
const borrow_model_1 = require("../models/borrow.model");
exports.libraryRouter = express_1.default.Router();
exports.libraryRouter.post('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const book = yield library_model_1.Library.create(body);
        const { _id, title, author, genre, description, isbn, copies, available, createdAt, updatedAt } = book.toObject();
        res.status(201).json({
            success: true,
            message: "Book created successfully",
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
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    }
}));
// libraryRouter.get('/books',async(req:Request,res:Response)=>{
//     const data=await Library.find();
//     res.status(201).json({
//         success:true,
//         message:"Books retrieved successfully",
//         data
//     })
// })
exports.libraryRouter.get('/books', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = req.query.filter; // genre filter
        const sortBy = req.query.sortBy || "createdAt";
        const sortOrder = req.query.sort === "asc" ? 1 : -1;
        const limit = parseInt(req.query.limit) || 10;
        const query = {};
        if (filter) {
            query.genre = filter.toUpperCase();
        }
        const data = yield library_model_1.Library.find(query)
            .sort({ [sortBy]: sortOrder })
            .limit(limit);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error
        });
    }
}));
exports.libraryRouter.get('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield library_model_1.Library.findById(bookId);
    res.status(201).json({
        success: true,
        message: "Book retrieved successfully",
        data: book
    });
}));
exports.libraryRouter.patch('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const updateBody = req.body;
    const book = yield library_model_1.Library.findByIdAndUpdate(bookId, updateBody);
    res.status(201).json({
        success: true,
        message: "Book updated successfully",
        data: book
    });
}));
exports.libraryRouter.delete('/books/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookId = req.params.bookId;
    const book = yield library_model_1.Library.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null
    });
}));
exports.libraryRouter.post('/borrow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book: bookId, quantity, dueDate } = req.body;
        const book = yield library_model_1.Library.findById(bookId);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        if (book.copies < quantity) {
            return res.status(400).json({ success: false, message: "Not enough copies available" });
        }
        book.copies -= quantity;
        book.updateAvailability(); //  instance method
        yield book.save();
        const borrow = yield borrow_model_1.Borrow.create({ book: bookId, quantity, dueDate });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            data: borrow,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error", error });
    }
}));
exports.libraryRouter.get('/borrow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summary = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error
        });
    }
}));
exports.libraryRouter.get('/', (req, res) => {
    res.send('Welcome to our library apps');
});
