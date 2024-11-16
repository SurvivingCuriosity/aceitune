import { Artista } from '../interfaces/Artista'

export interface ResultItemArtistaProps {
    artista: Artista;
    onClick?: (a:Artista) => void;
}

export const ResultItemArtista = (props: ResultItemArtistaProps) => {
    
    const { artista, onClick } = props

    const handleClick = () => {
        if (onClick) {
            onClick(artista)
        }
    }

    return (
        <div onClick={handleClick} className={`${onClick ? 'hover:bg-neutral-700 hover:cursor-pointer' : ''} flex gap-2 rounded-lg bg-neutral-800 p-2`}> 
            <img
                src={artista.imagen}
                alt={artista.nombre}
                className="size-12 object-contain object-left"
            />
            <p className='text-lg'>{artista.nombre}</p>
        </div>
    )
}
