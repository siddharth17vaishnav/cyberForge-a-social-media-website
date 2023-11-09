import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import React, { useState } from 'react'
import { GoChevronUp as Up, GoChevronDown as Down } from 'react-icons/go'

interface Props {
  options: { value: string; label: string }[]
}
const AutocompleteField = ({ options }: Props) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between">
          {value
            ? options?.find(option => option?.value?.toLowerCase() === value.toLowerCase())?.label
            : 'Select '}
          {open ? (
            <Up className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          ) : (
            <Down className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search ..." />
          <CommandEmpty>No match found.</CommandEmpty>
          <CommandGroup>
            {options?.map(option => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={currentValue => {
                  setValue(currentValue === value ? '' : currentValue)
                  setOpen(false)
                }}>
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default AutocompleteField
