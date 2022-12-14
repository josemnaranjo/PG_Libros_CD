import React, {useEffect,useState} from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { getAllBookOfAnUser } from '../services/book.services';

const TradeOne = () => {
    const {id} = useParams();
    const [books,setBooks] = useState();

    const getAllBookOfAnUserFromService = async () => {
        try{
            const result = await getAllBookOfAnUser(id);
            setBooks(result.data);
        }catch(err){
            console.log(err)
        }
    };

    useEffect(() => {
        getAllBookOfAnUserFromService();
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <h1>Libros para intercambiar</h1>
                <ul>
                    {books?.map((book,idx)=>(
                        <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                            <p>{book.title}</p>
                            <button className='btn btn-dark'>seleccionar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TradeOne;
