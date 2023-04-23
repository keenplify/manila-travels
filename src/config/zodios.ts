import { makeApi, Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { userAuthApi } from '../queries/v1/auth'
import { LS_AUTHTOKEN } from './localstorage'
import { routesApi } from '../queries/v1/routes'
import { isAxiosError } from 'axios'

export const allAPIs = makeApi([
  ...userAuthApi,
  ...routesApi
])

export const zodios = new Zodios("https://manila-travels-service.onrender.com/", allAPIs)

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
