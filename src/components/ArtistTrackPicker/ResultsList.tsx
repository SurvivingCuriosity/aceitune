import { useState } from 'react'
import { Artista } from '../interfaces/Artista'
import { ResultItemArtista } from './ResultItemArtista'
import { Cancion } from '../interfaces/Cancion'
import { ResultItemCancion } from './ResultItemCancion';
import { ItemType } from '../../store/ItemsStore';

export interface ResultsListProps {
    items: Artista[] | Cancion[] | undefined;
    type: ItemType
    onSelect: (item: Artista | Cancion) => void;
}

export const ResultsList = (props: ResultsListProps) => {
    
    const { items, type, onSelect } = props

    const [pageIndex, setPageIndex] = useState(0)
    const itemsPerPage = 5

    // Cálculo de los artistas a mostrar en la página actual
    const startIndex = pageIndex * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedItems = items?.slice(startIndex, endIndex)

    // Control para manejar el avance y retroceso de páginas
    const handleNextPage = () => {
        if (items && endIndex < items.length) {
            setPageIndex(prev => prev + 1)
        }
    }

    const handlePreviousPage = () => {
        if (pageIndex > 0) {
            setPageIndex(prev => prev - 1)
        }
    }

    console.log(items);
    

    return (
        <div>
            <div className="mt-4 flex justify-between">
                <button 
                    onClick={handlePreviousPage} 
                    disabled={pageIndex === 0}
                    className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
                >
                    Anterior
                </button>
                <button 
                    onClick={handleNextPage} 
                    disabled={items && endIndex >= items.length}
                    className="rounded bg-gray-300 px-4 py-2 disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
            <ul className='mt-2 flex flex-col gap-2'>
                {paginatedItems?.map((item, index) => {
                    if (type === 'artist') {
                        return <ResultItemArtista key={index} artista={item as Artista} onClick={(a)=>onSelect(a)} />
                    } else if (type === 'song') {
                        return <ResultItemCancion key={index} cancion={item as Cancion} onClick={(a)=>onSelect(a)} />
                    }
                })}
            </ul>
        </div>
    )
}
