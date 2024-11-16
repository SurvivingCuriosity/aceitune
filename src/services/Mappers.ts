import { Artist, Page, Track } from "@spotify/web-api-ts-sdk"
import { Artista } from "../components/interfaces/Artista"
import { Cancion } from "../components/interfaces/Cancion"

export const mapArtists = (artists: Page<Artist>|undefined):Artista[]|undefined => {    
    return artists?.items.map(item => mapArtist(item))
}


export const mapArtist = (artist: Artist):Artista => {
    console.log(artist);
    
    return {
        id: artist.id,
        nombre: artist.name,
        imagen: artist.images?.[1]?.url ?? '',
        generos: artist.genres,
        popularidad: artist.popularity,
    }
}


export const mapTracks = (tracks: Page<Track>|undefined):Cancion[]|undefined => {
    return tracks?.items.map(item => mapTrack(item))
}


export const mapTrack = (track: Track):Cancion => {
    return {
        idArtista: track.artists[0].id,
        id: track.id,
        nombre: track.name,
        imagen: track.album.images[1].url,
        artistas: track.artists.map(artist => artist.name),
        popularidad: track.popularity,
    }
}