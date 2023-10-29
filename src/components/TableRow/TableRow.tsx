import { PersonTransformedType } from "../../features/People"
import React, { memo } from "react"
import Link from "@mui/material/Link"
import { PATH } from "../../app/routing"
import { TableCell, TableRow as RowTable } from "@mui/material"

type propsType = {
  row: PersonTransformedType
  child: React.ReactNode
  id: string
  linkedEl?: string
}
const TableRow = memo(({ row, id, child, linkedEl }: propsType) => {
  const fields = Object.values(row).filter((r) => r !== id)

  const linkField = linkedEl && Object.keys(row).find((el) => el === linkedEl)
  const linkValue = linkField && row[linkField]

  return (
    <RowTable>
      {fields.map((r, index) => {
        const value = !!r && r.length > 0 ? r : "~"
        return (
          <TableCell key={index} size={"small"}>
            {linkValue === value ? (
              <Link to={PATH.peoples + `/${id}`}>{value}</Link>
            ) : (
              value
            )}
          </TableCell>
        )
      })}
      {child && <TableCell>{child}</TableCell>}
    </RowTable>
  )
})

export default TableRow
