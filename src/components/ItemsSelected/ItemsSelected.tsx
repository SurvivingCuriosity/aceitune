import { useItemsStore } from "../../store/ItemsStore"
import { ItemsSelectedBox } from "./ItemsSelectedBox"

export const ItemsSelected = () => {

  const { canciones, artistas } = useItemsStore()

  return (
    <div className="flex flex-col justify-between gap-2 sm:flex-row"> 
        <ItemsSelectedBox type="artist" items={artistas} />
        <ItemsSelectedBox type="song" items={canciones} />
    </div>
  )
}
