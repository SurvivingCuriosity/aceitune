import { ArtistTrackPicker } from '../components/ArtistTrackPicker/ArtistTrackPicker'
import { Window } from './Window'

export const ArtistPickerWindow = () => {
  return (
    <Window>
        <p className='text-3xl font-bold text-olive'>Select an artist</p>
        <ArtistTrackPicker type='artist' />
    </Window>
  )
}
