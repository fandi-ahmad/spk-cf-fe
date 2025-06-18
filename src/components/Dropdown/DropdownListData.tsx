interface PropsType {
  onClick?: () => void
  icon?: string
  text: string
}

export const DropdownListData = (props: PropsType) => {
  return (
    <li onClick={props.onClick}>
      <a className='py-1'>
        {props.icon ? <i className={`fa-solid ${props.icon} w-4`}></i> : null}
        <span className='pb-1'>{props.text}</span>
      </a>
    </li>
  )
}