import  { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import axios from 'axios';

interface User {
  _id: string,
  login: string,
  avatar: string,
  name: string,
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  totalExp: number,
}

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

interface ChallengesContextData {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  experienceToNextLevel: number,
  user: User,
  activeChallenge: Challenge,
  levelUp: () => void,
  startNewChallenge: () => void,
  resetActiveChallenge: () => void,
  completeChallenge: () => void,
  closeLevelUpModal: () => void,
}

interface ChallengesProviderProps {
  children: ReactNode,
  user: User,
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, user }: ChallengesProviderProps) {
  const [level, setLevel] = useState(user.level);
  const [currentExperience, setCurrentExperience] = useState(user.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(user.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);
  const [totalExp, setTotalExp] = useState(user.totalExp);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect( () => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    const updateUser = {
      ...user,
      level,
      currentExperience,
      challengesCompleted,
      totalExp
    }
    axios.post('api/updateUserData', { updateUser })
    Cookies.set('user', JSON.stringify(updateUser));
  }, [level, currentExperience, challengesCompleted, totalExp]);

  const levelUp = () => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  }

  const closeLevelUpModal = () => {
    setIsLevelUpModalOpen(false);
  }

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];
    setActiveChallenge(challenge);

    new Audio('./notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio', {
        body: `Valendo ${challenge.amount} xp`
      })
    }
  }

  const resetActiveChallenge = () => {
    setActiveChallenge(null);
  }

  const completeChallenge = () => {
    if(!activeChallenge){
      return
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience > experienceToNextLevel){
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
    setTotalExp(totalExp + amount);
  }
   
  return (
    <ChallengesContext.Provider
      value={{
        user,
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetActiveChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal,
      }}>
      {children}
      { isLevelUpModalOpen && <LevelUpModal /> }
    </ChallengesContext.Provider>
  )
}