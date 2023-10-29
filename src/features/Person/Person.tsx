import { useParams } from "react-router-dom"
import { useGetPersonQuery } from "./index"
import { BtnMenu, Error, Loader, TableHeaderRow, TableRow } from "../../components";
import { cls } from "../Favorites"
import { createObj } from "../../healpers"
import { PATH } from "../../app/routing"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import s from "./Person.module.css"


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
    <div className={s.container}>
      <div className={s.btnContainer}>
        <Button href={PATH.peoples} startIcon={<ExitToAppIcon />}>
          Back to Table
        </Button>

        {isFavoriteAtFirst && (
          <BtnMenu
            btn2Name={"Favorite"}
            btnName={"Favorite"}
            handelClickBtn2={addInFavorite}
            handelClickBtn={delFromFavorite}
            disableCondition2={isError || isFetching || isFavoriteItem}
            disableCondition={isError || isFetching || !isFavoriteItem}
          />
        )}
      </div>
      {isFetching && <Loader />}
      {isError && <Error errorText={error} />}
      {isSuccess && (
        <TableContainer
          component={Paper}
          sx={{ minWidth: 400, width: `80%`, margin: "4px auto" }}
        >
          <Table sx={{ width: `100%` }} aria-label="customized table">
            <TableHeaderRow columNameArr={columNames} />
            <TableBody>
              {rowsContent.map((r) => (
                <TableRow key={r[0]} row={r} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  )
}

export default Person
