interface PropsType {
  tooltip?: string
  onClick?: () => void
  className?: string
  bgClassName?: string
  text?: string
  icon?: string
  disabled?: boolean
}

export const BaseButton = (props: PropsType) => {
  return (
    <div className="tooltip w-fit" data-tip={props.tooltip}>
      <button onClick={props.onClick} className={`${props.className} px-2 py-1 rounded-md duration-200 text-white ${props.bgClassName || 'bg-gray-400 hover:bg-gray-300'}`} disabled={props.disabled}>
        {props.text}
        {props.icon ? <i className={`fa-solid ${props.icon}`}></i> : null}
      </button>
    </div>
  )
}