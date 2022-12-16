const UserController = require('../controllers/user.controller');
const BookSchema = require('../controllers/books.controller');
const TradingSchema = require('../controllers/trades.controller')
const authenticate = require('../config/authenticate');


module.exports = app => {

     //USUARIO
    app.post("/api/register",UserController.Register);
    app.post("/api/login",UserController.Login);
    app.post("/api/logout",UserController.Logout);
    app.get("/api/users",authenticate,UserController.getAll);
    app.get("/api/user/:id",authenticate,UserController.getUser);
    /* app.put("/api/user/:id",UserController.putUser) */


     //BOOKS
    app.post('/api/books/new/:id',authenticate,BookSchema.createBook);
    app.get('/api/books/get-all',BookSchema.getAllBooks);
    app.get('/api/books/get-one/:id',authenticate,BookSchema.getOneBook);
    app.post('/api/books/add-to-interest/:id',authenticate,BookSchema.addBookOfInterest);
    app.get('/api/books/find-books-of-interest-of-an-user/:id',authenticate,BookSchema.getAllBooksOfInterestOfAnUser);
    app.get('/api/books/find-books-of-interest-other-users/:id',authenticate,BookSchema.getAllBooksThatInterestOthers);
    app.get('/api/books/find-books-of-an-user/:id',authenticate,BookSchema.getAllBooksCreatedByAnUser);
    app.post('/api/books/trade/big-delete/:id',authenticate,BookSchema.bigDelete);
    app.post('/api/books/delete-one/:id',authenticate,BookSchema.deleteOneBook);
    app.post('/api/trade/reject/:id',authenticate,BookSchema.rejectTrade);

    //TRADES
    app.post('/api/trade/:id',authenticate,TradingSchema.addToTrade);
    app.get('/api/trade/get-one/:id',authenticate,TradingSchema.getOneTrade);
    
    

}