import { PersonTransformedType } from "../../features/People"
import { memo } from "react"
import { TableCell, TableHead, TableRow } from "@mui/material"

type propsType = {
  columNameArr?: keyof PersonTransformedType
  btnColName: string
}
export const defaultColumns = ["name", "height", "mass", "hair_color"]

const TableHeaderRow = memo(({ columNameArr, btnColName }: propsType) => {
  const col = columNameArr ? columNameArr : defaultColumns

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "#1976d2" }}>
        {col.map((el) => (
          <TableCell key={el} sx={{ color: "#fff" }}>
            {el}
          </TableCell>
        ))}
        <TableCell sx={{ color: "#fff" }}>{btnColName}</TableCell>
      </TableRow>
    </TableHead>
  )
})

export default TableHeaderRow
