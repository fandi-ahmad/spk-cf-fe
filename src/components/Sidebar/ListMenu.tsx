import { useNavigate } from "react-router-dom"

const aClass = 'py-1 text-sm ease-nav-brand my-0 flex items-center whitespace-nowrap px-4 transition-colors hover:text-gray-600 hover:font-semibold'
const aClassActive = 'py-1 shadow-soft-xl text-sm ease-nav-brand my-0 flex items-center whitespace-nowrap rounded-lg bg-white px-4 font-semibold text-slate-700 transition-colors'
const divClass = 'shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'
const divClassActive = 'bg-gradient-to-tl text-white from-purple-700 to-pink-500 shadow-soft-2xl mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white bg-center stroke-0 text-center xl:p-2.5'

interface PropsType {
  to: string
  icon: string
  text: string
  onClick?: () => void
}

export const ListMenu = (props: PropsType) => {
  const navigate = useNavigate()
  const path = location.pathname

  return (
    <li className="mt-0.5 w-full cursor-pointer">
      <a onClick={props.onClick ? props.onClick : () => navigate(props.to)}  className={path === props.to ? aClassActive : aClass}>
        <div className={path === props.to ? divClassActive : divClass}>
          <i className={"fa-solid " + props.icon}></i>
        </div>
        <span className="ml-1 duration-300 opacity-100 pointer-events-none ease-soft">{props.text}</span>
      </a>
    </li>
  )
}