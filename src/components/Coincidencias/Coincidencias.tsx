import { useEffect, useState } from "react";
import { useItemsStore } from "../../store/ItemsStore";
import { estanEnLaMismaEscala, tienenMismoBPM } from "../../utils/Comparaciones";
import { CancionFull } from "../interfaces/Cancion";
import { TarjetaCoincidencia } from "./TarjetaCoincidencia";

export const Coincidencias = () => {

    const { cancionesArtistas } = useItemsStore();

    const [coincidencias, setCoincidencias] = useState(getCoincidencias(cancionesArtistas));

    useEffect(() => {
        setCoincidencias(getCoincidencias(cancionesArtistas))
    }, [cancionesArtistas])

    function getCoincidencias(canciones: CancionFull[]) {
        const coincidencias = [];

        for (let i = 0; i < canciones.length; i++) {
            for (let j = i + 1; j < canciones.length; j++) {
                if (i === j) continue;
                if (canciones[i].nombre === canciones[j].nombre) continue;
                if (estanEnLaMismaEscala(canciones[i], canciones[j])) {
                    if (tienenMismoBPM(canciones[i], canciones[j])) {
                        coincidencias.push({ cancion1: canciones[i], cancion2: canciones[j] });
                    }
                }
            }
        }

        return coincidencias
    }

    return (
        <ul className="flex gap-2 overflow-x-auto pb-2">
            {coincidencias.map((c, index) => <TarjetaCoincidencia key={`${index}${c.cancion1.id}${c.cancion2.id}`} cancion1={c.cancion1} cancion2={c.cancion2} />)}
        </ul>
    )
}


