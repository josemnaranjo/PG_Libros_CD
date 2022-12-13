const UserController = require('../controllers/user.controller');
const BookSchema = require('../controllers/books.controller');
const authenticate = require('../config/authenticate');


module.exports = app => {

     //USUARIO
    app.post("/api/register",UserController.Register);
    app.post("/api/login",UserController.Login);
    app.post("/api/logout",UserController.Logout);
    app.get("/api/users",authenticate,UserController.getAll);
    app.get("/api/user/:id",authenticate,UserController.getUser);


     //BOOKS
    app.post('/api/books/new/:id',authenticate,BookSchema.createBook);
    app.post('/api/books/add-to-interest/:id',authenticate,BookSchema.addBookOfInterest);
    app.delete('/api/books/delete/:id',authenticate,BookSchema.deleteBookUserCreator);
    // app.get('/api/books/find-books-of-interest-of-an-user/:id',authenticate,BookSchema.getAllBooksOfInterestOfAnUser);
    // app.get('/api/books/find-books-of-interest-other-users/:id',authenticate,BookSchema.getAllBooksThatInterestOthers);
    // app.get('/api/books/find-books-of-an-user/:id',authenticate,BookSchema.getAllBooksCreatedByAnUser);

}