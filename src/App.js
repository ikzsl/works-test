import React, { useState, useEffect, useRef } from 'react';

import './App.css';
import axios from 'axios';
import { routes } from './routes';

function App() {
  const [readmeHtml, setReadmeHtml] = useState('');
  const [repos, setRepos] = useState([]);
  const [value, setValue] = useState('ikzsl');
  const inputValue = useRef();

  useEffect(() => {
    axios
      .get(routes.searchRepositoriesUrl(), {
        params: {
          q: value,
          per_page: 20,
        },
      })
      .then((response) => {
        setRepos(response.data.items);
      });
  }, [value]);

  const b64_to_utf8 = (str) => decodeURIComponent(escape(window.atob(str)));

  const onSubmit = (e) => {
    e.preventDefault();
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
        onRenderMarkdown(response.data.content);
      });
  };

  const onReadmeButtonClick = (owner, repo) => {
    getReadme(owner, repo);
  };

  const onRenderMarkdown = (text) => {
    axios
      .post(routes.postRenderMarkdown(), {
        text: b64_to_utf8(text),
      })
      .then((response) => {
        setReadmeHtml(response.data);
      });
  };

  const reposList = repos.length
    ? repos.map((el) => (
        <tr key={el.id} className='list-item' onClick={() => onReadmeButtonClick(el.owner.login, el.name)}>
          <td>{el.full_name}</td>
          <td>{el.description}</td>
          <td>{el.language}</td>
        </tr>
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
          <table>
            <thead>
              <tr>
                <th> Name </th>
                <th> Description </th>
                <th> Language </th>
              </tr>
            </thead>
            <tbody>{reposList}</tbody>
          </table>
        </div>
        <div className='content-field'>
          <div dangerouslySetInnerHTML={{ __html: readmeHtml }}></div>
        </div>
      </div>
      <div className='button'>details</div>
    </div>
  );
}
export default App;
