import React, {useEffect,useState} from 'react';
import Navbar from '../components/Navbar';
import { useParams , useNavigate } from 'react-router-dom';
import { getAllBookOfAnUser } from '../services/book.services';
import { addToTrade } from '../services/trade.services';

const TradeOne = () => {
    const {id,tradeId} = useParams();
    const [books,setBooks] = useState();
    const navigate = useNavigate();

    const getAllBookOfAnUserFromService = async () => {
        try{
            const result = await getAllBookOfAnUser(id);
            console.log(result.data)
            setBooks(result.data);
        }catch(err){
            console.log(err)
        }
    };
    
    const addToTradeFromServices = async (value) => {
        try{
            await addToTrade(tradeId,value);
            navigate(`/one-trade/${tradeId}`);
        }catch(err){
            console.log(err)
        }
    }

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
                            <button className='btn btn-dark' onClick={() => addToTradeFromServices(book)}>seleccionar</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TradeOne;
