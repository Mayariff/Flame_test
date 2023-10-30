import React, { memo } from "react"
import Link from "@mui/material/Link"
import { PATH } from "../../app/routing"
import { TableCell, TableRow as RowTable } from "@mui/material"
import { PersonTransformedType } from "../../commonTypes"

type propsType = {
  row: PersonTransformedType | [string,string]
  child?: React.ReactNode
  id?: string
  linkedEl?: string
}
const TableRow = memo(({ row, id, child, linkedEl }: propsType) => {

  const fields: string[] =   Object.values(row).filter((r) => r !== id)
  const linkField = linkedEl && Object.keys(row).find((el) => el === linkedEl)  as string|undefined
  //@ts-ignore
  const linkValue:string|undefined = linkField  as string && (row[linkField] )

  return (
    <RowTable>
      {fields.map((r, index) => {
        const value = !!r && r.length > 0 ? r : "~"
        return (
          <TableCell key={index} size={"small"}>
            {linkValue === value ? (
              <Link href={PATH.peoples + `/${id}`}>{value}</Link>
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
