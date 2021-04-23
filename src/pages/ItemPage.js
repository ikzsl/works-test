import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import axios from 'axios';
import { routes } from '../routes';

import styles from './Item.module.css';

const b64_to_utf8 = (str) => decodeURIComponent(escape(window.atob(str)));

export default function ItemPage() {
  const { owner, repo } = useParams();
  const [files, setFiles] = useState([]);
  const [decodedFile, setDecodedFile] = useState('');
  useEffect(() => {
    axios
      .get(routes.searchCodeUrl(), {
        params: {
          q: `repo:${owner}/${repo} extension:js`,
          per_page: 20,
        },
      })
      .then((response) => {
        setFiles(response.data.items);
      });
  }, []);

  const getFile = (gitUrl) => {
    axios.get(gitUrl).then((response) => {
      setDecodedFile(b64_to_utf8(response.data.content));
    });
  };

  const onFileButtonClick = (item) => {
    getFile(item.git_url);
  };

  const filesList = files.map((item) => (
    <tr onClick={() => onFileButtonClick(item)}>
      <td>{item.name}</td>
      <td>{item.path}</td>
    </tr>
  ));

  return (
    <div>
      <header>
        <Link to='/'>Home</Link>
        <h1>itemPage</h1>
        {owner} {repo}
      </header>

      <div className={styles.container}>
        <table className={styles.table}>
          <thead>
            <th>file name</th>
            <th>path</th>
          </thead>
          <tbody>{filesList}</tbody>
        </table>
        <pre className={styles.contentArea}>{decodedFile}</pre>
      </div>
    </div>
  );
}
