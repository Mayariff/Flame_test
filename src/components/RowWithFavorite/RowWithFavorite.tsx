import React, { useCallback, useState } from "react"
import { PersonTransformedType } from "../../commonTypes"
import { cls } from "../../features/Favorites"
import { BtnMenu, TableRow } from "../index"

type propsType = {
  data: PersonTransformedType
  disableCondition: boolean
  disableCondition2: boolean
}
const RowWithFavorite = ({ data, disableCondition,disableCondition2 }: propsType) => {
  const [isFavoriteItem, setIsFavoriteItem] = useState<boolean>(
    cls.hasItem(data.id),
  )
 

  const onClickAdd = useCallback(() => {
    cls.addFavorite(data.id, data)
    setIsFavoriteItem((prev) => cls.hasItem(data.id))
  }, [data])
  const onClickDel = useCallback(() => {
    cls.deleteFavorite(data.id)
    setIsFavoriteItem((prev) => cls.hasItem(data.id))
  }, [data])
  return (
    <TableRow
      row={data}
      id={data?.id}
      linkedEl={"name"}
      child={
        <BtnMenu
          btnName={"Add"}
          btn2Name={"Del"}
          handelClickBtn={onClickAdd}
          handelClickBtn2={onClickDel}
          disableCondition={disableCondition || isFavoriteItem}
          disableCondition2={disableCondition2 || !isFavoriteItem}
        />
      }
    />
  )
}

export default RowWithFavorite
