const { Book } = require('../models/books.model');
const { User } = require('../models/user.model');
const { Trading } = require('../models/trading.model');


module.exports.addToTrade = async (req,res) => {
    try{
        //obtengo el id del trade donde está alojado el libro
        const result = req.params;
        const tradeId = result.id;
        //obtengo el libro que quiero pasarle al trade
        const book = req.body;
        // console.log(book,tradeId);

        //actualizo el trade con el libro
        const trade = await Trading.findByIdAndUpdate(tradeId,{book2:book},{new:true})

        res.json(result);
        // res.json("hola");

    }catch(err){
        res.status(500).json({
            message:"No hemos podido agregar el libro al trade",
            err
        })
    }
}