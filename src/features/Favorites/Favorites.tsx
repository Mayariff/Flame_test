import React, { useCallback, useEffect, useState } from "react"
import { PATH } from "../../app/routing"
import { Link } from "react-router-dom"
import { PersonTransformedType } from "../../commonTypes"
import { cls } from "./customLocalStorage"
import { BtnMenu, EmptyList, TableHeaderRow, TableRow } from "../../components"

const Favorites = () => {
  const [items, setItems] = useState<PersonTransformedType[]>(
    [] as PersonTransformedType[],
  )

  useEffect(() => {
    const favorites = cls.getAllFavorite()
    setItems((prev) => favorites)
  }, [])

  const removeItem = useCallback((id: string) => {
    cls.deleteFavorite(id)
    setItems((prev) => {
      return prev.filter((el) => el.id !== id)
    })
  }, [])

  return (
    <div>
      <Link to={PATH.peoples}> See All People</Link>
      {!items[0] ? (
        <EmptyList />
      ) : (
        <table>
          <TableHeaderRow btnColName={"Remove favorite"} />
          <tbody>
            {items.map((r: PersonTransformedType) => (
              <TableRow
                key={r.id}
                row={r}
                id={r.id}
                child={
                  <BtnMenu
                    btnName={"Del"}
                    handelClickBtn={() => removeItem(r.id)}
                  />
                }
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Favorites
