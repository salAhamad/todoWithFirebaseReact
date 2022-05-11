
import { Route, Routes } from 'react-router-dom';
import Signup from './views/Signup';
import './App.scss';
import Signin from './views/Signin';
import { UserAuthContextProvider } from './contexts/UserAuthContext';
import ProtectedRoutes from './components/ProtectedRoutes';
import ResetPassword from './views/ResetPassword';
import Home from './views/Home';

function App() {


  return (
    <>
      <UserAuthContextProvider>
        <Routes>
          <Route path='/home' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
          <Route path='/' element={<Signin />} />       
          <Route path='/reset-password' element={<ResetPassword />} />       
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </UserAuthContextProvider>
    </>
  );
}

export default App;
