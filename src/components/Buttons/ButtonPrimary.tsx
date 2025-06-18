const btnClass = 'px-2 py-1 rounded-md text-white capitalize bg-gradient-to-tl from-purple-700 to-pink-500 border-0 hover:opacity-85'

interface ButtonType {
  className?: string
  onClick?: () => void
  icon?: string
  text: string
}

export const ButtonPrimary = (props: ButtonType) => {
  return (
    <button className={`${props.className} ${btnClass}`} onClick={props.onClick}>
      {props.text}
      {props.icon ? <i className={`fa-solid ${props.icon} ms-2`}></i> : null}
    </button>
  )
}