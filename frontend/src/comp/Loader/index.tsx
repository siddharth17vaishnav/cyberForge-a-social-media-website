import React from 'react'

interface Props {
  className?: string
}

const Loader = ({ className = '' }: Props) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className={'loader ' + className} />
    </div>
  )
}

export default Loader
