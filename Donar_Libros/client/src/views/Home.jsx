import React, {useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import { getAllBooks } from '../services/book.services';

const Home = () => {
    const [books,setBooks] = useState([]);

    const getAllBooksFromService = async () => {
        try{
            const result = await getAllBooks();
            const aBooks = result.data.allBooks
            setBooks(aBooks);
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => {
        getAllBooksFromService();
    }, []);


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
                            <button>me interesa</button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
