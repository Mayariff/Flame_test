import { memo } from "react"

type propsType = {
  btnName: string
  btn2Name?: string
  handelClickBtn: () => void
  handelClickBtn2?: () => void
  disableCondition?: boolean
  disableCondition2?: boolean
}

const BtnMenu = memo(({
  btnName,
  btn2Name,
  handelClickBtn,
  handelClickBtn2,
  disableCondition,
  disableCondition2
}: propsType) => {
  const onClickHandlerBtn = () => handelClickBtn()
  const onClickHandlerBtn2 = () => (handelClickBtn2 ? handelClickBtn2() : null)

  return (
    <div>
      <button
        onClick={onClickHandlerBtn}
        disabled={disableCondition ? disableCondition : false}
      >
        {btnName}
      </button>
      {btn2Name && (
        <button
          onClick={onClickHandlerBtn2}
          disabled={disableCondition2 ? disableCondition2 : false}
        >
          {btn2Name}
        </button>
      )}
    </div>
  )
})

export default BtnMenu
