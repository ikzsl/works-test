import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import axios from 'axios';
import { routes } from './routes';

function App() {

  const [userLogin, setUserLogin] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  
  useEffect(() => {
    axios
    .get(routes.searchUsersUrl(), {
      params: {
        q: 'ikzsl',
      },
    })
    .then((response) => {
      console.log(response.data.items[0]);
      setUserAvatar(response.data.items[0].avatar_url);
      setUserLogin(response.data.items[0].login)
    });
  }, [])

    
  return (
    <div className='App'>
      <header className='App-header'>
        {/* <img src={logo} className='App-logo' alt='logo' /> */}
        {/* <Counter /> */}
        <div>
          <p>{userLogin}</p>
          <img src={userAvatar} alt=''/>
        </div>
      </header>
    </div>
  );
}

export default App;
