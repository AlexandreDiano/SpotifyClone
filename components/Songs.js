import {useRecoilValue} from 'recoil'
import {playlistState} from '../atoms/playlistAtom'
import Song from './Song'

function Songs() {
  const playlist = useRecoilValue(playlistState);
  return (
    <div className="px-b flex flex-col space-y-1 pb-28 p-5">
      <div>
        {playlist?.tracks.items.map((track, i) => (
          <Song key={track.track.id} order={i} track={track}/>
        ))}
      </div>
    </div>
  )
}

export default Songs