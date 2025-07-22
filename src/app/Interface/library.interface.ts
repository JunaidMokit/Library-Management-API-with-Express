

export interface ILibrary{
    title:string,
    author:string,
    genre:string,
    isbn:string,
    description:string,
    copies:number,
    available:true,
    createdAt?: Date;  
   updatedAt?: Date; 
}