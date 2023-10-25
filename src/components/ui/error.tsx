'use client'
interface Props {
  error: string | boolean | undefined
}
const Error = ({ error }: Props) => {
  return !!error && <p className="text-xs text-red-500 pl-[7px] !mt-1">{error}</p>
}

export default Error
