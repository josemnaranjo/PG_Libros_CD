import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import { login, getUser } from '../services/user.services';
import { useUser } from '../context/userContext';

const Login = () => {
    const [errors,setErrors] = useState([]);
    const navigate = useNavigate();
    const {setUser} = useUser();

    const loginToWeb = async(values) =>{
        console.log("LOGIN VIEW - LINEA 11", values);

        const response = await login(values);
        

        if(response.data.message===""){
            console.log("LOGIN VIEW - LINEA 17", response);
            const response2 = await getUser(response.data._id);
            setUser(response2.data);
            navigate('/');

        }else{
            const errorResponse = response.data.errors;
            const errorArr =[];
            for(const key of Object.keys(errorResponse)){
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr)
        }

    }
    return (
        <div>
            <Navbar/>
            <h1 className='display-5 mt-3'>Iniciar sesion</h1>
            {errors?.map((err,i)=>(<div key={i}>{err}</div>))}
            <LoginForm email="" password="" onSubmitProp={loginToWeb}/>
        </div>
    );
}

export default Login;
