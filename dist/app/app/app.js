"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const library_1 = require("../Controllers/library");
const error_middleware_1 = require("../error/error.middleware");
// import { libraryRouter } from './Controllers/library';
// import { globalErrorHandler } from './error/error.middleware';
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api", library_1.libraryRouter);
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API route not found",
    });
});
app.use(error_middleware_1.globalErrorHandler);
app.get('/', (req, res) => {
    res.send('Welcome to our library app');
});
exports.default = app;
