import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LS_ROUTE } from '../config/localstorage'
import { Route } from '../models/routes'

interface RouteState {
  selectedRoute?: Route
  setSelectedRoute: (route?: Route) => void
}

export const useRouteStore = create<RouteState>()(
  persist(
    (set, get) => ({
      setSelectedRoute: (route) => set({selectedRoute: route})
    }),
    {
      name: LS_ROUTE,
    }
  )
)