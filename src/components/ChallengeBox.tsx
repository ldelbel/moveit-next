import React from "react";
import styles from "../styles/components/ChallengeBox.module.css";

const ChallengeBox = () => {
  const hasActiveChallenge = true;

  return (
    <div className={styles.challengeBoxContainer}>
      { hasActiveChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe 400 xp</header>
          
          <main>
            <img src="icons/body.svg" alt="any"/>
            <strong>Novo Desafio</strong>
            <p>Levante e faça uma caminhada de 3 minutos.</p>
          </main>
          <footer>
              
          </footer>
          }
          
        </div>
      ) : (
      <div className={styles.challengeNotActive}>
        <strong>Finalize um ciclo para receber um desafio</strong>
        <p>
          <img src="icons/level-up.svg" alt="Level up" />
          Avance de level completando desafios
        </p>
      </div>
      )
      }
    </div>
      
  );
};

export default ChallengeBox;
