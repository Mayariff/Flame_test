import { memo } from "react"
import { Button } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"

type propsType = {
  btnName: string
  btn2Name?: string
  handelClickBtn: () => void
  handelClickBtn2?: () => void
  disableCondition?: boolean
  disableCondition2?: boolean
}

const BtnMenu = memo(
  ({
    btnName,
    btn2Name,
    handelClickBtn,
    handelClickBtn2,
    disableCondition,
    disableCondition2,
  }: propsType) => {
    const onClickHandlerBtn = () => handelClickBtn()
    const onClickHandlerBtn2 = () =>
      handelClickBtn2 ? handelClickBtn2() : null

    return (
      <div>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={onClickHandlerBtn}
          disabled={disableCondition ? disableCondition : false}
          startIcon={<DeleteIcon />}
        >
          {btnName}
        </Button>
        {btn2Name && (
          <Button
            onClick={onClickHandlerBtn2}
            disabled={disableCondition2 ? disableCondition2 : false}
            variant="outlined"
            size="small"
            sx={{marginLeft: '20px'}}
            startIcon={<AddIcon />}
          >
            {btn2Name}
          </Button>
        )}
      </div>
    )
  },
)

export default BtnMenu
