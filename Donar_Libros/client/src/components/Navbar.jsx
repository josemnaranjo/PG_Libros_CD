import React from 'react';
import {useUser} from '../context/userContext';
import { logout } from '../services/user.services';


const Navbar = () => {
    const {user,setUser} = useUser();

    const renderInfo = ()=>{
        if(user){
            return(<>¡Bienvenido {user.firstName}!</>)
        }else{
            return(<>Por favor, inicia sesión</>)
        }
    };

    const logoutUser = async()=>{
        const {success} = await logout();
        if(success) setUser(null)
        else window.alert("Error. No hemos podido desloguear tu usuario")
    };


    return (
      <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">
                    InterBook
                </a>
                <div className="navbar" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="/register">
                                register
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/login">
                                login
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/new-book">
                                crear nuevo libro
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/my-books">
                                mis libros y solicitudes
                            </a>
                        </li>
                    </ul>
                    </div>
                    <div className='collapse navbar-collapse justify-content-end'>
                        <ul className='navbar-nav d-flex'>
                            <li className='navbar-text'>
                                {renderInfo()}
                            </li>
                                {user && <button className='btn btn-outline-light btn-sm' onClick={logoutUser}>Logout</button>}
                        </ul>
                    </div>
            </nav>
        </div>
    );
}

export default Navbar;
