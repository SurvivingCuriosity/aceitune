import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useItemsStore } from '../../store/ItemsStore';

export const LinesChart = () => {
    const { artistas } = useItemsStore();

    // Calcula el promedio de BPM para cada artista
    const data = artistas.map(artista => ({
        name: artista.nombre,
        popularidad: artista.popularidad
    }));

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="popularidad" 
                        stroke='#c0ca33'
                        className='stroke-olive'
                        name="Popularity"
                        activeDot={{ r: 8 }} 
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
