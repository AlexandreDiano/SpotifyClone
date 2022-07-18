import type {NextPage} from 'next';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Center from '../components/Center';
import Player from '../components/Player';
import {getSession, GetSessionParams} from "next-auth/react";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Spotify - Web Player</title>
        <link
          rel="icon"
          href="https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png"
        />
      </Head>
      <div className="h-screen overflow-hidden">
        <main className="flex">
          <Sidebar/>
          <Center/>
        </main>
        <div className="sticky bottom-0">
          <Player />
        </div>
      </div>

    </div>
  );
};

export default Home;

export async function getServerSideProps(context: GetSessionParams | undefined){
  const session = await getSession(context);
  return{
    props: {
      session
    }
  }
}