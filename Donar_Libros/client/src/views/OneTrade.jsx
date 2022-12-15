import React, {useState , useEffect} from 'react';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { getOneTrade } from '../services/trade.services';
import { getUser } from '../services/user.services';


const OneTrade = () => {
    const [bookOne,setBookOne] = useState();
    const [bookTwo,setBookTwo] = useState();
    const [creatorId,setCreatorId] = useState();
    const [userEmail,setUserEmail] = useState();
    const {id} = useParams();

    const getOneTradeFromServices = async (value) => {
        try{
            const result = await getOneTrade(value);
            setBookOne(result.data.book1);
            setBookTwo(result.data.book2);
            setCreatorId(result.data.book2[0].creatorId)
        }catch(err){
            console.log(err)
        }
    };

    const getUserFromService = async () => {
        try{
            const result = await getUser(creatorId);
            setUserEmail(result.data.email);

        }catch(err){
            console.log(err)
        }
    } 

    useEffect(() => {
        getOneTradeFromServices(id);
    }, []);

    return (
        <div>
            <Navbar />
            <div>
                <h1>Libro que das</h1>
                <ul>
                    {bookOne?.map((book,idx)=>(
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                        <p>{book.title}</p>
                        <p>{book.author}</p>
                    </li>))}
                </ul>
            </div>

            <div>
                <h1>Libro que recibes</h1>
                <ul>
                    {bookTwo?.map((book,idx)=>(
                    <li key={idx} className="list-group-item d-flex justify-content-between align-items-center">
                        <p>{book.title}</p>
                        <p>{book.author}</p>
                    </li>))}
                </ul>
            </div>

            <div>
                <button className='btn btn-dark' onClick={()=> getUserFromService()}>Ver información</button>
                {userEmail && <p>{userEmail}</p>}
            </div>

            <div>
                <button className='btn btn-dark'>Cerrar intercambio</button>
                <button className='btn btn-dark'>Rechazar intercambio</button>
            </div>
        </div>
    );
}

export default OneTrade;
