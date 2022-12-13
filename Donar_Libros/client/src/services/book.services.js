import axios from 'axios';
axios.defaults.withCredentials = true;


export const createBook = async(creatorId,values) => await axios.post(`http://localhost:8000/api/books/new/${creatorId}`,values);