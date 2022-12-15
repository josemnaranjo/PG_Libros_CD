import React, {useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { getAllBooks , addBookToInterest } from '../services/book.services';


const Home = () => {
    const [books,setBooks] = useState([]);
    const {user, setUser} = useUser();
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
            const response = await addBookToInterest(bookId,userId)
            setUser(response.data.user);
            navigate(`/my-books`);
        }catch(err){
            console.log(err)
        }
    };

    const renderBtn = (book) =>{

        const aux = user?.booksImInterested.map(book=> book._id).map(libro=>libro.includes(book._id))
        if(user){
            if(aux.includes(true)){
                return(<><button  className="btn btn-danger">Pendiente</button></>)
            }else{
                return(<><button type="button" className="btn btn-warning" onClick={()=>addBookToInterestFromService(book._id,user._id)}>Me interesa</button></>)
            }
        }
    };
    
    return (
        <div>
            <Navbar/>
            <h1>Libros disponibles para intercambio</h1>
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
                        <tr key={idx} className={user?._id===book.creatorId? "none":""} >
                            <td>{book.title}</td>
                            <td>{book.genre}</td>
                            <td>{book.author}</td>
                            <td>{book.summary}</td>
                            <td>{renderBtn(book)}{/* {<button className='btn btn-dark' onClick={()=>addBookToInterestFromService(book._id,user._id)}>me interesa</button>} */}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
