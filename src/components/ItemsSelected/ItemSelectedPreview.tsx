import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ItemArtista, ItemCancion, useItemsStore } from "../../store/ItemsStore";
import { Switch } from "../ui/Switch";
import { Spinner } from "../ui/Spinner";

export interface ItemSelectedPreviewProps {
    type: 'artist' | 'song' | 'scale';
    item: ItemCancion | ItemArtista;
}

export const ItemSelectedPreview = (props: ItemSelectedPreviewProps) => {

    const { type, item } = props;
    const { toggleVisibility, eliminarItem } = useItemsStore();

    return (
        <div className="group relative flex max-w-60 flex-1 flex-grow items-center justify-start rounded-lg bg-neutral-800 p-2">
            {type === 'artist' && (item as ItemArtista).loading &&
                <span className="absolute right-2 top-1">
                    <Spinner />
                </span>
            }
            <div className="mr-2 size-12 flex-shrink-0">
                <img src={item.imagen} alt={item.nombre} className="aspect-square" />
            </div>
            <div className="flex h-full w-full flex-col justify-between">

                <p className="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-sm text-neutral-400">
                    {item.nombre}
                </p>

                <span className="flex flex-row items-center justify-between gap-2">
                    {type === "artist" && (item as ItemArtista).cantidadDeCanciones && <p className="whitespace-nowrap text-xs text-neutral-400">{(item as ItemArtista).cantidadDeCanciones} canciones</p>}
                    <span className="flex items-center gap-1">

                    <button onClick={() => { eliminarItem(type, item.id) }} className="invisible h-5 group-hover:visible">
                        <FontAwesomeIcon icon={faTrashCan} className="text-neutral-400" />
                    </button>
                    <Switch isOn={item.isActivated} onToggle={() => { toggleVisibility(type, item.id) }} />
                    </span>
                </span>
            </div>
        </div>
    );
};
