import { useState, useRef } from 'react';
import { api } from '../../services/Api';
import { useItemsStore } from '../../store/ItemsStore';
import { useWindowsStore } from '../../store/WindowsStore';
import { Artista } from '../interfaces/Artista';
import { Cancion } from '../interfaces/Cancion';
import { TextInput } from '../ui/TextInput';
import { ResultsList } from './ResultsList';
import { Spinner } from '../ui/Spinner';

export interface ArtistTrackPickerProps {
    type: 'artist' | 'song';
}

export const ArtistTrackPicker = (props: ArtistTrackPickerProps) => {
    const { type } = props;

    const { agregarItem } = useItemsStore();
    const { cerrarVentana } = useWindowsStore();
    const [searchText, setSearchText] = useState('');
    const [result, setResult] = useState<Artista[] | Cancion[] | undefined>([]);
    const [loading, setLoading] = useState(false);

    const debounceTimeoutRef = useRef<number | null>(null);

    const onSelect = (item: Artista | Cancion) => {
        agregarItem(type, item);
        cerrarVentana();
    };

    const handleChange = (text: string) => {
        setSearchText(text);

        // Limpia el timeout previo
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }

        if (!text.trim()) {
            // Si el texto está vacío, limpia los resultados y detén el loading
            setResult([]);
            setLoading(false);
            return;
        }

        // Configura un nuevo timeout para debounce
        setLoading(true); // Activa el loading
        debounceTimeoutRef.current = setTimeout(() => {
            if (type === 'artist') {
                api.searchArtist(text)
                    .then(data => {
                        setResult(data || []);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error('Error buscando artistas:', err);
                        setResult([]);
                        setLoading(false);
                    });
            } else if (type === 'song') {
                api.searchSong(text)
                    .then(data => {
                        setResult(data || []);
                        setLoading(false);
                    })
                    .catch(err => {
                        console.error('Error buscando canciones:', err);
                        setResult([]);
                        setLoading(false);
                    });
            }
        }, 500); // 500ms de debounce
    };

    return (
        <div className='w-full'>
            <TextInput
                onChange={handleChange}
                placeholder={
                    type === 'artist'
                        ? 'Search for an artist'
                        : 'Search for a song'
                }
                value={searchText}
            />
            {loading
                ? <Spinner size='2xl' className='m-4 mx-auto' />
                : <ResultsList items={result} type={type} onSelect={onSelect} />
            }
        </div>
    );
};
