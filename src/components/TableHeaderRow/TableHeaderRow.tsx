import s from "./TableHeaderRow.module.css"
import { PersonTransformedType } from "../../features/People"
import { memo } from "react"

type propsType = {
  columNameArr?: keyof PersonTransformedType
  btnColName: string
}
export const defaultColumns = ["name", "height", "mass", "hair_color"]

const TableHeaderRow = memo(({ columNameArr, btnColName }: propsType) => {
  const col = columNameArr ? columNameArr : defaultColumns

  return (
    <thead>
      <tr className={s.row}>
        {col.map((el) => (
          <th key={el} className={s.cell}>
            {el}
          </th>
        ))}
        <th className={s.cell}>{btnColName}</th>
      </tr>
    </thead>
  )
})

export default TableHeaderRow
