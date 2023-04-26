import { useMemo } from "react"
import { useRouteStore } from "../../stores/route"

interface Props {
    number: number
}

const COLORS = {
    AVAILABLE: '#FFFFFF',
    SELECTED: '#ffa800',
    BOOKED: '#93d8ff'
} as const

export function SeatButton({number}:Props) {
    const {selectedSeats, upsertOrDeleteSelectedSeat, selectedRoute} = useRouteStore()

    const takenSeats = useMemo(() => {
        const seats = selectedRoute?.bus?.seats?.booked ?? ''

        return seats.split(',').map(seat => Number.parseInt(seat.trim()))
    }, [selectedRoute])

    return <button 
        style={{ 
            backgroundColor: 
                selectedSeats?.includes(number) ? COLORS.SELECTED : 
                takenSeats.includes(number) ? COLORS.BOOKED :
                COLORS.AVAILABLE
        }}
        onClick={() => {
            console.log('click')
            upsertOrDeleteSelectedSeat(number)
        }}
        disabled={takenSeats.includes(number)}
    >{number}</button>
}