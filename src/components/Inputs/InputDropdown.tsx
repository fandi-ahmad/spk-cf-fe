import React from "react"

interface PropsType {
  required?: boolean
  className?: string
  idField?: string
  text?: string
  name?: string
  id?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  classError?: string
  idError?: string
  errorText?: string
  children: React.ReactNode
}

const inputClass = 'w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500'


export const InputDropdown = (props: PropsType) => {
  return (
    <div className={'flex flex-col w-full mb-3 '+ props.className} id={props.idField}>
      <p className="mb-1">{props.text}</p>
      <div>
        <select name={props.name} id={props.id} value={props.value} onChange={props.onChange} className={inputClass}>
          {props.children}
        </select>
        <p className={'text-red-400 text-sm hidden '+props.classError} id={props.idError}>{props.errorText || 'Input tidak boleh kosong'}</p>
      </div>
    </div>
  )
}
