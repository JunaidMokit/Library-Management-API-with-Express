import { Model, Document } from "mongoose";


export interface ILibrary{
    title:string,
    author:string,
    genre:string,
    isbn:string,
    description:string,
    copies:number,
    available:boolean,
    createdAt?: Date;  
   updatedAt?: Date; 
}

export interface ILibraryDocument extends ILibrary, Document {
  updateAvailability(): void;
}