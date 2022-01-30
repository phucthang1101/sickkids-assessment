import './App.css';
import Login from './pages/Login/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage/>} exact />
        <Route path='/login' element={<Login />} />={' '}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
