import React, { useCallback, useState } from "react"
import {
  Error,
  Loader,
  Pagination,
  RowWithFavorite,
  SearchInput,
  TableHeaderRow,
} from "../../components"
import { useGetAllPeopleQuery, useSearchPeopleQuery } from "./index"
import { PersonTransformedType } from "../../commonTypes"
import { PATH } from "../../app/routing"
import s from "./People.module.css"
import { Button, Paper, Table, TableBody, TableContainer } from "@mui/material"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"

const People = () => {
  const [page, setPage] = useState(1)
  const [inputValue, setInputValue] = useState<string>("")
  const { data, error, isSuccess, isError, isFetching } = useGetAllPeopleQuery(
    page.toString(),
  )
  const { isFetching: searchFetching } = useSearchPeopleQuery(inputValue)
  const changePage = useCallback((page: number) => setPage((prev) => page), [])
  const changeInput = (value: string) => {
    setInputValue(value)
  }

  return (
    <div className={s.container}>
      <div className={s.menuContainer}>
        <Button href={PATH.favorites} startIcon={<ExitToAppIcon />}>
          See Favorites
        </Button>
        <SearchInput
          isFetching={isFetching}
          value={inputValue}
          changeInput={changeInput}
        />
      </div>
      {isFetching && <Loader />}
      {isError && <Error errorText={error as string} />}
      {isSuccess && (
        <TableContainer
          component={Paper}
          sx={{ minWidth: 400, width: `80%`, margin: "4px auto" }}
        >
          <Table sx={{ width: `100%` }} aria-label="customized table">
            <TableHeaderRow btnColName={"add favorite / remove favorite"} />
            <TableBody>
              {data?.results.map((r: PersonTransformedType) => (
                <RowWithFavorite
                  key={r.id}
                  data={r}
                  disableCondition={isError || isFetching || searchFetching}
                  disableCondition2={isError || isFetching || searchFetching}
                />
              ))}
            </TableBody>
          </Table>
          <Pagination
            disablePrev={
              data?.previous === null || isError || isFetching || searchFetching
            }
            disableNext={
              data?.next === null || isError || isFetching || searchFetching
            }
            handelClick={changePage}
            curPage={page}
          />
        </TableContainer>
      )}
    </div>
  )
}

export default People
