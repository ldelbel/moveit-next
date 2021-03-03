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

interface HomeProps {
  user: User,
}

export default function Home(props: HomeProps) {

  return (
    <ChallengesProvider
     user={props.user}
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

  return {
    props: {
      user: JSON.parse(user),
    },
  }
}
