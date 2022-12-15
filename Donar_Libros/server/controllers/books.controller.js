const { Book } = require('../models/books.model');
const { User } = require('../models/user.model');
const { Trading } = require('../models/trading.model');


module.exports.createBook = async (req,res) => {
    try{
        //id de usuario creador se obtiene a través de userState
        const user = req.params;
        const creatorId = user.id;

        //creacion de nuevo libro en "book" collection
        const {title, author, genre, summary} = req.body;
        const newBook = await Book.create({title,author,genre,summary,creatorId});

        //se agrega este nuevo libro al usuario que lo creó
        await User.findByIdAndUpdate(creatorId,{
            $push:{
                myBooks:newBook
            }
        });

        res.json({message:"Exito",title:title,genre:genre,summary:summary})

    }catch(err){
        res.status(500).json({
            message:"No hemos podido crear tu libro",
            err
        })
    }
};

module.exports.getAllBooks = async (req,res) => {
    try{
        const allBooks = await Book.find();
        res.json({allBooks});

    }catch(err){
        res.status(500).json({
            message:"No hemos podido obtener los libros",
            err
        })
    }
};

module.exports.getOneBook = async (req,res) => {
    try{
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        res.json({book});

    }catch(err){
        res.status(500).json({
            message:"No hemos podido obtener el libro",
            err
        })
    }
}

module.exports.addBookOfInterest = async (req,res) => {
    try{
        //obtengo el id del libro que quiero reservar,
        // el id lo obtengo a tráves de los params
        const bookId = req.params.id;
        
        //obtengo el usuario que solicitó la reserva del libro a través de su
        //id. El que obtengo del userState. Lo paso dentro del body
        const result  = req.body;
        const userId = result._id;
        
        //paso el id del solicitante al libro que le interesa
        await Book.findByIdAndUpdate(bookId,{interestId:userId},{new:true});
        //obtengo el libro actualziado
        const book = await Book.findById(bookId);

        // //obtengo el id del creador del libro
        const creatorOfTheBookId = book.creatorId;

        // //y agrego el libro interesado a su campo "MyBooksThatInterestOtherUsers"
        await User.findByIdAndUpdate(creatorOfTheBookId,{
            $push:{myBooksThatInterestOtherUsers:book }
        },{new:true})

        // y lo agrego a su campo "booksImInterested"
        await User.findByIdAndUpdate(userId,{$push: {booksImInterested:book}},{new:true});

        //creo el "trade" con el libro que le interesa al usuario
        const trade = await Trading.create({book1:book});

        //obtengo el id del trade
        const tradeId = trade._id;
        //paso el id del trade al libro que le interesa al usuario
        await Book.findByIdAndUpdate(bookId,{tradesId:tradeId},{new:true});

        res.json({message:"Exito"})

    }catch(err){
        res.status(500).json({
            message:"No hemos podido agregar el libro a tus grupo de interés",
            err
        })
    }
};

module.exports.getAllBooksOfInterestOfAnUser = async (req,res) => {
    try{
        //obtengo el usuario que solicitó la reserva del libro a través de su
        //id. El que obtengo del userState y lo paso como params
        const userId  = req.params.id;
        
        //obtengo toda la información de ese usuario 
        const user = await User.findById(userId);
        //retorno solo el arreglo de los libros que está interesado
        const booksInt = user.booksImInterested;

        res.json(booksInt);

    }catch(err){
        res.status(500).json({
            message:"No hemos podido agregar el libro a tus grupo de interés",
            err
        })
    }
};

module.exports.getAllBooksThatInterestOthers = async (req,res) => {
    try{
        //obtengo el usuario que solicitó la reserva del libro a través de su
        //id. El que obtengo del userState y lo paso como params
        const userId  = req.params.id;
        
        //obtengo toda la información de ese usuario 
        const user = await User.findById(userId);
        //retorno solo el arreglo de los libros que a otros usuarios les interesa
        const booksIntOthers = user.myBooksThatInterestOtherUsers;

        res.json(booksIntOthers);

    }catch(err){
        res.status(500).json({
            message:"No hemos podido agregar el libro a tus grupo de interés",
            err
        })
    }

}

