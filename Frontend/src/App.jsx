import Signup from './components/Signup';
import Login from './components/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { useAuth } from './context/AuthContext';
import Left from './Left/Left'
import Right from './Right/Right'
import { Loading } from './components/Loading';


function App() {
  
  const [authuser]=useAuth();
  return (
    <>
    <Routes>
      <Route path='/' element={authuser?
        <div className='flex h-screen'>
         <Left/>
         <Right/>
        </div>
        :<Navigate to={'/login'}/>

      } />
      <Route path="/signup" element={authuser?<Navigate to ='/'/>:<Signup/>} />
        <Route path="/login" element={authuser?<Navigate to ='/'/>:<Login/>} /> 
    </Routes>
      <ToastContainer />
      

      </>
  );
}

export default App;