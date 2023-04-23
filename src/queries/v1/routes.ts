import { makeApi } from '@zodios/core'
import z from 'zod'
import { RouteSchema } from '../../models/routes'

export const routesApi = makeApi([
  {
    method: 'get',
    path: '/v1/users/routes/',
    alias: 'listRoutes',
    response: z.object({
      data: z.array(RouteSchema)
    })
  },
])
