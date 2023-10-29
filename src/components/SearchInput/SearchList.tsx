import { PATH } from "../../app/routing"
import { useSearchPeopleQuery } from "../../features/People"
import { PersonTransformedType } from "../../commonTypes"
import { Link } from "react-router-dom"
import { List, ListItem, ListItemText, Paper } from "@mui/material"

type PropsType = {
  value: string
}
const SearchList = ({ value }: PropsType) => {
  const { data, error, isError, isLoading } = useSearchPeopleQuery(value)

  if (isError) return <div>{error}</div>
  if (isLoading) return <div>Loading...</div>
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
      {data?.results.length === 0 && (
        <span>Nothing found, please enter another query</span>
      )}

      <List>
        {data?.results.map((r: PersonTransformedType) => (
          <ListItem key={r.id}>
            <ListItemText>
              <Link to={PATH.peoples + `/${r.id}`} variant="body2">
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
