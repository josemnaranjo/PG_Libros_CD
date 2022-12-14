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

        //actualizo el trade con el libro
        const trade = await Trading.findByIdAndUpdate(tradeId,{book2:book},{new:true})

        res.json(trade);

    }catch(err){
        res.status(500).json({
            message:"No hemos podido agregar el libro al trade",
            err
        })
    }
};

module.exports.getOneTrade = async (req,res) => {
    try{
        //obtengo el id del trade donde está alojado el libro
        const result = req.params;
        const tradeId = result.id;
        
        //actualizo el trade con el libro
        const trade = await Trading.findById(tradeId)

        res.json(trade);

    }catch(err){
        res.status(500).json({
            message:"No hemos podido obtener el trade solicitado",
            err
        })
    }
};

