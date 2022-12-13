import React, {useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { getAllBooks , addBookToInterest } from '../services/book.services';

const Home = () => {
    const [books,setBooks] = useState([]);
    const {user} = useUser();
    const navigate = useNavigate();

    const getAllBooksFromService = async () => {
        try{
            const result = await getAllBooks();
            const aBooks = result.data.allBooks;
            setBooks(aBooks);
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => {
        getAllBooksFromService();
    }, []);

    const addBookToInterestFromService = async (bookId,userId) =>{
        try{
            await addBookToInterest(bookId,userId);
            navigate(`/my-books`)
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            <Navbar/>
            <h1>Libros disponibles</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Género</th>
                        <th>Autor</th>
                        <th>Resumen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {books?.map((book,idx)=>(
                        <tr key={idx}>
                            <td>{book.title}</td>
                            <td>{book.genre}</td>
                            <td>{book.author}</td>
                            <td>{book.summary}</td>
                            <td><button className='btn btn-dark' onClick={()=>addBookToInterestFromService(book._id,user._id)}>me interesa</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
