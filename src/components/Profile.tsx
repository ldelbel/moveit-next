import React from 'react'
import styles from '../styles/components/Profile.module.css'

const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/ldelbel.png" alt="Lucas Delbel" />
      <div>
        <strong>Lucas Delbel</strong>
        <p>
          <img src="icons/level.svg" alt="level"/>
          Level 1
        </p>
      </div>
    </div>
  )
}

export default Profile
