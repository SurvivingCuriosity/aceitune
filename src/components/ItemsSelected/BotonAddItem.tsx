export interface BotonAddItemProps {
    type: 'artist' | 'song' | 'scale'
    onClick?: () => void
}
export const BotonAddItem = (props: BotonAddItemProps) => {
    
    const { onClick } = props

    return (
        <button onClick={onClick} className={`flex size-16 flex-shrink-0 flex-row items-center justify-center gap-2 rounded-lg border border-transparent bg-neutral-800 p-2 text-neutral-400 hover:border-neutral-500`}>
            <span className="flex aspect-square items-center justify-center text-3xl">+</span>
        </button>
    )
}
