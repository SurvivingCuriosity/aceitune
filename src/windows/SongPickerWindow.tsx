import { ArtistTrackPicker } from '../components/ArtistTrackPicker/ArtistTrackPicker'
import { Window } from './Window'

export const SongPickerWindow = () => {

  return (
    <Window>
        <p className='text-3xl font-bold text-olive'>Select a song</p>
        <ArtistTrackPicker type='song'/>
    </Window>
  )
}
