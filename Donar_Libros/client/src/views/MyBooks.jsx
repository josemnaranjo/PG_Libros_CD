import React,{useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/userContext';
import { getBooksThatInterestAnUser ,getMyBooksThatInterestOthers } from '../services/book.services';


const MyBooks = () => {
    const {user} = useUser();
    const [booksThatInterestUser , setBookThatInterestUser] = useState();
    const [booksThatInterestOthers , setBookThatInterestOthers] = useState();
    const navigate = useNavigate();


    const getBooksThatInterestAnUserFromService = async () => {
        try{
            const result = await getBooksThatInterestAnUser(user._id);
            console.log("Libros que interesan al usuario " ,result.data);
            setBookThatInterestUser(result.data);
        }catch(err){
            console.log(err)
        }
    };

    const getBooksThatInterestOthersFromService = async () => {
        try{
            const result = await getMyBooksThatInterestOthers(user._id);
            console.log("Libros del usuario que interesan a otros ", result.data);
            setBookThatInterestOthers(result.data)
        }catch(err){
            console.log(err)
        }
    };


    useEffect(() => {
        getBooksThatInterestAnUserFromService();
        getBooksThatInterestOthersFromService()
    }, []);
    
    return (
        <div>
            <Navbar/>
            <div className='container d-flex justify-content-evenly'>

                <div>
                    <h1>mis libros que interesan a otros</h1>
                    <ul>
                        {booksThatInterestOthers?.map((book,idx)=>(
                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                <p>{book.title}</p>
                                <button></button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h1>libros que me interesan</h1>
                    <ul>
                        {booksThatInterestUser?.map((book,idx)=>(
                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                <p>{book.title}</p>
                                <button className='btn btn-dark'>Ver información</button>
                            </li>
                        ))}
                    </ul>
                </div>
                
            </div>
        </div>
    );
}

export default MyBooks;
