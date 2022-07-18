import {HeartIcon, HomeIcon, LibraryIcon, PlusCircleIcon, SearchIcon} from "@heroicons/react/outline"
import {useSession, signOut} from "next-auth/react";
import {useState, useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {playlistIdState} from '../atoms/playlistAtom';
import useSpotify from '../hooks/useSpotify';

function Sidebar() {
  const spotifyApi = useSpotify()
  const {data: session, status} = useSession()

  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistid] = useRecoilState(playlistIdState);

  useEffect(() => {
    if(spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      })
    }
  }, [session, spotifyApi])

  console.log(playlistId)
  return (
    <div className="text-spotify-gray p-5 text-sm border-r border-spotify-gray
    bg-black overflow-y-scroll h-screen scrollbar-hide max-w-[270px] overflow-x-ellipsis">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white my-1.5">
          <HomeIcon className="h-8 w-8"/>
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white my-1.5">
          <SearchIcon className="h-8 w-8"/>
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white my-1.5">
          <LibraryIcon className="h-8 w-8"/>
          <p>Your Library</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white my-1.5 mt-8">
          <PlusCircleIcon className="h-8 w-8"/>
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white my-1.5">
          <HeartIcon className="h-8 w-8"/>
          <p>Liked Songs</p>
        </button>

        <hr className="border-t[0.1px] border-spotify-gray mt-6"/>

        {/*playlists*/}
        {playlists.map(playlist => (
          <div>
            <p className="cursor-pointer hover:text-white mt-5"
               onClick={() => setPlaylistid(playlist.id)}>{playlist.name}</p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Sidebar;
