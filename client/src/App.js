import logo from './logo.svg';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './page/Signup';
import Login from './page/Login';
import Chat from './page/Chat';

function App() {
  return (
   <BrowserRouter>
   <Routes>
     <Route path="/Signup" element={ < Signup />} />
     <Route path="/Login" element={ < Login />} />
     <Route path="/" element={ < Chat />} />
   </Routes>
   </BrowserRouter>
  );
}

export default App;
