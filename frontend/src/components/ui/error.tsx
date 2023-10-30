'use client'
interface Props {
  error: string | boolean | undefined
  status?: 'success' | 'error'
}
const Error = ({ error, status = 'error' }: Props) => {
  return (
    !!error && (
      <p
        className={`text-xs ${
          status === 'success' ? 'text-green-500' : 'text-red-500'
        }  pl-[7px] !mt-1`}>
        {error}
      </p>
    )
  )
}

export default Error
