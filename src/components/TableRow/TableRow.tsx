import s from "./TableRow.module.css"
import { PersonTransformedType } from "../../features/People"
import React, { memo } from "react"
import { Link } from "react-router-dom"
import { PATH } from "../../app/routing"

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
    <tr>
      {fields.map((r, index) => (
        <td className={s.cell} key={index}>
          {linkValue === r ? <Link to={PATH.peoples + `/${id}`}>{r}</Link> : r}
        </td>
      ))}
      {child && <td>{child}</td>}
    </tr>
  )
})

export default TableRow
