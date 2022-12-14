import './App.css';
import {UserProvider} from './context/userContext';
import {Routes,Route} from 'react-router-dom';
import Home from './views/Home';
import Register from './views/Register';
import Login from './views/Login';
import NewBook from './views/NewBook';
import MyBooks from './views/MyBooks';
import TradeOne from './views/TradeOne';

function App() {
  return (
    <div className="App">
        <UserProvider>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/new-book' element={<NewBook/>}/>
                <Route path='/my-books' element={<MyBooks/>}/>
                <Route path='/trade/:id' element={<TradeOne/>}/>
            </Routes>
        </UserProvider>
    </div>
  );
}

export default App;
