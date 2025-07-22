import { model, Schema } from "mongoose";
import { ILibrary } from "../Interface/library.interface";
//   title:string,
//     author:string,
//     genre:string,
//     isbn:string,
//     description:string,
//     copies:number,
//     available:true

const librarySchema=new Schema<ILibrary>({
    title:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true,
    },
   genre: {
         type: String,
          enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"]
    },
    isbn:{
       type:String,
       required:true
    },
    description:{
        type:String,
    },
    copies:{
        type:Number,
        required:true
    },
    available:
    {
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
    },
    updatedAt:{
        type:Date
    }

    
},
{
    versionKey:false,
    timestamps:true
}
)

export const Library=model("Library",librarySchema)