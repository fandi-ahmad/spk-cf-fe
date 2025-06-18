interface CardType {
  icon?: string
  text: string
  value: number
}

export const CardData = (props: CardType) => {
  return (
    <div className="w-full max-w-full px-3 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
      <div className="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-xl bg-clip-border mb-6">
        <div className="flex-auto p-4">
          <div className="flex flex-row -mx-3">
            <div className={`${props.icon ? 'w-2/3' : ''} flex-none max-w-full px-3`}>
              <div>
                <p className="mb-0 text-sm font-semibold leading-normal">{props.text}</p>
                <h5 className="mb-0 font-bold">{props.value}</h5>
              </div>
            </div>
            {props.icon ?
            <div className="px-3 text-right basis-1/3">
              <div className="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                <i className={`fa-solid ${props.icon} text-lg relative top-2.5 text-white`}></i>
              </div>
            </div> : null
            }
          </div>
        </div>
      </div>
    </div>
  )
}