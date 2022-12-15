const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type:String,
        default:"",
        required:[true,"El titulo del libro es obligatorio"]
    },
    author: {
        type:String,
        default:"",
        required:[true,"El autor del libro es obligatorio"]
    },
    genre:{
        type:String,
        default:"",
        required:[true,"Debes ingresar el género del libro"]
    },
    summary:{
        type:String,
        default:"",
        required:[true,"Deber ingresar un breve resumen del libro"]
    },
    creatorId:{
        type:String,
        required:[true,"Id de creador es obligatorio"]
    },
    interestId:{
        type:String,
        default:""
    },
    tradesId: {
        type:String,
        default:""
    },
},{timestamps:true});


const Book = mongoose.model("Book",BookSchema);
module.exports = {BookSchema,Book}