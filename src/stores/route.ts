import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LS_ROUTE } from '../config/localstorage'
import { Route } from '../models/routes'

interface RouteState {
  selectedRoute?: Route
  setSelectedRoute: (route?: Route) => void
  selectedSeats?: number[]
  upsertOrDeleteSelectedSeat: (number: number) => void
}

export const useRouteStore = create<RouteState>()(
  persist(
    (set, get) => ({
      setSelectedRoute: (selectedRoute) => set({selectedRoute}),
      upsertOrDeleteSelectedSeat: (seat) => {
        const selectedSeats: number[] = [...(get().selectedSeats ?? [])]
        
        const index = selectedSeats.findIndex(v => v === seat)

        console.log(index)
        if (index !== -1) {
          selectedSeats.splice(index, 1)
        } else {
          selectedSeats.push(seat)
        }

        return set({selectedSeats})
      }
    }),
    {
      name: LS_ROUTE,
    }
  )
)