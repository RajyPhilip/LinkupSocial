
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom' ;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Components/Header/Header';
import  Login  from './Components/Login/Login';
import { loadUser } from './Actions/User';
import Home from './Components/Home/Home';

function App() {

  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state)=> state.user)

  useEffect(()=>{
    dispatch(loadUser())
  },[]);
  return (
    <Router>
      {isAuthenticated && <Header />}
        <Routes>
          <Route path='/' element={ isAuthenticated ? <Home /> : <Login />} />
        </Routes>
    </Router>
  );
}

export default App;
