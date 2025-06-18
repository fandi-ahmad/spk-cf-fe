import React from "react"

interface PropsType {
  colSpan?: number
  rowSpan?: number
  className?: string
  text?: string | React.ReactNode
  pl?: string
}

export const TableData = (props: PropsType) => {
  return (
    <td colSpan={props.colSpan} rowSpan={props.rowSpan} className={`p-2 ${props.pl || 'pl-6'} bg-transparent border-b whitespace-nowrap shadow-transparent  ${props.className}`}>
      <span className='text-xs font-semibold leading-tight text-slate-600'>{props.text}</span>
    </td>
  )
}