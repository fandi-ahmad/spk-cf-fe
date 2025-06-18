interface PropsType {
  className: string
  text: string
}

export const Badge = (props: PropsType) => {
  return <div className={`rounded-full w-fit px-2 ${props.className} font-thin text-white py-1 capitalize`}>{props.text}</div>
}
