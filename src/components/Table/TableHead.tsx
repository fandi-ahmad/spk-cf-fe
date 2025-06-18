interface PropsType {
  colSpan?: number
  rowSpan?: number
  className?: string
  text?: string
}

export const TableHead = (props: PropsType) => {
  return (
    <th colSpan={props.colSpan} rowSpan={props.rowSpan} className={`${props.className} pl-6 py-3 font-bold text-left capitalize align-middle border-b border-gray-200 shadow-none text-sm border-b-solid tracking-none whitespace-nowrap text-slate-800 opacity-70`}>
      {props.text}
    </th>
  )
}