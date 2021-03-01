import styles from '../styles/pages/Login.module.css';
import { FaGithub, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

const Login = () => {
  const [state, setState] = useState();


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
              <input type="text" />
              <button type="button">
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
