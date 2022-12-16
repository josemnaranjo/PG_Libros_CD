import React,{useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext';
import { getMyBooksThatInterestOthers ,getOneBook, deleteOneBook } from '../services/book.services';
import { getUser } from '../services/user.services';


const MyBooks = () => {
    const {user} = useUser();
    const [myBooks,setMyBooks] = useState();
    const [booksThatInterestOthers , setBookThatInterestOthers] = useState();
    const [tradeId, setTradeId] = useState();
    const navigate = useNavigate();

    const getBooksOfUserFromService = async () => {
        try{
            const result = await getUser(user._id);
            setMyBooks(result.data.myBooks);
        }catch(err){
            console.log(err)
        }
    };

    const getBooksThatInterestOthersFromService = async () => {
        try{
            const result = await getMyBooksThatInterestOthers(user._id);
            setBookThatInterestOthers(result.data)
        }catch(err){
            console.log(err)
        }
    };

    const getOneBookFromService = async (data) => {
        try{
            const result = await getOneBook(data);
            setTradeId(result.data.book.tradesId)
        }catch(err){
            console.log(err)
        }
    };

    const deleteOneBookFromServices = async (data) => {
        try{
            await deleteOneBook(data,user._id);
            navigate('/my-books')
        }catch(err){
            console.log(err)
        }
    }

    const setBkId = (value) => {
        getOneBookFromService(value);
    };

    const toTradeOne = (value) => {
        navigate(`/user/${value}/trade/${tradeId}`)
    };


    useEffect(() => {
        getBooksThatInterestOthersFromService();
        getBooksOfUserFromService() 
    }, []);
    
    return (
        <div>
            <Navbar/>
            <div className='container d-flex justify-content-evenly'>

                <div>
                    <h1>mis libros que interesan a otros usuarios</h1>
                    <ul>
                        {booksThatInterestOthers?.map((book,idx)=>(
                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                <p>{idx+1}</p>
                                <p>{book.title}</p>
                                <button className='btn btn-dark' onMouseOver={()=>setBkId(book._id)} onClick={()=>toTradeOne(book.interestId)}>Ver informacion</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h1>mis libros</h1>
                    <ul>
                        {myBooks?.map((book,idx)=>(
                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                <p>{book.title}</p>
                                <button className='btn btn-dark'>Editar informacion</button>
                                <button className='btn btn-danger' onClick={()=>deleteOneBookFromServices(book._id)}>Borrar</button>
                            </li>
                        ))}
                    </ul>
                </div>
                
            </div>
        </div>
    );
}

export default MyBooks;
