
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom' ;
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Components/Header/Header';
import  Login  from './Components/Login/Login';
import { loadUser } from './Actions/User';
import Home from './Components/Home/Home';
import Account from './Components/Account/Account';
import NewPost from './Components/NewPost/NewPost';
import Register from './Components/Register/Register';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import UserProfile from './Components/UserProfile/UserProfile';
import Search from './Components/Search/Search';
import NotFound from './Components/NotFound/NotFound';

function App() {

  const dispatch = useDispatch();
  const {isAuthenticated} = useSelector((state)=> state.user)

  useEffect(()=>{
    dispatch(loadUser())
  },[dispatch]);
  return (
    <Router>
      {isAuthenticated && <Header />}
        <Routes>
          <Route path='/' element={ isAuthenticated ? <Home /> : <Login />} />
          <Route path='/register' element={ isAuthenticated ? <Account /> : <Register />} />
          <Route path='/account' element={ isAuthenticated ? <Account /> : <Login />} />
          <Route path='/newpost' element={ isAuthenticated ? <NewPost /> : <Login />} />
          <Route path='/update/profile' element={ isAuthenticated ? <UpdateProfile /> : <Login />} />
          <Route path='/user/:id' element={ isAuthenticated ? <UserProfile /> : <Login />} />
          <Route path='/search' element={ isAuthenticated ? <Search /> : <Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
