import React from 'react';
import Navbar from '../components/Navbar';
import NewBookForm from '../components/NewBookForm';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../services/book.services';
import { useUser } from '../context/userContext';

const NewBook = () => {
    const {user} = useUser();
    const navigate = useNavigate()

    const createBookFromService = async (values) => {
        try{
            await createBook(user._id,values);
            navigate('/');
        }catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            <Navbar/>
            <NewBookForm title="" author="" genre="" summary="" onSubmitProp={createBookFromService}/>
        </div>
    );
}

export default NewBook;
