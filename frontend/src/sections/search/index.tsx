import assets from '@/assets'
import { invalidImageValues } from '@/comp/Drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLazySearchQuery } from '@/store/searchApi'
import { Tables } from '@/types/gen/supabase.table'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import Image from 'next/image'
import { KeyboardEvent, useState } from 'react'
import { capitalize } from 'lodash'
import { useRouter } from 'next/navigation'

const SearchSection = () => {
  const [search] = useLazySearchQuery()
  const router = useRouter()
  const [data, setData] = useState<Tables<'user_profiles'>[]>([])
  const [searchString, setSearchString] = useState<string>('')
  const handleSearch = () => {
    search(searchString)
      .unwrap()
      .then((data: Tables<'user_profiles'>[]) => {
        setData(data)
      })
  }
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }
  return (
    <div>
      <div className="flex w-full max-w-lg items-center space-x-2 mx-auto pt-[32px] relative">
        <Input
          placeholder="Search user by username ,FirstName, LastName or etc..."
          onKeyUp={handleKeyPress}
          value={searchString}
          onChange={e => setSearchString(e.target.value)}
        />
        <Button type="submit" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <ScrollArea className="mt-12 max-w-[80%] mx-auto">
        {data &&
          data.map(data => {
            return (
              <div
                key={data.id}
                className="w-[150px] cursor-pointer"
                onClick={() => router.push(`/profile?id=${data.id}`)}>
                <Image
                  src={
                    !!data.profile && !invalidImageValues.includes(data.profile!)
                      ? (data.profile as string)
                      : assets.images.DUMMY_PROFILE
                  }
                  alt="profile"
                  width={100}
                  height={100}
                  className="rounded-full mx-auto"
                />
                <h5 className="font-medium mt-2 [text-align-last:center]">
                  {capitalize(data.first_name!)} {capitalize(data.last_name!)}
                </h5>
              </div>
            )
          })}
      </ScrollArea>
    </div>
  )
}

export default SearchSection
