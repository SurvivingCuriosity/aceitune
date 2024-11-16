import { useWindowsStore } from "../store/WindowsStore";
import { ArtistPickerWindow } from "../windows/ArtistPickerWindow";
import { SongPickerWindow } from "../windows/SongPickerWindow";
import { WindowKind } from "../windows/WindowKind";

export const GestorVentanas = () => {

    // sacar las ventanas abiertas
    const { ventanaAbierta } = useWindowsStore();
  
    switch (ventanaAbierta) {
      case WindowKind.artistPicker:
        return <ArtistPickerWindow />;
      case WindowKind.songPicker:
        return <SongPickerWindow />;
      case WindowKind.scalePicker:
        return <ArtistPickerWindow />;
      default:
        return <></>;
    }
}
