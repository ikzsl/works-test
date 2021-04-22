import React, { useState, useEffect, useRef } from 'react';

// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import axios from 'axios';
import { routes } from './routes';

function App() {
  // const [userLogin, setUserLogin] = useState('');
  // const [users, setUsers] = useState([]);
  const [readme, setReadme] = useState('');
  const [repos, setRepos] = useState([]);
  const [value, setValue] = useState('ikzsl');
  const inputValue = useRef();

  useEffect(() => {
    axios
      .get(routes.searchRepositoriesUrl(), {
        params: {
          q: value,
          per_page: 5,
        },
      })
      .then((response) => {
        console.log(response.data.items);
        // setUsers(response.data.items);
        setRepos(response.data.items);
      });
  }, [value]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue.current.value);
    setValue(inputValue.current.value);
  };

  const getReadme = (owner, repo) => {
    axios
      .get(routes.getReadmeUrl(owner, repo), {
        params: {
          owner,
          repo,
        },
      })
      .then((response) => {
        console.log(response.data);
        setReadme(response.data.content);
        // setRepos(response.data.items);
      });
  };

  const onReadmiButtonClick = (owner, repo) => {
    console.log('!!!!!!!!!!!', owner, repo);
    getReadme(owner, repo);
  };

  // const usersList = users.length
  //   ? users.map((el) => (
  //       <li>
  //         <img src={el.avatar_url} alt='avatar' height='20' /> {el.login}
  //       </li>
  //     ))
  //   : null;

  const reposList = repos.length
    ? repos.map((el) => (
        <li>
          {el.full_name}
          <p>{el.description}</p>
          <p>{el.language}</p>
          <p>{el.default_branch}</p>
          <div onClick={() => onReadmiButtonClick(el.owner.login, el.name)}>show readme</div>
          <hr />
        </li>
      ))
    : null;

  return (
    <div className='App'>
      <header className='App-header'>
        {/* <img src={logo} className='App-logo' alt='logo' /> */}
        {/* <Counter /> */}
        <p>{routes.getReadmeUrl(repos[0]?.owner.login, repos[0]?.name)}</p>
        <form onSubmit={onSubmit}>
          <input type='text' name='search' ref={inputValue} />
          <button type='submit'>search repos</button>
        </form>
        <div>
          <ul>{reposList}</ul>

          {/* <img src={userAvatar} height='100' alt='logo' /> */}
          {/* <span>{userLogin}</span> */}
        </div>
      </header>

      
        {window.atob(readme)}
      

      {/* <p>{value}</p> */}
    </div>
  );
}

export default App;
