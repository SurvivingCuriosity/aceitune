import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Artista } from "../components/interfaces/Artista";
import { Cancion, CancionFull } from "../components/interfaces/Cancion";
import { api } from "../services/Api";

interface withActivated {
  isActivated: boolean;
}

interface withLoadingState {
  loading: boolean;
}

export type ItemType = "song" | "artist" | "scale";

export type ItemCancion = CancionFull & withActivated;
export type ItemArtista = Artista & withActivated & withLoadingState & {
  cantidadDeCanciones?:number
  bpmMedio?: number
};

interface ItemsStore {
  canciones: Array<ItemCancion>;
  artistas: Array<ItemArtista>;
  cancionesArtistas: CancionFull[];
  agregarItem: (type: ItemType, item: Cancion | Artista) => void;
  eliminarItem: (type: ItemType, id: string) => void;
  toggleVisibility: (type: ItemType, id: string) => void;
}

export const useItemsStore = create<ItemsStore>()(
  persist(
    (set) => ({
      canciones: [],
      artistas: [],
      cancionesArtistas: [],
      
      agregarItem: (type, item) => {
        set((state) => {
          if (type === "song") {
            const exists = state.canciones.some((cancion) => cancion.id === item.id);
            if (!exists) {
              // Realizamos la operación asíncrona
              api.getAudioFeatures([item.id])
                .then((data) => {
                  if (data !== undefined) {
                    set((state) => ({
                      canciones: [
                        ...state.canciones,
                        { ...(item as Cancion), isActivated: true, bpm: data[0].tempo, mode: data[0].mode, key: data[0].key },
                      ],
                    }));
                  }
                })
                .catch(console.error);
            }
          } else if (type === "artist") {
            const exists = state.artistas.some((artist) => artist.id === item.id);
            if (!exists) {
              // Añadimos el artista con `loading: true`
              const newArtist = { ...(item as Artista), isActivated: true, loading: true };
              const newArtistsState = [...state.artistas, newArtist];
      
              // Devolvemos el nuevo estado para mostrar al artista inmediatamente
              return {
                ...state,
                artistas: newArtistsState,
              };
            }
          }
          return state;
        });
      
        // Operación asíncrona para obtener canciones y actualizar `loading: false`
        if (type === "artist") {
          api.getArtistTracks(item.id)
            .then((songs) => {
              if (songs !== undefined) {
                const songIds = songs.map((song) => song.id);
                console.log(songs);
                
                api.getAudioFeatures(songIds)
                  .then((features) => {
                    if (features !== undefined && features !== null) {
                      const songsWithFeatures = songs.map((song, index) => ({
                        ...song,
                        bpm: features[index]?.tempo,
                        mode: features[index]?.mode,
                        key: features[index]?.key,
                        isActivated: true,
                      }));
      
                      set((state) => ({
                        artistas: state.artistas.map((artista) =>
                          artista.id === item.id
                            ? { ...artista, 
                              loading: false, 
                              cantidadDeCanciones: songsWithFeatures.length,
                              bpmMedio: songsWithFeatures.reduce((acc, cancion) => acc + cancion.bpm, 0) / songsWithFeatures.length
                            }
                            : artista
                        ),
                        cancionesArtistas: [...state.cancionesArtistas, ...songsWithFeatures],
                      }));
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                    // En caso de error, también actualizamos `loading: false`
                    set((state) => ({
                      artistas: state.artistas.map((artista) =>
                        artista.id === item.id
                          ? { ...artista, loading: false }
                          : artista
                      ),
                    }));
                  });
              }
            })
            .catch((err) => {
              console.error(err);
              // En caso de error, actualizamos `loading: false`
              set((state) => ({
                artistas: state.artistas.map((artista) =>
                  artista.id === item.id
                    ? { ...artista, loading: false }
                    : artista
                ),
              }));
            });
        }
      },
      

      eliminarItem: (type, id) => {
        set((state) => {
          if (type === "song") {
            return {
              canciones: state.canciones.filter((cancion) => cancion.id !== id),
            };
          } else if (type === "artist") {
            return {
              artistas: state.artistas.filter((artista) => artista.id !== id),
              cancionesArtistas: state.cancionesArtistas.filter((cancion) => cancion.idArtista !== id),
            };
          }
          return state;
        });
      },

      toggleVisibility: (type, id) => {
        set((state) => {
          if (type === "song") {
            return {
              canciones: state.canciones.map((cancion) =>
                cancion.id === id
                  ? { ...cancion, isActivated: !cancion.isActivated }
                  : cancion
              ),
            };
          } else if (type === "artist") {
            return {
              artistas: state.artistas.map((artista) =>
                artista.id === id
                  ? { ...artista, isActivated: !artista.isActivated }
                  : artista
              ),
            };
          }
          return state;
        });
      },
    }),
    { name: "itemsStore" }
  )
);
