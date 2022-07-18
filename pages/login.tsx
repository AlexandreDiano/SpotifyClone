import {NextPage} from "next";
import {BuiltInProviderType} from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
} from "next-auth/react";
import Head from "next/head";

interface Props {
  providers: Record<LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider>;
}

const login: NextPage<Props> = ({providers}) => {
  console.log(providers);
  return (
    <div className="flex justify-center flex-col items-center bg-black min-h-screen w-full">
      <Head>
        <title>Spotify - Web Player</title>
        <link
          rel="icon"
          href="https://open.spotifycdn.com/cdn/images/favicon32.8e66b099.png"
        />
      </Head>
      <img className="px-5" src="https://links.papareact.com/9xl" width="500" height="500"
           alt="Spotify Logo" />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-spotify-green text-black p-5 mt-20"
            onClick={() => signIn(provider.id, {callbackUrl: "/"})}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
};

export default login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}

// import {getProviders, signIn, useSession} from "next-auth/react";
//
// function Login({providers}) {
//   const {data: session, status} = useSession()
//
//   return (
//     <div className="flex justify-center flex-col items-center bg-black min-h-screen w-full">
//       <img className="px-5" src="https://links.papareact.com/9xl" width="500" height="500"
//            alt="Spotify Logo"/>
//       {Object.keys(providers).map(provider => (
//         <div key={provider.name}>
//           <button key={provider.id} className="bg-spotify-green text-white p-5 mt-20"
//                   onClick={() => signIn(provider.id, {callbackUrl: "/"})}>
//             Login with {provider.name}
//           </button>
//         </div>
//       ))}
//     </div>
//   )
// }
//
// export default Login
//
// export async function getServerSideProps() {
//   const providers = await getProviders();
//
//   return {
//     props: {
//       providers
//     },
//   }
// }