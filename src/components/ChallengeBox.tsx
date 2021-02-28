import React, { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengesContext";
import { CountdownContext } from "../contexts/CountdownContext";
import styles from "../styles/components/ChallengeBox.module.css";

const ChallengeBox = () => {
  const { activeChallenge, resetActiveChallenge, completeChallenge } = useContext(ChallengesContext);
  const { resetCountDown } = useContext(CountdownContext);

  const handleChallengeSucceeded = () => {
    completeChallenge();
    resetCountDown();
  }

  const handleChallengeFailed = () => {
    resetActiveChallenge();
    resetCountDown();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="any"/>
            <strong>Novo Desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
              <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
              >
                Falhei
              </button>
              <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
              >
                Completei
              </button>
          </footer>        
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
