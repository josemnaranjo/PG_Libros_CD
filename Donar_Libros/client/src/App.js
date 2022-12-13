import './App.css';
import {UserProvider} from './context/userContext';
import {Routes,Route} from 'react-router-dom';
import Home from './views/Home';

function App() {
  return (
    <div className="App">
        <UserProvider>
            <Routes>
                <Route path='/' element={<Home/>}/>
            </Routes>
        </UserProvider>
    </div>
  );
}

export default App;
