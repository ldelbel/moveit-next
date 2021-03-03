import React, { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ExperienceBar.module.css'

const ExperienceBar = () => {
  const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);
  console.log(typeof currentExperience);
  console.log(typeof experienceToNextLevel);
  const percentToNextLevel = Math.round(currentExperience * 100 / experienceToNextLevel);
  console.log(typeof percentToNextLevel)
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${String(percentToNextLevel)}%` }}/>
        <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}>
          {currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  )
}

export default ExperienceBar;