module.exports.getAllBooksCreatedByAnUser = async (req,res) => {
    try{
        //obtengo el usuario que solicitó la reserva del libro a través de su
        //id. El que obtengo del userState y lo paso como params
        const userId  = req.params.id;
        
        //obtengo toda la información de ese usuario 
        const user = await User.findById(userId);
        //retorno solo el arreglo de los libros que obtuvo
        const books = user.myBooks;

        res.json(books);

    }catch(err){
        res.status(500).json({
            message:"No hemos podido agregar el libro a tus grupo de interés",
            err
        })
    }
};

module.exports.deleteBookUserCreator = async (req,res) => {
    try{
        //obtengo el id del libro que quiero borrar a través de params
        const bookId = req.params.id;
        //obtengo el libro 
        const bookToDelete = await Book.findById(bookId);
        //id del creador 
        const idCreator = bookToDelete.creatorId;
        //obtener usuario que creo el libro
        const userCreator = await User.findById(idCreator);
        //obtener el arreglo "myBooksThatInterestOther" 
        const myBooksThatInterestOthers = userCreator.myBooksThatInterestOtherUsers;
        //obtener arreglo "myBooks"
        const myBooks = userCreator.myBooks;
        //filtrar el arreglo "myBooksThatInterestOther"
        const filteredMyBookThatInOthers = myBooksThatInterestOthers.filter(book=> book.id !== bookId);
        //filtar arreglo "myBooks"
        const filteredMyBooks = myBooks.filter(book=> book.id !== bookId);
        //actualizar arreglo "myBooksThatInterestOther" del usuario creador
        await User.findByIdAndUpdate(idCreator,{myBooksThatInterestOtherUsers:filteredMyBookThatInOthers},{new:true});
        //actualizar arreglo "myBook" del usuario creador
        await User.findByIdAndUpdate(idCreator,{myBooks:filteredMyBooks},{new:true})
        //borro el libro de la coleccion "books"
        await Book.findByIdAndDelete(bookId);

        res.json({message:"Exito"});

    }catch(err){
        res.status(500).json({
            message:"No hemos podido eliminar el libro",
            err
        })
    }
};

module.exports.bigDelete = async (req,res) => {
    try{
        //obtengo el id del trade
        const tradeId = req.params.id;

        //obtengo los id's de los usuarios y los libros desde el body
        const { idBookOne , idBookTwo , idUserOne , idUserTwo} = req.body;

        //obtengo el UserOne y todos los campos necesarios
        const userOne = await User.findById(idUserOne);
        const userOneBooksThatInterestOthers = userOne.myBooksThatInterestOtherUsers;
        const userOneMyBooks = userOne.myBooks;

        //obtengo el UserTwo y todos los campos
        const userTwo = await User.findById(idUserTwo);
        const userTwoBooksImInterested = userTwo.booksImInterested;
        const userTwoMyBooks = userTwo.myBooks;

        //filtrar arreglos de userOne
        const filterUserOneBooksThatInterestOthers = userOneBooksThatInterestOthers.filter(book => book.id !== idBookOne);
        const filterUserOneMyBooks = userOneMyBooks.filter(book => book.id !== idBookOne);

        //filtrar arreglos de userOne
        const filterUserTwoBooksImInterested = userTwoBooksImInterested.filter(book => book.id !== idBookOne);
        const filterUserTwoMyBooks = userTwoMyBooks.filter(book => book.id !== idBookTwo);

        //actualizar arreglo "booksThatInterestOther" de userOne
        await User.findByIdAndUpdate(idUserOne,{myBooksThatInterestOtherUsers:filterUserOneBooksThatInterestOthers},{new:true});
        //actualizar arreglo "mybooks" de userOne
        await User.findByIdAndUpdate(idUserOne,{myBooks:filterUserOneMyBooks},{new:true});

        //actualizar arreglo "booksImInterested" de userOne
        await User.findByIdAndUpdate(idUserTwo,{booksImInterested:filterUserTwoBooksImInterested},{new:true});

        //actualizar arreglo "mybooks" de userTwo
        await User.findByIdAndUpdate(idUserTwo,{myBooks:filterUserTwoMyBooks},{new:true});

        //borro los libros
        await Book.findByIdAndDelete(idBookOne);
        await Book.findByIdAndDelete(idBookTwo);

        //borrar trade
        await Trading.findByIdAndDelete(tradeId);

        res.json({message:"Exito"});

    }catch(err){
        res.status(500).json({
            message:"No hemos podido eliminar los libros",
            err
        })
    }
}
