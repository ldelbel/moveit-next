import styles from '../styles/pages/Login.module.css';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { FaGithub, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    if (username) {
      try {
        const { data } = await axios.get(`https://api.github.com/users/${username}`);
        const response = await axios.post('api/login', { loggingUser: data });
        const { user } = response.data;
        Cookies.set('user', JSON.stringify(user));
        router.push('/home');
      } catch {
        err => err
      }
    }
  }

  return (
    <div>
      <div className={styles.logoContainer}>
        <img src="" alt="watermark"/>
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.formSection}>
          <img src="" alt="move.it logo"/>
          <div className={styles.formContent}>
            <strong>Bem Vindo</strong>
            <div>
              <FaGithub size={40} />
              <p>Faça login com seu Github para começar</p>
            </div>
            <div className={styles.inputWrapper}>
              <input type="text" onChange={(e) => setUsername(e.target.value)}/>
              <button type="button" onClick={handleLogin}>
                <FaChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
