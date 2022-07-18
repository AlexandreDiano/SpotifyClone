import {currentTrackIdState, isPlayingState} from "../atoms/songAtom";
import {useRecoilState} from "recoil";
import {useCallback, useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import useSpotify from "../hooks/useSpotify";
import {debounce} from "lodash";
import useSongInfo from "../hooks/useSongInfo";
import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon
} from "@heroicons/react/solid";
import {HeartIcon, VolumeUpIcon as VolumeDownIcon} from "@heroicons/react/outline";

function Player() {
  const spotifyApi = useSpotify();
  const {data: session, status} = useSession();
  const [currentTrackId, setCurrentIdTrack] = useRecoilState(currentTrackIdState)
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(data => {
        setCurrentIdTrack(data.body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then(data => {
          setIsPlaying(data.body?.is_playing)
        })
      })
    }
  }

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong()
      setVolume(50)
    }
  }, [currentTrackId, spotifyApi, session])

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then(data => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false)
      } else {
        spotifyApi.play();
        setIsPlaying(true)
      }
    })
  }

  useEffect(() => {
    debouncedAdjustVolume(volume)
  }, [volume])

  const debouncedAdjustVolume = useCallback(
    debounce(volume => {
      spotifyApi.setVolume(volume).catch(err => {
      })
    }, 500), [])

  return (
    <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white
     grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
      <div className="flex items-center space-x-4">
        <img className="hidden md:inline h-20 w-20" src={songInfo?.album.images?.[0]?.url} alt=""/>
        <div>
          {console.log(songInfo)}
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button"/>
        <RewindIcon className="button"/>

        {isPlaying ? (
          <PauseIcon onClick={handlePlayPause} className="button w-10 h-10"/>
        ) : (
          <PlayIcon onClick={handlePlayPause} className="button w-10 h-10"/>
        )}

        <FastForwardIcon className="button"/>
        <ReplyIcon className="button"/>

      </div>
      <div className="flex items-center space-x-3 md:space-x-4 justify-end">
        <VolumeDownIcon onClick={() => setVolume(0)} className="button"/>
        <input className="w-14 md:w-28" onChange={e => setVolume(Number(e.target.value))} type="range" value={volume}
               min={0} max={100}/>
        <VolumeUpIcon onClick={() => setVolume(100)} className="button"/>
      </div>
    </div>
  )
}

export default Player;
