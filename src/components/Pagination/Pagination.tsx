import React, { memo } from "react"
import s from "./Pagination.module.css"
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { Button } from "@mui/material"

type propsType = {
  disablePrev?: boolean
  disableNext?: boolean
  handelClick: (page: number) => void
  curPage: number
}

const Pagination = memo(
  ({ disablePrev, disableNext, handelClick, curPage }: propsType) => {
    const onClickNext = () => handelClick(curPage + 1)
    const onClickPrev = () => handelClick(curPage - 1)

    return (
      <div className={s.container}>
        <Button
          onClick={onClickPrev}
          size={"small"}
          disabled={disablePrev ? disablePrev : false}
          startIcon={<ArrowBackIosIcon />}
        >
          Prev
        </Button>
        <Button
          onClick={onClickNext}
          size={"small"}
          disabled={disableNext ? disableNext : false}
          endIcon={<ArrowForwardIosIcon />}
        >
          Next
        </Button>
      </div>
    )
  },
)

export default Pagination
