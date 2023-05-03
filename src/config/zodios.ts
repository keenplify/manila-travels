import { makeApi, Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { userAuthApi } from '../queries/v1/auth'
import { LS_AUTHTOKEN } from './localstorage'
import { routesApi } from '../queries/v1/routes'
import { isAxiosError } from 'axios'
import { customersAPI } from '../queries/v1/customers'
import { passengersAPI } from '../queries/v1/passengers'
import { bookingsAPI } from '../queries/v1/bookings'

export const allAPIs = makeApi([
  ...userAuthApi,
  ...routesApi,
  ...customersAPI,
  ...passengersAPI,
  ...bookingsAPI
])

export const backendServerUrl = "https://manila-travels-service.onrender.com" as const

export const zodios = new Zodios(backendServerUrl, allAPIs)

export function logout() {
    localStorage.removeItem(LS_AUTHTOKEN)
    window.location.href = "/"
}

zodios.axios.interceptors.request.use((config) => {
    const authToken = localStorage.getItem(LS_AUTHTOKEN)

    if (authToken !== null) config.headers.set('Authorization', `Bearer ${authToken}`)

    return config
})

zodios.axios.interceptors.response.use(undefined, (err) => {
  if (isAxiosError(err)) {
    if (err.response?.status === 401) {
      logout()
    }
  }
  return Promise.reject(err)
})

export const zodiosHooks = new ZodiosHooks('ngcards', zodios)
