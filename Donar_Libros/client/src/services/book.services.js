import axios from 'axios';
axios.defaults.withCredentials = true;

//crear nuevo libro
export const createBook = async(creatorId,values) => await axios.post(`http://localhost:8000/api/books/new/${creatorId}`,values);
//obtener todos los libros
export const getAllBooks = async() => await axios.get('http://localhost:8000/api/books/get-all')