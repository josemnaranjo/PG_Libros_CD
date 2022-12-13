const {User} = require("../models/user.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.Register = async(req,res) => {
    try{
        const user = new User (req.body);
        await user.save()

        const jwtToken = jwt.sign({_id:user._id},process.env.SECRET_KEY)

        return res.cookie("usertoken",jwtToken,process.env.SECRET_KEY,{httpOnly:true})
                .json({message:"",email:user.email,_id:user._id})
    }catch(err){
        res.json({message:"Algo salio mal",errors:err.errors});
    }
}

module.exports.Login = async(req,res) => {
    try{
        const {admin} = req.body; 
        const user = await User.findOneAndUpdate({email:req.body.email},{admin:admin},{new:true});

        if(user===null){
            res.json({errors:{error:{message:"El usuario no existe en la base de datos"}}})
        }


        const correctPassword = await bcrypt.compare(req.body.password,user.password);

        if(!correctPassword){
            return res.json({errors:{error:{message:"La contraseña es incorrecta"}}})
        }

        const jwtToken = jwt.sign({id:user._id},process.env.SECRET_KEY);

        return res.cookie("usertoken",jwtToken,process.env.SECRET_KEY,{httpOnly:true})
        .json({message:"",email:user.email,_id:user._id})

    }catch(err){
        res.json({message:"Algo salio mal",errors:err.errors});
    }
}

module.exports.Logout = async(req,res) => {
    try{
        res.clearCookie("usertoken");
        res.json({success:true})
    }catch(err){
        return({success:false,data:err.message})
    }
}

module.exports.getAll = (request, response) => {
    User.find({})
      .then((users) => response.json(users))
      .catch((err) => response.json(err));
  };

module.exports.getUser = async(req,res) => {
    try{
        const {id}=req.params
        const {email,firstName,lastName,_id,admin} = await User.findById(id).exec();
        res.json({email,firstName,lastName,_id,admin})
    }catch(err){
        return{success:false,data:err.message}
    }
}