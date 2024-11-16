import { Legend, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useItemsStore } from '../../store/ItemsStore';
import { useMemo } from 'react';
import { SCALES_MAP } from '../../assets/constants/ScalesMap';

type Escala = "C/Am" | "G/Em" | "D/Bm" | "A/F#m" | "E/C#m" | "B/G#m" | "F#/D#m" |
  "C#/A#m" | "Ab/Fm" | "Eb/Cm" | "Bb/Gm" | "F/Dm";

type CancionesPorEscala = {
  [key in Escala]: Record<string, number>; // Cada escala tiene un objeto con artistas y sus conteos
}

export const RadarChartComponent = () => {
  const { artistas, cancionesArtistas } = useItemsStore();

  function generarDatosEscalas() {
    // Inicializar los contadores de canciones por escala y por artista
    const cancionesPorEscala: CancionesPorEscala = {
      "C/Am": {},
      "G/Em": {},
      "D/Bm": {},
      "A/F#m": {},
      "E/C#m": {},
      "B/G#m": {},
      "F#/D#m": {},
      "C#/A#m": {},
      "Ab/Fm": {},
      "Eb/Cm": {},
      "Bb/Gm": {},
      "F/Dm": {}
    };



    const totalCancionesPorArtista = artistas.reduce<Record<string, number>>((acc, artista) => {
      acc[artista.nombre] = 0; // Inicializa el contador en 0
      return acc;
    }, {});

    // Asignar canciones a su respectiva escala usando las equivalencias
    cancionesArtistas.forEach(cancion => {
      const keyMode = `${cancion.key}${cancion.mode}`;
      const escala = SCALES_MAP[keyMode];

      if (escala) {
        const nombreArtista = artistas.find(a => a.id === cancion.idArtista)?.nombre || 'undefined';

        // Inicializar el contador de canciones por artista en la escala
        if (!cancionesPorEscala[escala as Escala][nombreArtista]) {
          cancionesPorEscala[escala as Escala][nombreArtista] = 0;
        }

        // Incrementar el contador de canciones por artista
        cancionesPorEscala[escala as Escala][nombreArtista]++;

        // Incrementar el total de canciones de ese artista
        totalCancionesPorArtista[nombreArtista]++;
      }
    });

    // Calcular los porcentajes por escala y por artista
    const datosFinales = Object.keys(cancionesPorEscala).map(escala => {
      const data:{scale:string, [key:string]:string} = { scale: escala };

      // Para cada artista en la escala, calcular el porcentaje
      Object.entries(cancionesPorEscala[escala as Escala]).forEach(([nombreArtista, count]) => {
        const totalCanciones = totalCancionesPorArtista[nombreArtista];
        const porcentaje = (count / totalCanciones) * 100;
        data[nombreArtista] = porcentaje.toString();
      });

      return data;
    });

    return datosFinales;
  }

  const maxValue = useMemo(() => {
    const allPercentages = generarDatosEscalas()
        .flatMap(data => Object.values(data).slice(1))
        .map(value => Number(value)); // Asegura que sean números

    return Math.max(...allPercentages);
}, [cancionesArtistas, artistas]);

  // Generar datos y calcular maxValue
  const datosEscalas = useMemo(generarDatosEscalas, [artistas, cancionesArtistas]);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={datosEscalas}>
          <PolarGrid />
          <PolarAngleAxis dataKey="scale" />
          <PolarRadiusAxis angle={30} domain={[0, maxValue]} />
          <Tooltip />
          {artistas.filter(a => a.isActivated).map((artista, index) => (
            <Radar
              key={index}
              name={artista.nombre}
              dataKey={artista.nombre}
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              strokeWidth={2}
              fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
              fillOpacity={0.05}
              onClick={() => console.log('Clicked on', artista.nombre)}
            />
          ))}
          <Legend onClick={(a) => console.log('Clicked on legend', a)} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
