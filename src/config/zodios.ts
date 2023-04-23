import { makeApi, Zodios } from '@zodios/core'
import { ZodiosHooks } from '@zodios/react'
import { userAuthApi } from '../queries/v1/auth'
import { LS_AUTHTOKEN } from './localstorage'

export const allAPIs = makeApi([
  ...userAuthApi,
])

export const zodios = new Zodios("http://localhost:3333", allAPIs)

export function logout() {
    localStorage.removeItem(LS_AUTHTOKEN)
    window.location.reload()
}

zodios.axios.interceptors.request.use((config) => {
    const authToken = localStorage.getItem(LS_AUTHTOKEN)

    if (authToken !== null) config.headers.set('Authorization', `Bearer ${authToken}`)

    return config
})

export const zodiosHooks = new ZodiosHooks('ngcards', zodios)
