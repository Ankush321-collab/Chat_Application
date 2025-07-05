import Signup from './components/Signup';
import Login from './components/Login';
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { useAuth } from './context/AuthContext';
import Left from './Left/Left'
import Right from './Right/Right'
import { Loading } from './components/Loading';
import { useState } from 'react';

function App() {
  const [authuser] = useAuth();
  const [showChat, setShowChat] = useState(false);
  
  return (
    <>
      <Routes>
        <Route path='/' element={authuser ? (
          <div className='flex flex-col sm:flex-row h-screen w-full overflow-hidden'>
            {/* Left Panel - Mobile: conditional, Desktop: always visible */}
            <div className={`${showChat ? 'hidden' : 'block'} sm:block sm:w-[30%] transition-all duration-300 ease-in-out`}>
              <Left onUserSelect={() => setShowChat(true)} />
            </div>
            {/* Right Panel - Mobile: conditional, Desktop: always visible */}
            <div className={`${showChat ? 'block' : 'hidden'} sm:block sm:flex-1 transition-all duration-300 ease-in-out`}>
              <Right onBackClick={() => setShowChat(false)} />
            </div>
          </div>
        ) : (
          <Navigate to={'/login'} />
        )} />
        <Route path="/signup" element={authuser ? <Navigate to='/' /> : <Signup />} />
        <Route path="/login" element={authuser ? <Navigate to='/' /> : <Login />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;