const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
const { BookSchema } = require('../models/books.model');


const UserSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:[true,"El nombre es obligatorio"]
    },
    lastName: {
        type:String,
        required:[true,"El apellido es obligatorio"]
    },
    email:{
        type:String,
        required:[true,"El email es obligatorio"],
        validate:{
            validator:(val)=>/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message:"Por favor ingresa un correo valido"
        },
        unique:true
    },
    password:{
        type:String,
        required:[true,"Por favor ingresar contraseña"],
        minlength:[8,"La contraseña debe tener minimo 8 caracteres"],
    },
    myBooks: [BookSchema],
    booksImInterested: [BookSchema],
    myBooksThatInterestOtherUsers: [BookSchema],


},{timestamps:true});

UserSchema.plugin(uniqueValidator,{message:"Error,este correo ya existe"});

UserSchema.virtual("confirmPassword")
    .get(()=>this._confirmPassword)
    .set((value)=>(this._confirmPassword=value))

UserSchema.pre("validate",function(next){
    if(this.isNew && this.password !== this["confirmPassword"]){
        this.invalidate("confirmPassword","Las contraseñas deben ser iguales")
    }
    next();
})

UserSchema.pre("save",function(next){
    if(this.isNew){
        bcrypt.hash(this.password,10).then((hash)=>{
            console.log("HASH ",hash)
            this.password=hash
            next()
        })
    }else{
        next();
    }
})

const User = mongoose.model("User",UserSchema);
module.exports= {UserSchema,User}