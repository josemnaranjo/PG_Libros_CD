const { Book } = require('../models/books.model');
const { User } = require('../models/user.model');
const { Trading } = require('../models/trading.model');


module.exports.addToTrade = async (req,res) => {
    try{
        //obtengo el id del usuario que creó libro 1
        const userId = req.params.id
        const user = await User.findById({_id:userId});

        console.log(user)

        res.json()

    }catch(err){
        res.status(500).json({
            message:"No hemos podido agregar el libro al trade",
            err
        })
    }
}