import { useCallback, useState } from "react"
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
import { Link } from "react-router-dom"

const People = () => {
  const [page, setPage] = useState(1)
  const [inputValue, setInputValue] = useState<string>("")
  const { data, error, isSuccess, isError, isFetching } =
    useGetAllPeopleQuery(page)
  const { isFetching: searchFetching } = useSearchPeopleQuery(inputValue)
  const changePage = useCallback((page: number) => setPage((prev) => page), [])
  const changeInput = (value: string) => {
    setInputValue(value)
  }

  return (
    <div>
      <Link to={PATH.favorites}> See Favorites</Link>
      <SearchInput
        isFetching={isFetching}
        value={inputValue}
        changeInput={changeInput}
      />
      {isFetching && <Loader />}
      {isError && <Error errorText={error} />}
      {isSuccess && (
        <table>
          <TableHeaderRow btnColName={"Add Favorite / Remove favorite"} />
          <tbody>
            {data?.results.map((r: PersonTransformedType) => (
              <RowWithFavorite
                key={r.id}
                data={r}
                disableCondition={isError || isFetching || searchFetching}
                disableCondition2={isError || isFetching || searchFetching}
              />
            ))}
          </tbody>
        </table>
      )}
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
    </div>
  )
}

export default People
