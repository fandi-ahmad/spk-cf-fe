import React from "react"

interface PropsType {
  className?: string
  name?: string
  filter?: string
  thead: React.ReactNode
  tbody: React.ReactNode
  option?: React.ReactNode
}

export const BaseTable = (props: PropsType) => {
  return (
    <div className={`flex-none w-full max-w-full px-3 ${props.className}`}>
      <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="flex justify-between items-start">
          <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <h6>{props.name}</h6>
          </div>

          <div className="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-t-2xl border-b-transparent">
            <h6>{props.option}</h6>
          </div>
        </div>

        <div className="flex-auto px-0 pt-0 pb-2">
          <div className="px-6">
            {props.filter}
          </div>
          <div className="p-0 ">
            <table className="items-center w-full mb-0 align-top text-slate-500">
              <thead className="align-bottom">
                <tr>
                  {props.thead}
                </tr>
              </thead>
              <tbody>
                {props.tbody}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}