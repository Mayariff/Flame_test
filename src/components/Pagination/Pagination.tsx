import React, { memo } from "react"

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
      <div>
        <button
          onClick={onClickPrev}
          disabled={disablePrev ? disablePrev : false}
        >
          Prev
        </button>
        <button
          onClick={onClickNext}
          disabled={disableNext ? disableNext : false}
        >
          Next
        </button>
      </div>
    )
  },
)

export default Pagination
