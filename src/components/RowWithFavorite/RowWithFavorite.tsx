import React, { useCallback, useState } from "react"
import { PersonTransformedType } from "../../commonTypes"
import { cls } from "../../features/Favorites"
import { BtnMenu, TableRow } from "../index"

type propsType = {
  data: PersonTransformedType
  isError: boolean
  isFetching: boolean
}
const RowWithFavorite = ({ data, isError, isFetching }: propsType) => {
  const [isFavoriteItem, setIsFavoriteItem] = useState<boolean>(
    cls.hasItem(data.id),
  )
  /*useEffect(() => {
    setIsFavoriteItem(cls.hasItem(data.id))
  }, [data])*/

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
          disableCondition={isError || isFetching || isFavoriteItem}
          disableCondition2={isError || isFetching || !isFavoriteItem}
        />
      }
    />
  )
}

export default RowWithFavorite
