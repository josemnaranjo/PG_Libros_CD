import './App.css';
import {UserProvider} from './context/userContext';
import {Routes,Route} from 'react-router-dom';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import NewBook from './views/NewBook';

function App() {
  return (
    <div className="App">
        <UserProvider>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/new-book' element={<NewBook/>}/>
            </Routes>
        </UserProvider>
    </div>
  );
}

export default App;
