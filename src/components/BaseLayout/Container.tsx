import React from "react"

interface PropsType {
  children: React.ReactNode
}

export const Container = (props: PropsType) => {
  return <div className='w-full px-6 py-6 mx-auto'>{props.children}</div>
}