import {ChevronDownIcon} from "@heroicons/react/outline"
import {signOut, useSession} from "next-auth/react";
import {useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {playlistState, playlistIdState} from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "../components/Songs";

function Center() {
  const spotifyApi = useSpotify()
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const {data: session} = useSession()

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body);
    }).catch((err) => console.log(err))
  }, [spotifyApi, playlistId])

  return (
    <div className="flex-grow text-white bg-[#121212] h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-4 right-8">
        <div className="flex items-center bg-black rounded-full h-[32px] space-x-3 pr-2
           opacity-90 hover:opacity-80 cursor-pointer" onClick={signOut}>
          <img className="rounded-full w-[28px] h-[28px] ml-[2px]" src={session?.user.image} alt="userImage"/>
          <h2 className="mx-3">{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5"/>
        </div>
      </header>
      <section className="flex items-end space-x-7 bg-gradient-to-b
      to-[#121212] from-[#555858] w-full h-80 text-white p-8">
        <img className="h-44 w-44 shadow-2xl" src={playlist?.images?.[0]?.url} alt=""/>
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playlist?.name}</h1>
          <span>{`${playlist?.owner.display_name} - ${playlist?.followers.total} Curtidas - ${playlist?.tracks.total} musicas`}</span>
        </div>
      </section>
      <div>
        <Songs/>
      </div>
    </div>
  )
}

export default Center;
