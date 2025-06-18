interface PropsType {
  required?: boolean
  className?: string
  idField?: string
  text?: string
  altText?: string
  type?: 'text' | 'number' | 'date' | 'password'
  name?: string
  id?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classError?: string
  idError?: string
  errorText?: string
}

const inputClass = ' border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500'

export const InputText = (props: PropsType) => {
  const required = () => {
    if (props.required) {
      return <span className='text-red-400'>*</span>
    }
  }
  return (
    <div className={'flex flex-col mb-3'} id={props.idField}>
      <p className={!props.altText ? 'mb-1' : ''}>{props.text}{required()}</p>
      {props.altText && <p className="mb-1 text-sm italic">{props.altText}</p>}
      <div>
        <input type={props.type || 'text'} name={props.name} id={props.id} value={props.value} onChange={props.onChange} className={props.className ? props.className+inputClass : 'w-full '+inputClass} autoComplete="off" />
        <p className={'text-red-400 text-sm hidden '+props.classError} id={props.idError}>{props.errorText || 'Input tidak boleh kosong'}</p>
      </div>
    </div>
  )
}