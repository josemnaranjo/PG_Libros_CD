import axios from 'axios';
axios.defaults.withCredentials = true;

export const createUser = async (user) => await axios.post('http://localhost:8000/api/register',user);

export const login = async (user) => await axios.post('http://localhost:8000/api/login',user);

export const getUser = async(id) => await axios.get('http://localhost:8000/api/user/'+id);

export const logout = async () => {
    try{
        const response = await axios.post('http://localhost:8000/api/logout');
        if(!response.data.success){
            console.log("USER SERVICES - LINEA 13 ",response.data.success);
            return {success:false, data:response}
        }else{
            return {success:true,data:response}
        }

    }catch(err){
        return {success:false,data:{errors:{error:err}}}
    }
}