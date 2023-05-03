import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LS_ROUTE } from '../config/localstorage'
import { Route } from '../models/routes'
import { Toast } from '@capacitor/toast'
import { Passenger } from '../models/passenger'
import currency from 'currency.js'

export interface PassengerWithSeat {
  seat: number;
  passenger?: Passenger;
  price: currency
}
interface RouteState {
  selectedRoute?: Route
  setSelectedRoute: (route?: Route) => void
  selectedSeats?: number[]
  upsertOrDeleteSelectedSeat: (number: number) => void
  resetSelectedSeats: () => void
  selectedPassengers?: PassengerWithSeat[]
  setSelectedPassengers: (selectedPassengers: PassengerWithSeat[]) => void
}

const MAX_SEATS = 3 as const

export const useRouteStore = create<RouteState>()(
  persist(
    (set, get) => ({
      setSelectedRoute: (selectedRoute) => set({selectedRoute}),
      upsertOrDeleteSelectedSeat: (seat) => {
        const selectedSeats: number[] = [...(get().selectedSeats ?? [])]
        
        const index = selectedSeats.findIndex(v => v === seat)

        if (index !== -1) {
          selectedSeats.splice(index, 1)
        } else {
          // Check if seats is maximum
          if ((selectedSeats.length + 1) <= MAX_SEATS) {
            selectedSeats.push(seat)
          } else {
            Toast.show({
              text: `Unable to add seats more than ${MAX_SEATS}`
            })
          }
        }

        return set({selectedSeats})
      },
      resetSelectedSeats: () => {
        return set({selectedSeats: []})
      },
      setSelectedPassengers: (selectedPassengers) => {
        return set({selectedPassengers})
      }
    }),
   
    {
      name: LS_ROUTE,
    }
  )
)