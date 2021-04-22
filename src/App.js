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
  const [readmeHtml, setReadmeHtml] = useState('');
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
    console.log('ButtonClick - 2');
    axios
      .get(routes.getReadmeUrl(owner, repo), {
        params: {
          owner,
          repo,
        },
      })
      .then((response) => {
        // console.log(response.data);
        setReadme(response.data.content);
        console.log('ButtonClick - 3');
        onRenderMarkdown(response.data.content);
        // setRepos(response.data.items);
      });
  };

  const onReadmeButtonClick = async (owner, repo) => {
    console.log('ButtonClick - 1');
    await getReadme(owner, repo);
    await console.log('ButtonClick - 4');
    // onRenderMarkdown(readme);
  };

  const onRenderMarkdown = (text) => {
    axios
      .post(routes.postRenderMarkdown(), {
        text: window.atob(text),
      })
      .then((response) => {
        setReadmeHtml(response.data);
      });
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
          <div onClick={() => onReadmeButtonClick(el.owner.login, el.name)}>show readme</div>
          <hr />
        </li>
      ))
    : null;

  return (
    <div className='App'>
      <header className='App-header'>
        <form onSubmit={onSubmit}>
          <input type='text' name='search' ref={inputValue} />
          <button type='submit'>search repos by keywords</button>
        </form>
      </header>
      <div className='main-content'>
        <div className='items-list'>
          <ul>{reposList}</ul>
        </div>
        <div className='content-field'>
          <div dangerouslySetInnerHTML={{ __html: readmeHtml }}></div>
          wkejrhj
        </div>
      </div>
    </div>
  );
}
export default App;
