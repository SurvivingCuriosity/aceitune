import { SCALES_MAP } from "../assets/constants/ScalesMap";
import { CancionFull } from "../components/interfaces/Cancion";

export const estanEnLaMismaEscala = (cancion1: CancionFull, cancion2: CancionFull) => {
    return SCALES_MAP[`${cancion1.key}${cancion1.mode}`] === SCALES_MAP[`${cancion2.key}${cancion2.mode}`];
}

export const tienenMismoBPM = (cancion1: CancionFull, cancion2: CancionFull) => {
    return Math.round(cancion1.bpm) === Math.round(cancion2.bpm);
}