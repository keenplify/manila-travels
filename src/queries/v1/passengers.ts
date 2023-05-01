import { makeApi } from '@zodios/core'
import z from 'zod'
import { PassengerSchema } from '../../models/passenger'

export const passengersAPI = makeApi([
  {
    method: 'get',
    path: '/v1/users/passengers',
    alias: 'listPassengers',
    response: z.object({
      data: z.array(PassengerSchema)
    })
  },
  {
    method: 'post',
    path: '/v1/users/passengers',
    alias: 'storePassenger',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: PassengerSchema.pick({
          name: true,
          phone: true,
          type: true,
          validIdImageUrl: true
        })
      }
    ],
    response: z.object({
      data: PassengerSchema
    })
  }
])
