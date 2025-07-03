import Signup from './components/Signup';
import Login from './components/Login';
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'


function App() {
  return (
    <>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
      <ToastContainer />
      </>
  );
}

export default App;