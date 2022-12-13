import axios from 'axios';
axios.defaults.withCredentials = true;

//crear nuevo libro
export const createBook = async(creatorId,values) => await axios.post(`http://localhost:8000/api/books/new/${creatorId}`,values);
//obtener todos los libros
export const getAllBooks = async() => await axios.get('http://localhost:8000/api/books/get-all');
//agregar libro a lista de interesados
export const addBookToInterest = async(bookId,userId) => await axios.post(`http://localhost:8000/api/books/add-to-interest/${bookId}`,{_id:userId});
//obtener mis libros que tienen interés de otros
export const getMyBooksThatInterestOthers = async(userId) => await axios.get(`http://localhost:8000/api/books/find-books-of-interest-other-users/${userId}`)
//obtener los libros que me interesan
export const getBooksThatInterestAnUser = async(userId) => await axios.get(`http://localhost:8000/api/books/find-books-of-interest-of-an-user/${userId}`)