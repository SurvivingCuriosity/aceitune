import { getEscala, getEscalaYRelativa } from "../../utils/getEscala";
import { CancionFull } from "../interfaces/Cancion";

export interface TarjetaCoincidenciaProps {
  cancion1: CancionFull;
  cancion2: CancionFull;
}
export const TarjetaCoincidencia = (props: TarjetaCoincidenciaProps) => {
    const { cancion1, cancion2 } = props;
  return (
    <div className="relative flex h-[180px] min-w-[280px] justify-between rounded-lg border border-neutral-700 bg-neutral-800 p-2">
        <div className="flex w-[50%] flex-col items-start">
            <p className="max-w-[125px] overflow-hidden truncate text-ellipsis text-neutral-400">{cancion1.nombre}</p>
            <p className="max-w-[125px] truncate text-xs font-bold text-neutral-300">{cancion1.artistas[0]}</p>
            <p className="text-xs text-olive">{getEscala(cancion1.key, cancion1.mode)}</p>
            <img src={cancion1.imagen} alt={cancion1.nombre} className="mt-3 aspect-square w-24" />
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-md text-olive">
            <p className="text-xs">{Math.round(cancion1.bpm)} BPM</p>
            <p className="text-xs">{getEscalaYRelativa(cancion1.key, cancion1.mode)}</p>
        </div>

        <div className="flex w-[50%] flex-col items-end">
            <p className="max-w-[125px] overflow-hidden truncate text-ellipsis text-neutral-400">{cancion2.nombre}</p>
            <p className="max-w-[125px] truncate text-xs font-bold text-neutral-300">{cancion2.artistas[0]}</p>
            <p className="text-xs text-olive">{getEscala(cancion2.key, cancion2.mode)}</p>
            <img src={cancion2.imagen} alt={cancion2.nombre} className="mt-3 aspect-square w-24" />
        </div>
    </div>
  )
}
