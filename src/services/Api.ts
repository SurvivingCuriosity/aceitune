import {
  AccessToken,
  Album,
  AudioFeatures,
  Page,
  Track,
  type SearchResults,
} from "@spotify/web-api-ts-sdk";
import { Artista } from "../components/interfaces/Artista.ts";
import { Cancion, CancionFull } from "../components/interfaces/Cancion.ts";
import { useAuthStore } from "../store/AuthStore.ts";
import { mapArtists, mapTracks } from "./Mappers.ts";

const GET_TOKEN_URL = "https://accounts.spotify.com/api/token";

const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

export const api = {
  getToken: async () => {
    return await fetchData<AccessToken>(GET_TOKEN_URL, {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }).toString(),
      headers: {
        Authorization: "Basic " + btoa(client_id + ":" + client_secret),
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },
  searchArtist: async (query: string): Promise<Artista[] | undefined> => {
    const res = await fetchData<SearchResults<"artist"[]>>( `https://api.spotify.com/v1/search?q=${query}&type=artist&market=ES` );
    return mapArtists(res.artists);
  },
  searchSong: async (query: string): Promise<Cancion[] | undefined> => {
    const res = await fetchData<SearchResults<"track"[]>>( `https://api.spotify.com/v1/search?q=${query}&type=track&market=ES` );
    return mapTracks(res.tracks);
  },
  getAudioFeatures: async (
    lIds: string[]
  ): Promise<AudioFeatures[] | undefined> => {

    // Divide la lista de IDs en lotes de 50 elementos
    const chunkSize = 50;
    const chunks = [];
    for (let i = 0; i < lIds.length; i += chunkSize) {
      chunks.push(lIds.slice(i, i + chunkSize));
    }
  
    // Realiza las solicitudes en paralelo para cada lote
    try {
      const responses = await Promise.all(
        chunks.map((chunk) =>
          fetchData<{ audio_features: AudioFeatures[] }>(`https://api.spotify.com/v1/audio-features?ids=${chunk.join(",")}`)
        )
      );
  
      // Combina los resultados de todas las solicitudes
      const allFeatures = responses.flatMap((res) => res.audio_features);
      return allFeatures;
    } catch (error) {
      console.error("Error fetching audio features:", error);
      return undefined;
    }
  },
  getArtistTracks: async (artistId: string): Promise<CancionFull[] | undefined> => {
    // Obtener los álbumes del artista
    const albumResponse = await fetchData<Page<Album>>( `https://api.spotify.com/v1/artists/${artistId}/albums?limit=50`);

    if (!albumResponse || !albumResponse.items) {
      console.error("No se pudieron obtener los álbumes del artista.");
      return undefined;
    }

    const tracks: CancionFull[] = [];
    const trackIds: string[] = [];

    // Crear un array de promesas para obtener las pistas de cada álbum
    const albumTrackPromises = albumResponse.items.map(async (album) => {
      // Obtener las canciones de cada álbum
      
      const albumTracks = await api.getTracksFromAlbum(album.id);

      albumTracks?.forEach((track) => {
        if (track.artists.some((artist) => artist.id === artistId)) {
          tracks.push({
            idArtista: artistId,
            artistas: track.artists.map((artist) => artist.name),
            id: track.id,
            nombre: track.name,
            imagen: album.images[0]?.url || "",
            popularidad: track.popularity,
          } as CancionFull);
          trackIds.push(track.id); // Guardamos el ID de cada track
        }
      });
    });

    // Espera a que todas las promesas se completen
    await Promise.all(albumTrackPromises);

    // Ahora obtenemos las audio features para todos los tracks en una sola llamada
    if (trackIds.length > 0) {
      console.log(trackIds);
      
      const audioFeatures = await api.getAudioFeatures(trackIds);
      if (audioFeatures) {
        // Agregamos las audio features correspondientes a cada track
        tracks.forEach((track) => {
          const feature = audioFeatures.find((af) => af?.id === track.id);
          if (feature !== undefined && feature !== null) {
            track.bpm = feature.tempo;
            track.mode = feature.mode;
            track.key = feature.key;
          }
        });
      }
    }
    return tracks;
  },
  getTracksFromAlbum: async (albumId: string): Promise<Track[] | undefined> => {
    const res = await fetchData<Page<Track>>( `https://api.spotify.com/v1/albums/${albumId}/tracks?limit=50`);
    return res.items;
  },
};

async function fetchData<T>(url: string, options?: RequestInit): Promise<T> {
  const token = useAuthStore.getState().token;
  if(options===undefined){
    options={
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  }
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
