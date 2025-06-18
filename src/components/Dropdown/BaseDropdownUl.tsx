import React from "react"

interface PropsType {
  text?: string
  btnClassName?: string
  btnText?: string
  icon?: string
  className?: string
  children: React.ReactNode
}

export const BaseDropdownUl = (props: PropsType) => {
  return (
    <div className='dropdown dropdown-end'>
      
      {props.text ? <span className='mr-2'>{props.text}</span> : null}

      <button tabIndex={1} role='button' className={`btn btn-sm text-gray-600  ${props.btnClassName}`}>
        {props.btnText}
        {props.icon ? <i className={`fa-solid ${props.icon}`}></i> : null}
      </button>

      <ul tabIndex={10} className={`${props.className || 'w-52'} dropdown-content z-10 absolute menu p-2 shadow bg-base-100 rounded-md border border-gray-300 font-medium`}>
        {props.children}
      </ul>
      
    </div>
  )
}