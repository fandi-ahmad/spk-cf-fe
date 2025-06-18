interface PropsType {
  required?: boolean
  className?: string
  idField?: string
  text?: string
  type?: 'text' | 'number' | 'date' | string
  name?: string
  id?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classError?: string
  idError?: string
  errorText?: string
}

const inputClass = ' border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500'

export const InputColumn = (props: PropsType) => {
  const required = () => {
    if (props.required) {
      return <span className='text-red-400'>*</span>
    }
  }
  return (
    <div className={'flex justify-between w-full mb-2 '+ props.className} id={props.idField}>
      <p className="pt-4 mb-2 mr-24">{props.text}{required()}</p>
      <div>
        <input type={props.type || 'text'} name={props.name} id={props.id} value={props.value} onChange={props.onChange} className={"w-96"+inputClass} autoComplete="off" />
        <p className={'text-red-400 text-sm hidden '+props.classError} id={props.idError}>{props.errorText || 'Input tidak boleh kosong'}</p>
      </div>
    </div>
  )
}