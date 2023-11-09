import {
  differenceInDays,
  differenceInHours,
  differenceInMonths,
  differenceInWeeks
} from 'date-fns'

const formatLikeCount = (number: number) => {
  if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  } else {
    return number
  }
}

const formatPostCreationTime = (time: Date) => {
  const currentTime = new Date()
  const givenTime = new Date(time)

  const hours = differenceInHours(currentTime, givenTime)
  const days = differenceInDays(currentTime, givenTime)
  const weeks = differenceInWeeks(currentTime, givenTime)
  const months = differenceInMonths(currentTime, givenTime)

  if (hours < 24) {
    return hours < 1 ? 'few mins ago' : `${hours} hr`
  } else if (days < 7) {
    return `${days} d`
  } else if (weeks < 4) {
    return `${weeks} w`
  } else {
    return `${months} m`
  }
}

export { formatLikeCount, formatPostCreationTime }

export const TransformAutocompleteFieldOptions = (data: any) => {
  return data?.map((res: any) => {
    return {
      label: `${res.first_name} ${res.last_name}`,
      value: `${res.first_name} ${res.last_name}`
    }
  })
}
