import { ItemArtista, ItemCancion, ItemType } from "../../store/ItemsStore"
import { useWindowsStore } from "../../store/WindowsStore"
import { WindowKind } from "../../windows/WindowKind"
import { BotonAddItem } from "./BotonAddItem"
import { ItemSelectedPreview } from "./ItemSelectedPreview"

export interface ItemsSelectedBoxProps {
    type: ItemType
    items: ItemArtista[] | ItemCancion[]
}

export const ItemsSelectedBox = (props: ItemsSelectedBoxProps) => {
    const { type, items } = props

    const { abrirVentana } = useWindowsStore()

    const handleAddItem = () => {
        switch (type) {
            case 'artist':
                abrirVentana(WindowKind.artistPicker);
                break;
            case 'song':
                abrirVentana(WindowKind.songPicker);
                break;
            case 'scale':
                abrirVentana(WindowKind.songPicker);
                break;
        }
    }

    const boxTitle = type === 'artist'
        ? 'Artists'
        : type === 'song'
            ? 'Songs'
            : 'Scales'


    return (
        <div className="flex h-min w-full flex-col justify-between rounded-lg border border-neutral-600">

                <div className="flex items-center justify-between p-2">
            <p className="text-neutral-400">{boxTitle}</p>
            <p className="text-neutral-400">{`(${items.length})`}</p>
        </div>
                <div className="flex flex-col gap-2 p-2 pt-0">
                    <ul className="flex flex-row gap-1.5 overflow-x-auto pb-2">
                        <BotonAddItem type={type} onClick={handleAddItem} />
                        {items.map((item) => (
                            <ItemSelectedPreview
                                key={item.id}
                                type={type}
                                item={item}
                            />
                        ))}
                    </ul>
                </div>



        </div>
    )
}
