import React, {useState} from 'react';
import RegisterForm from '../components/RegisterForm';
import Navbar from '../components/Navbar';
import {useNavigate} from 'react-router-dom';
import { createUser,getUser } from '../services/user.services';
import {useUser} from '../context/userContext';



const Register = () => {
    const [errors,setErrors]= useState([]);
    const navigate = useNavigate();
    const {setUser} = useUser()

    const newUser = async(values)=>{
        console.log("REGISTER VIEW - LINEA 10 ", values);
        const response = await createUser(values);

        if(response.data.message===""){
            console.log("REGISTER VIEW - LINEA 14 ",response.data);
            const response2 = await getUser(response.data._id);
            setUser(response2.data);
            navigate("/")
        }else{
            const errorResponse = response.data.errors;
            const errorArr = [];
            for(const key of Object.keys(errorResponse)){
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        }
    }
    return (
        <div>
            <Navbar/>
            {errors?.map((err,i)=>(<div key={i}>{err}</div>))}
            <RegisterForm firstName="" lastName="" email="" password="" confirmPassword="" onSubmitProp={newUser} />
        </div>
    );
}

export default Register;
