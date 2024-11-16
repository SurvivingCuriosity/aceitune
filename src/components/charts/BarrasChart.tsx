import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useItemsStore } from '../../store/ItemsStore';

export const BarrasChart = () => {

    const { artistas } = useItemsStore();

    const data = artistas.map(artista => {
        return {
            name: artista.nombre,
            bpmMedio: artista.bpmMedio
        };
    });

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                    width={150} 
                    height={40} 
                    data={data} 
                    margin={{ bottom: 50 }} // Aumenta el margen inferior para etiquetas largas
                >
                    <Bar dataKey="bpmMedio" className='fill-olive'/>
                    <XAxis
                        dataKey="name"
                        tick={{
                            // @ts-expect-error: Type 'number' is not assignable to type 'string | number | Date | undefined'.
                            angle: 90, // Inclinación de las etiquetas
                            dx: 5,
                            dy: 0, // Ajusta hacia abajo para evitar cortes
                            textAnchor: "start", // Alinear etiquetas desde un punto fijo
                        }}
                        interval={0} // Mostrar todas las etiquetas
                    />
                    <YAxis />
                    <Tooltip />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
