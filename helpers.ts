const checkDate = (date?: string) => {
    const dateObject = new Date(date || '')
    return !isNaN(dateObject.getTime()) ? dateObject : undefined
}

type DatesDiffResult = {
    days: number,
    hours: number,
    minutes: number,
}
const normalizeDatesDiff = (diff: number): DatesDiffResult => {
    return {
        days: Math.floor(diff / (24 * 60 * 60 * 1000)),
        hours: Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
        minutes: Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000)),
    }
}

const parseDatesDiff = (result: DatesDiffResult) => {

    const days = result.days ? `${result.days}d ` : ''
    const hours = result.hours.toString().padStart(2,'0')
    const minutes = result.minutes.toString().padStart(2,'0')

    return `${days}${hours}:${minutes}h`
}

type DatePair = {
    from: Date
    to: Date
}
const normalizeDatePair = (date1: string, date2: string): DatePair => {

    const date1Object = checkDate(date1)
    const date2Object = checkDate(date2)
    
    const now = new Date()
    const from = date1Object || date2Object || now
    const to = date2Object || now
    
    return { from, to }
}

const getNormalizedDatePairsFromMatch = (match:string) => {

    const timeRecords = match.split('+')
    const datePairs: DatePair[] = []

    for (let i = 0; i < timeRecords.length; i++) {

        const [date1, date2] = timeRecords[i].split('...')
        const datePair = normalizeDatePair(date1, date2)
        datePairs.push(datePair)
    }

    return datePairs
}

const reduceDiffFromDatePairs = (datePairs:DatePair[]) => {

    let diff = 0

    for (let i = 0; i < datePairs.length; i++) {

        const {from, to} = datePairs[i]
        diff += (to.getTime() - from.getTime())
    }

    return diff
}

export const handleTimeRecordsMatch = (rawMatch: string) => {

    const datePairs = getNormalizedDatePairsFromMatch(rawMatch)
    console.log(`TR DatePairs: `, datePairs)

    const timeElapsed = reduceDiffFromDatePairs(datePairs)
    console.log(`TR TimeElapsed: `, timeElapsed)

    const result = normalizeDatesDiff(Math.abs(timeElapsed))
    console.log(`TR result: `, result)

    const timeRecord = parseDatesDiff(result)
    console.log(`TR timeRecord: `, timeRecord)

    return timeRecord
}

export const getDateString = (date: Date) => {

    const dateString = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`
	const timeString = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
	return `${dateString} ${timeString}`
}