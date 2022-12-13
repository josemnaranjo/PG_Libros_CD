import React,{useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import { useUser } from '../context/userContext';
import { getBooksThatInterestAnUser ,getMyBooksThatInterestOthers } from '../services/book.services';


const MyBooks = () => {
    const {user} = useUser();
    const [booksThatInterestUser , setBookThatInterestUser] = useState();
    const [booksThatInterestOthers , setBookThatInterestOthers] = useState();


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
                    <h1>Mis libros</h1>
                    <ul>
                        {booksThatInterestOthers?.map((book,idx)=>(
                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                <p>{book.title}</p>
                                <button className='btn btn-dark'>Aceptar</button>
                                <button className='btn btn-dark'>Rechazar</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h1>Libros que me interesan</h1>
                    <ul>
                        {booksThatInterestUser?.map((book,idx)=>(
                            <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                                <p>{book.title}</p>
                                <button className='btn btn-dark'>Ver estado</button>
                            </li>
                        ))}
                    </ul>
                </div>
                
            </div>
        </div>
    );
}

export default MyBooks;
