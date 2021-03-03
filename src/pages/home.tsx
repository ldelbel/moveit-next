import { GetServerSideProps } from 'next';
import { ChallengesProvider } from '../contexts/ChallengesContext';
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from '../components/Profile'
import styles from '../styles/pages/Home.module.css'
import Head from 'next/head'
import ChallengeBox from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
}

export default function Home(props: HomeProps) {

  return (
    <ChallengesProvider
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | Move.it</title>
        </Head>

        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user } = ctx.req.cookies;

  const redirect = () => {
    ctx.res.writeHead(302, {
      Location: '/',
    });
    ctx.res.end();
    return { props: {} };
  }

  if (!user) {
    redirect();
  }

  const parsedUser = JSON.parse(user);

  return {
    props: {
      level: Number(parsedUser.level),
      currentExperience: Number(parsedUser.currentExperience),
      challengesCompleted: Number(parsedUser.challengesCompleted),
    },
  }
}
