import { Cancion } from '../interfaces/Cancion';

export interface ResultItemCancion {
    cancion: Cancion;
    onClick?: (a:Cancion) => void;
}

export const ResultItemCancion = (props: ResultItemCancion) => {
    
    const { cancion, onClick } = props

    const handleClick = () => {
        if (onClick) {
            onClick(cancion)
        }
    }

    return (
        <div onClick={handleClick} className={`${onClick ? 'hover:bg-neutral-700 hover:cursor-pointer' : ''} flex gap-2 rounded-lg bg-neutral-800 p-2`}> 
            <img
                src={cancion.imagen}
                alt={cancion.nombre}
                className="size-12 object-contain object-left"
            />
            <p className='text-lg'>{cancion.nombre}</p>
        </div>
    )
}
