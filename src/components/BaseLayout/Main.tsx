import React from "react"

interface PropsType {
  children: React.ReactNode
}

export const Main = (props: PropsType) => {
  return (
    <div className='ease-soft-in-out xl:ml-64 relative min-h-screen rounded-xl transition-all duration-200'>
      {props.children}
    </div>
  )
}