import { Link, useParams } from "react-router-dom"
import { useGetPersonQuery } from "./index"
import {
  BtnMenu,
  Error,
  Loader,
  TableHeaderRow,
  TableRow,
} from "../../components"
import { cls } from "../Favorites"
import { createObj } from "../../healpers"
import { PATH } from "../../app/routing"
import { useCallback, useEffect, useMemo, useState } from "react"

const Person = () => {
  const { id } = useParams()
  const { data, error, isSuccess, isError, isFetching } = useGetPersonQuery(id)
  const [isFavoriteItem, setIsFavoriteItem] = useState<boolean>(cls.hasItem(id))
  let [isFavoriteAtFirst, setIsFavoriteAtFirst] = useState<boolean>(false)

  useEffect(() => {
    setIsFavoriteAtFirst(!cls.hasItem(id))
  }, [])

  const addInFavorite = useCallback(() => {
    cls.addFavorite(id, createObj(data))
    setIsFavoriteItem((prev) => cls.hasItem(id))
  }, [data])
  const delFromFavorite = useCallback(() => {
    cls.deleteFavorite(id)
    setIsFavoriteItem(false)
  }, [])

  const columNames = useMemo(() => ["Attribute", "Value"], [])
  const rowsContent = useMemo(
    () => isSuccess && Object.entries(data),
    [isSuccess, data],
  )
  return (
    <>
      <Link to={PATH.peoples}> Back to Table</Link>
      {isFavoriteAtFirst && (
        <BtnMenu
          btnName={"Add in Favorite"}
          btn2Name={"Del from Favorite"}
          handelClickBtn={addInFavorite}
          handelClickBtn2={delFromFavorite}
          disableCondition={isError || isFetching || isFavoriteItem}
          disableCondition2={isError || isFetching || !isFavoriteItem}
        />
      )}
      {isFetching && <Loader />}
      {isError && <Error errorText={error} />}
      {isSuccess && (
        <table>
          <TableHeaderRow columNameArr={columNames} />
          <tbody>
            {rowsContent.map((r) => (
              <TableRow key={r[0]} row={r} />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Person
