import { model, Schema } from "mongoose";
import { ILibrary, ILibraryDocument } from "../Interface/library.interface";
//   title:string,
//     author:string,
//     genre:string,
//     isbn:string,
//     description:string,
//     copies:number,
//     available:true

const librarySchema=new Schema<ILibraryDocument>({
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
        required:true,
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
// librarySchema.methods.updateAvailability = function (this: ILibrary) {
//   if (this.copies <= 0) {
//         this.available = false;
//   } else {
//     this.available = true;
//   }
// };
librarySchema.methods.updateAvailability = function (this: ILibraryDocument) {
  this.available = this.copies > 0;
};
export const Library=model<ILibraryDocument>("Library",librarySchema)