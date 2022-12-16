import axios from 'axios';
axios.defaults.withCredentials = true;

//crear nuevo libro
export const createBook = async(creatorId,values) => await axios.post(`http://localhost:8000/api/books/new/${creatorId}`,values);
//obtener todos los libros
export const getAllBooks = async() => await axios.get('http://localhost:8000/api/books/get-all');
//obtene 1 libro
export const getOneBook = async(id) => await axios.get(`http://localhost:8000/api/books/get-one/${id}`);
//agregar libro a lista de interesados
export const addBookToInterest = async(bookId,userId) => await axios.post(`http://localhost:8000/api/books/add-to-interest/${bookId}`,{_id:userId});
//obtener mis libros que tienen interés de otros
export const getMyBooksThatInterestOthers = async(userId) => await axios.get(`http://localhost:8000/api/books/find-books-of-interest-other-users/${userId}`)
//obtener los libros que me interesan
export const getBooksThatInterestAnUser = async(userId) => await axios.get(`http://localhost:8000/api/books/find-books-of-interest-of-an-user/${userId}`);
//obtener los libros que creó un usuario
export const getAllBookOfAnUser = async(userId) => await axios.get(`http://localhost:8000/api/books/find-books-of-an-user/${userId}`);
//bigDelete : borra trade exitoso, los libros que estaban comprometidos y también en los lugares correspondientes dentro de la coleccion users
export const bigDelete = async(tradeId,values) => await axios.post(`http://localhost:8000/api/books/trade/big-delete/${tradeId}`,values);
//rechazar transacción
export const rejectTrade = async(tradeId,values) => await axios.post(`http://localhost:8000/api/trade/reject/${tradeId}`,values);
//borrar un libro
export const deleteOneBook = async(bookId,userOneId) => await axios.post(`http://localhost:8000/api/books/delete-one/${bookId}`,{_id:userOneId});