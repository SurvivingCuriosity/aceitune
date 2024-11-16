export interface Cancion {
    id: string;
    idArtista:string;
    nombre: string;
    artistas: string[];
    imagen: string;
    popularidad: number;
}

export interface CancionFull extends Cancion{
    bpm: number;
    mode: number;
    key: number;
}