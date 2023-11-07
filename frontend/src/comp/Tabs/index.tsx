import { capitalize } from 'lodash'
import { ReactNode } from 'react'

interface Props {
  options: {
    id: number
    title: string
    icon?: ReactNode
  }[]
  onChange: (value: string) => void
  value: string
}
const Tabs = ({ options, onChange, value }: Props) => {
  return (
    <>
      <div className="border-b  border-gray-200 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400 justify-center">
          {options.map(({ id, icon, title }) => (
            <li className="mr-2 " key={id} onClick={() => onChange(title)}>
              <a
                href="#"
                className={`inline-flex items-center justify-center p-4 ${
                  value === title &&
                  'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                } border-b-2  rounded-t-lg active  group`}
                aria-current="page">
                {icon && icon}
                {capitalize(title)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Tabs
