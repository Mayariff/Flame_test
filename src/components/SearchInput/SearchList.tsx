import { PATH } from "../../app/routing"
import { useSearchPeopleQuery } from "../../features/People"
import { PersonTransformedType } from "../../commonTypes"
import { List, ListItem, ListItemText, Paper, Link } from "@mui/material"
import { Error } from "../index"

type PropsType = {
  value: string
}
const SearchList = ({ value }: PropsType) => {
  const { data, error, isError, isLoading } = useSearchPeopleQuery(value)

  if (isError) return <Error errorText={error as string} />

  return (
    <Paper
      variant="outlined"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
        position: "absolute",
        zIndex: 5,
      }}
    >
      {isLoading && <span>Loading...</span>}
      {data?.results.length === 0 && (
        <span>Nothing found, please enter another query</span>
      )}

      <List>
        {data?.results.map((r: PersonTransformedType) => (
          <ListItem key={r.id}>
            <ListItemText>
              <Link href={PATH.peoples + `/${r.id}`} variant="body2">
                {r.name}
              </Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}

export default SearchList
