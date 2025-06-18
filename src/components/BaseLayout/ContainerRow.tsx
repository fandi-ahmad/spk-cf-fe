import React from "react"

interface PropsType {
  children: React.ReactNode
  className?: string
}

export const ContainerRow = (props: PropsType) => {
  return <div className={`flex flex-wrap ${props.className}`}>{props.children}</div>
}