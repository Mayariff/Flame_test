import { useCallback, useState } from "react"
import {
  Error,
  Loader,
  Pagination,
  RowWithFavorite,
  SearchInput,
  TableHeaderRow,
} from "../../components"
import { useGetAllPeopleQuery } from "./index"
import { PersonTransformedType } from "../../commonTypes"
import { PATH } from "../../app/routing"
import { Link } from "react-router-dom"

const People = () => {
  const [page, setPage] = useState(1)

  const { data, error, isSuccess, isError, isFetching } =
    useGetAllPeopleQuery(page)
  const changePage = useCallback((page: number) => setPage((prev) => page), [])

  return (
    <div>
      <Link to={PATH.favorites}> See Favorites</Link>
      <SearchInput />
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
                isFetching={isFetching}
                isError={isError}
              />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        disablePrev={data?.previous === null || isError || isFetching}
        disableNext={data?.next === null || isError || isFetching}
        handelClick={changePage}
        curPage={page}
      />
    </div>
  )
}

export default People
