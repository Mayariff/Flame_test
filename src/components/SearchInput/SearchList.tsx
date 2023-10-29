import { PATH } from "../../app/routing"
import { useSearchPeopleQuery } from "../../features/People"
import { PersonTransformedType } from "../../commonTypes"
import { Link } from "react-router-dom"

type PropsType = {
  value: string
}
const SearchList = ({ value }: PropsType) => {
  const { data, error, isError, isLoading } = useSearchPeopleQuery(value)

  if (isError) return <div>{error}</div>
  if (isLoading) return <div>Loading...</div>
  return (
    <>
      {data?.results.length === 0 && (
        <div>Nothing found, please enter another query</div>
      )}
      <ol style={{ border: "1px solid black" }}>
        {data?.results.map((r: PersonTransformedType) => (
          <li key={r.id}>
            <Link to={PATH.peoples + `/${r.id}`}>{r.name}</Link>
          </li>
        ))}
      </ol>
    </>
  )
}

export default SearchList
